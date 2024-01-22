export const checkReqType = async (req, res, next) => {
    if(req.method !== "GET")
        res.status(404).json(`${req.method} requests are not allowed buddy!!! 🤬🤬🤬`)
    else
        next();
}