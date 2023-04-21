import User from "../models/User.js";

export const postSignUp = async (req, res, next) => {
    try {
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        const userRole = "USER_USER";

        const user = await User.create({
            userName,
            userEmail,
            userPassword,
            userRole,
        });
        console.log(user);
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
    }
}

export const postSignIn = async (req, res, next) => {
    try {
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        const user = await User.findUser(
            userEmail,
            userPassword,
        );
        console.log(req.session);
        if (user.userRole === "USER_ADMIN") {
            const userSession = req.session;
            userSession.userName = user.userName;
            console.log('coucou');
        }
        //console.log(user);
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
    }
}

export const logout = async (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}