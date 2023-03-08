exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.sucess = req.flash('sucess')
    res.locals.user = req.session.user
    next()
}


exports.checkCSRF = (err, req, res, next) => {
    if (err) {
        return res.render('404')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()

}
exports.checaLogin = (req, res, next) => {    
    if(!req.session.user) {        
        req.flash('errors', 'Você precisa fazer Login')        
        req.session.save(() => {
            res.redirect('/login/index')            
        })
        return
    }
    next()
} 