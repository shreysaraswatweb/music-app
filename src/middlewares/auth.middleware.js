const jwt = require('jsonwebtoken');


async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if( decoded.role !== 'artist'){
            return res.status(403).json({
                message: "You don't have permission to add music to album"
            });
        }

        req.user = decoded; //decoded user ko req object me store karna taki agle middleware ya controller function me use kiya ja sake
        next(); //next() ko call karna zaruri hai taki agla middleware ya controller function execute ho sake
    }
    catch(err){
        console.error(err);
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = {authArtist};