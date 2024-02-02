import * as fs from 'fs';

export function UpdateLogFiles() {

    // Deletes the oldest Scrape log, reorders the rest 
    if (fs.existsSync("./logs/scrape/scrape_log_oldest.txt"))
        fs.unlinkSync("./logs/scrape/scrape_log_oldest.txt", (err) => {
            if (err) throw err;
        });

    if (fs.existsSync("./logs/scrape/scrape_log_old.txt"))
        fs.renameSync("./logs/scrape/scrape_log_old.txt", "./logs/scrape/scrape_log_oldest.txt", (err) => {
            if (err) throw err;
        });

    if (fs.existsSync("./logs/scrape/scrape_log.txt"))
        fs.renameSync("./logs/scrape/scrape_log.txt", "./logs/scrape/scrape_log_old.txt", (err) => {
            if (err) throw err;
        });


    // Deletes the oldest SQL log, reorders the rest 
    if (fs.existsSync("./logs/sql/sql_log_oldest.txt"))
        fs.unlinkSync("./logs/sql/sql_log_oldest.txt", (err) => {
            if (err) throw err;
        });

    if (fs.existsSync("./logs/sql/sql_log_old.txt"))
        fs.renameSync("./logs/sql/sql_log_old.txt", "./logs/sql/sql_log_oldest.txt", (err) => {
            if (err) throw err;
        });

    if (fs.existsSync("./logs/sql/sql_log.txt"))
        fs.renameSync("./logs/sql/sql_log.txt", "./logs/sql/sql_log_old.txt", (err) => {
            if (err) throw err;
        });
}

// Log Scraping Operations
export async function Scrape_Logger(log, hasTab = true) {

    let formattedLog = hasTab ? `\t\t${log}\n` : `${log}\n`
    console.log(log)

    fs.writeFileSync("./logs/scrape/scrape_log.txt", formattedLog, { flag: 'a+' }, err => {
        if (err) {
            console.error(err);
        }
    })

}


// Logging Function for SQL Transactions/DB Operations
export async function SQL_Logger(log, hasTab = true) {
    let formattedLog = hasTab ? `\t\t${log}\n` : `${log}\n`
    console.log(log)

    hasTab ?
        fs.writeFile("./logs/sql/sql_log.txt", formattedLog, { flag: 'a+' }, err => {
            if (err) {
                console.error(err);
            }
        })
        :
        fs.writeFileSync("./logs/sql/sql_log.txt", formattedLog, { flag: 'a+' }, err => {
            if (err) {
                console.error(err);
            }
        })
}