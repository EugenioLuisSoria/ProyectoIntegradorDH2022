const db = require("../database/models")

async function userLoggedMiddleware (req, res, next) {  
    //res.locals son variables que puedo compartir entre las vistas, indistintamente del controlador if(req.session && req.session.userLogged)
    res.locals.isLogged = false;

    // let emailInCookie = req.cookies.recordarEmail ? req.cookies.recordarEmail : "";
    let emailInCookie = req.cookies.recordarEmail;

    if(emailInCookie != undefined) {                            //Si existe la cookie, que haga toda la logica de buscar y guardar en sesion
        let userFromCookie = await db.User.findOne({           //Busco el usuario, en base al email de la cookie
            where: {
                email: emailInCookie,
            },
            include: [{association: 'user_category'}]
        })
        
        if(userFromCookie){                                     //Si está en cookie, lo buscará en la DB y lo guardará en sesión al usuario.
            req.session.userLogged = {
                id: userFromCookie.id,
                first_name: userFromCookie.first_name,
                last_name: userFromCookie.last_name,
                email: userFromCookie.email,
                avatar: userFromCookie.avatar,
                user_category: {
                    type: userFromCookie.user_category.type
                }
            }
        } else { //Si no lo encuentra, renderiza la vista de error
            return res.render('error')
        }
    }
    
    if(req.session.userLogged){     
        res.locals.isLogged = true;        
        res.locals.userLogged = req.session.userLogged;
        /*
        A continuación, otra forma de en la vistas, con el uso de locals.userLogged, user los datos del usuario en session
        De esta manera, no es necesario pasar la info como objeto en el metodo render().
        NOTE: res.locals is an object that contains response local variables scoped to the request and because of this,
        it is only available to the view(s) rendered during that request/response cycle
        */
    } 
    next();
}
module.exports = userLoggedMiddleware;