// Update the Database
// We're essentially updating the database in the same way that you would insert or delete a value within an array

// We load the data from the CSV into a placeholder table (*_temp)
// We delete all the rows of the backup table (*_old)
// We then take the data that the DB is currently serving to the website's backend (*_current) and copy it over to (*_old)
// Empty out (*_current), then copy over the data from (*_temp) to (*_current)
// Then delete all rows of (*_temp)

async function UpdateTables(sequelize, site) {

    // Starts a transaction --- so we can rollback in the case of an error, or if the DB shutsdown or something
    const t = await sequelize.transaction({
        autocommit: false,
    });

    const options = {
        raw: true,
        transaction: t,
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

    } catch (error) {
        await t.rollback();

    } finally {
        try {
            await sequelize.query(`ALTER TABLE ${site}_temp AUTO_INCREMENT = 1`)
        } catch (error) {

        }
    }

}


export default UpdateTables;

