import { QueryTypes } from 'sequelize';

/*
    Always remember to 'commit' your read transactions, in order to release any locks on the table.
    Otherwise, you'll either get 
        - No response from the DB
        - An error saying you cant change isolation level, mid-transaction
        
    Rollback will also probably work, but since Reads don't change anything, I think they make no difference.
*/

// This function processes requests recieved at the /search/ endpoint
export const retrieveFromCurrent = async (req, res, next) => {

    const payload = {};     // List of games that will be sent to the client
    const oldTables = [];       // List of websites that need their '_old' tables queried

    try {

        const query = req.query.q;      // What the client searched for
        const sequelize = res.locals.sequelize;         // Sequelize instance (use the initial connection made on server start)
        const SQLSearch = res.locals.sqlsearch;         // Custom search function

        // Transaction Options
        const t = await sequelize.transaction({
            autocommit: false
        })

        // Return a list of all websites we're scraping (in case we add to them in the future)
        const currentTables = await sequelize.query(`SHOW TABLES LIKE '%_current'`, { transaction: t, type: QueryTypes.SHOWTABLES });

        // Loop thru all the _current tables we have
        // Add results to payload
        // On Failure, push name of table to the Old Table's list
        for (const table of currentTables) {
            try {

                const results = await SQLSearch(query, table, t);
                payload[`${table.replace(/_.+/, "")}`] = [...results];

            } catch (error) {
                console.error(error)
                oldTables.push(table.replace(/_.+/, ""))
            }
        }

        // If there are any websites that need their old tables queried
        // ...pass those websites, as well as the client's query, and call
        // ...the next function (searches the old tables).
        // Otherwise, return the payload.
        if (oldTables.length > 0) {
            res.locals.payload = { ...payload }
            res.locals.oldTables = [...oldTables];
            t.commit();
            next();
        } else {
            t.commit();
            res.status(200).json(payload)
        }

    } catch (error) {
        console.log(error)
        res.status(404).send("HIP! HIP! HOORAY! It FAILED! LETS GOOOOOOO!")
    }

}

export const retrieveFromOld = async (req, res, next) => {

    const query = req.query.q;
    const payload = res.locals.payload;
    const oldTables = res.locals.oldTables;
    const SQLSearch = res.locals.sqlsearch;

    // Transaction Options
    const t = await sequelize.transaction({
        autocommit: false
    })

    try {

        for (const table of oldTables) {
            try {
                const results = await SQLSearch(query, `${table}_old`, t);
                payload[table] = [...results];

            } catch (error) {
                console.error(error)
                payload[table] = null;
            }
        }

        t.commit();
        res.status(200).json(payload)

    } catch (error) {
        console.log(error)
        for (const table of oldTables) {
            if (!payload.hasOwnProperty(table))
                payload[table] = null;
        }
        t.commit();
        res.status(200).json(payload)
    }

}

