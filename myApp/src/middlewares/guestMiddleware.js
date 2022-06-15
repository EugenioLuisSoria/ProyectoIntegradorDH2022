function guestMiddleware (req, res, next) {
    if(!req.session.userLogged) {
        next();
    } else {
        console.log("Esta ruta es solo para invitados");
        res.redirect("/");
    }
    
}

module.exports = guestMiddleware;
