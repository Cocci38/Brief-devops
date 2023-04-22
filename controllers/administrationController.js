import Category from "../models/Category.js";
import Product from "../models/Product.js";


// Afficher tous les produits
export const getDashboard = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
        try {
            const userAdmin = req.session.userRole;
            console.log(req.session.userRole);
            const productsDashboard = await Product.find();
            const categoryDashboard = await Category.find();
            res.status(200).render("administration/dashboard", {
                title: "Tableau de bord",
                products: productsDashboard,
                categories: categoryDashboard,
                userAdmin: userAdmin,
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect("/");
    }
    
};