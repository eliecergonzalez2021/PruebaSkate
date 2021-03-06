const jwt = require("jsonwebtoken");
const requireAuth = (req, res, next) => {
    
    try {
        console.log(req.headers);
        if (!req.headers?.authorization) {
            throw new Error("No existe el token ๐โโ๏ธ");
        }

        const token = req.headers.authorization.split(" ")[1];
    

        if (!token) {
            throw new Error("Formato no vรกlido utilizar Bearer ๐โโ๏ธ");
        }

       const payload = jwt.verify(token, process.env.JWT_SECRET);
       console.log("๐ ~ file: requireAuth.js ~ line 18 ~ requireAuth ~ payload", payload)

        req.id = payload.id;
        console.log("๐ ~ file: requireAuth.js ~ line 20 ~ requireAuth ~  req.id ",  req.id )
        
        next();
    } catch (error) {
        if (error.message === "jwt malformed") {
            return res.status(401).json({
                ok: false,
                msg: "Formato no vรกlido del Token ๐โโ๏ธ",
            });
        } 
         if (
            error.message === "invalid token" ||
            error.message === "jwt expired"
        ) {
            return res.status(401).json({
                ok: false,
                msg: "Token no vรกlido ๐โโ๏ธ",
            });
        }
        return res.status(401).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = { requireAuth };