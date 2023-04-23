import User from "../models/User.js";

// Pour créer un administrateur
export const postSignUpAdmin = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
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
}

// Affichage du formulaire pour la connexion de l'admintrateur
export const getSignIn = (req, res, next) => {
    try {
        res.render('user/postSignIn', {
            title: "Connexion",
        });
    } catch (error) {
        console.error(error);
    }
};

// Pour traiter les données envoyées par le formulaire de connexion de l'administrateur
export const postSignIn = async (req, res, next) => {
    try {
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;

        const user = await User.findUser(
            userEmail,
            userPassword,
        );
        console.log(req.session);
        // Si l'utilisateur a le rôle admin, on crée la session et on le redirige vers le dashbord
        if (user.userRole === "USER_ADMIN") {
            const userSession = req.session;
            userSession.userName = user.userName;
            userSession.userRole = user.userRole;
            console.log(userSession);
            res.status(201).redirect("/admin/dashboard");
        } else {
            // Sinon on le redirige vers la page d'accueil du site
            res.status(201).redirect("/");
        }
        //console.log(user);
        //res.status(201).json({ user });
    } catch (error) {
        console.error(error);
    }
}
// Pour la suppression d'un utilisateur
export const deleteUser = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
        try {
            const _id = req.params.id;
            const user = await User.findByIdAndDelete({
                _id
            });
            console.log(user);
            res.status(201).json({ user });
            //res.status(201).redirect("/admin/dashboard");
        } catch (error) {
            console.error(error);
        }
    }
};

// Pour la déconnexion et la destruction de la session
export const logout = async (req, res, next) => {
    req.session.destroy();
    res.redirect('/admin/connexion');
}