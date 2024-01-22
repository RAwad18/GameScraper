import { SQL_Logger } from "../logs/logger_functions.js";

// Update the Database
// We're essentially updating the database in the same way that you would insert or delete a value within an array

// We load the data from the CSV into a placeholder table (*_temp)
// We delete all the rows of the backup table (*_old)
// We then take the data that the DB is currently serving to the website's backend (*_current) and copy it over to (*_old)
// Empty out (*_current), then copy over the data from (*_temp) to (*_current)
// Then delete all rows of (*_temp)

async function UpdateTables(sequelize, site) {

    await SQL_Logger(`\t[${new Date().toUTCString()}] ---- ${site.toUpperCase()} TRANSACTION START\n`, false);

    // Starts a transaction --- so we can rollback in the case of an error, or if the DB shutsdown or something
    const t = await sequelize.transaction({
        autocommit: false,
        logging: SQL_Logger
    });

    const options = {
        raw: true,
        transaction: t,
        logging: SQL_Logger
    }

    try {

        const [ignore, loadCSVMetadata] = await sequelize.query(
            `
            LOAD DATA LOCAL INFILE './data/${site}.csv'
            INTO TABLE ${site}_temp
            FIELDS TERMINATED BY '\t' ENCLOSED BY ''
            LINES TERMINATED BY '\n'
            IGNORE 1 LINES
            (title,price,image,link)
        `,
            options
        );

        // While DELETE FROM is slower than TRUNCATE...
        // DELETE FROM operations can actually be rolledback, unlike TRUNCATE
        await sequelize.query(`DELETE FROM ${site}_old`, options)
        await sequelize.query(`INSERT INTO ${site}_old SELECT * FROM ${site}_current`, options)

        await sequelize.query(`DELETE FROM ${site}_current`, options)
        await sequelize.query(`INSERT INTO ${site}_current SELECT * FROM ${site}_temp`, options)

        await sequelize.query(`DELETE FROM ${site}_temp`, options)

        await t.commit();

        SQL_Logger(`\n\t\t[${new Date().toUTCString()}] ---- ${site.toUpperCase()} TRANSACTION SUCCESS: ${loadCSVMetadata.affectedRows} ROWS AFFECTED.`, false)
        SQL_Logger(`\t[${new Date().toUTCString()}] ---- ${site.toUpperCase()} TRANSACTION END\n`, false)

    } catch (error) {
        await t.rollback();

        SQL_Logger(`\n\t\t[${new Date().toUTCString()}] ---- ${site.toUpperCase()} TRANSACTION FAILURE: ROLLBACK CHANGES.\n\t\t${error.message}\n`, false)
        SQL_Logger(`\t[${new Date().toUTCString()}] ---- ${site.toUpperCase()} TRANSACTION END\n\n`, false)

    } finally {
        try {
            await sequelize.query(`ALTER TABLE ${site}_temp AUTO_INCREMENT = 1`)
        } catch (error) {
            SQL_Logger(`\n\tFAILED TO RESET AUTO_INCREMENT TO 1 ON ${site.toUpperCase()}_TEMP!\n`, false);
        }
    }

}


export default UpdateTables;

