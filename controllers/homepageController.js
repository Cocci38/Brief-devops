import Product from "../models/Product.js";
import Category from "../models/Category.js";
// Ancienne façon de faire : 
// exports.getHomepage = (req, res, next) => {
//     res.render( "homepage", {
//         title: this.getHomepage,
//     });
// };

export const getHomepage = async (req, res, next) => {
    const products = await Product.find().limit(6);
    const categories = await Category.find();
    console.log(products);
    res.render("homepage", {
        title: "Page d'accueil",
        products: products,
        categories: categories,
    });
};
