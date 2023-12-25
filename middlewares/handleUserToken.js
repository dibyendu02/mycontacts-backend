const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler((req,res,next) =>{
    const authHeader = req.headers.auth;
    if(authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.send(401);
                throw new Error("not Authorized");
            }
            req.user = decoded.user;
            next();
        });
    }
    
});

module.exports = { validateToken }