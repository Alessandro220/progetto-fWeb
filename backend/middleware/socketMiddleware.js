const socketMiddleware = (sockeT)=>{
    return (req, res, next) => {
     req.io = sockeT;
     next();
    };

}
module.exports = socketMiddleware;