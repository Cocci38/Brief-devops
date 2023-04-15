import Product from "../models/Product.js";
import Category from "../models/Category.js";
// Ancienne façon de faire : 
// exports.getHomepage = (req, res, next) => {
//     res.render( "homepage", {
//         title: this.getHomepage,
//     });
// };

// Affichage des 6 premiers produits et des catégories sur la homepage
export const getHomepage = async (req, res, next) => {
    try {
        const products = await Product.find().limit(6);
        const categories = await Category.find();
        console.log(products);
        res.render("homepage", {
            title: "Page d'accueil",
            products: products,
            categories: categories,
        });
    } catch (error) {
        console.error(error);
    }
};
