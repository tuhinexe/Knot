const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');



const initializeUser = (passport,getUserByEmail,getUserById) => {
    const authenticateUsers = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, {message: 'No user with that email'});
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }
        } catch (e) {
            return done(e);
        }

    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers));
    passport.serializeUser((user, done) => {
        console.log("serialized user")
        done(null,user.id)
    });
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initializeUser;