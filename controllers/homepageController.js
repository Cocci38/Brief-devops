import Product from "../models/Product.js";
// Ancienne façon de faire : 
// exports.getHomepage = (req, res, next) => {
//     res.render( "homepage", {
//         title: this.getHomepage,
//     });
// };

export const getHomepage = async (req, res, next) => {
    const products = await Product.find();
    console.log(products);
    res.render("homepage", {
        title: "Page d'accueil",
        products: products,
    });
};
