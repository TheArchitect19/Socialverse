const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        let decodedData = jwt.verify(token,process.env.SECRET);
        console.log(decodedData)
        req.userId = decodedData?.id;
        next();
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = auth;