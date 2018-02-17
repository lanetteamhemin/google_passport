const Window = require('window');
const window = new Window();

module.exports = function (app, passport) {

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    app.get('/', (req, res) => {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/profile', (req, res) => {
        if (req.session) {
            console.log('sending ', req.session.passport.user);
            res.render('profile.ejs', req.session.passport.user)
        }

    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        window.history.forward();
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        next()
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}