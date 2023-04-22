import User from "../models/User.js";

export const postSignUpAdmin = async (req, res, next) => {
    try {
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        const userRole = "USER_ADMIN";

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

// Affichage du formulaire pour créer un produit
export const getSignIn = (req, res, next) => {
    try {
        res.render('user/postSignIn', {
            title: "Connexion",
        });
    } catch (error) {
        console.error(error);
    }
};

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
            userSession.userRole = user.userRole;
            console.log(userSession);
            res.status(201).redirect("/admin/dashboard");
        }else{
            res.status(201).redirect("/");
        }
        //console.log(user);
        //res.status(201).json({ user });
    } catch (error) {
        console.error(error);
    }
}

export const logout = async (req, res, next) => {
    req.session.destroy();
    res.redirect('/admin/connexion');
}