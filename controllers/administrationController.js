import Category from "../models/Category.js";
import Product from "../models/Product.js";


// Afficher tous les produits
export const getDashboard = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
        try {
            console.log(req.session);
            const productsDashboard = await Product.find();
            const categoryDashboard = await Category.find();
            res.status(200).render("administration/dashboard", {
                title: "Tableau de bord",
                products: productsDashboard,
                categories: categoryDashboard,
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect("/");
    }
    
};