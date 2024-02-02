import { QueryTypes } from "sequelize";

export const checkForQuery = async (req, res, next) => {
    // End request if the query parameter 'q' is not present
    if (!req.query.hasOwnProperty('q')) {
        res.status(403).end();
    } else if (req.query.q.length <= 0) {
        res.status(403).end();
    } else {
        const query = (req.query.q).replace(/'/g, "").toLowerCase()
        req.query.q = query;
        next();
    }
}

export const addSearchFn = async (req, res, next) => {

    const SQLSearch = async (query, table, transaction, sequelize = res.locals.sequelize) => {
        return await sequelize.query(
            `
            SELECT * FROM ${table}
            WHERE Title LIKE CONCAT('%', '${query}', '%')
            ORDER BY
                Title LIKE CONCAT('${query}', '%') DESC,
                IFNULL(NULLIF(INSTR(Title, CONCAT(' ', '${query}')), 0), 99999),
                IFNULL(NULLIF(INSTR(Title, '${query}'), 0), 99999),
                Title
            LIMIT 5;
            `,
            { transaction: transaction, type: QueryTypes.SELECT }
        )
    }

    res.locals.sqlsearch = SQLSearch;
    next();

}