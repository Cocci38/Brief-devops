import Product from "../models/Product.js";

export const getProducts = (req, res, next) => {
    res.render("product/getProducts", {
        title: "ProductList",
    });
    
};

export const postProduct = async (req, res, next) => {
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productPrice = req.body.productPrice;

    const product = await Product.create({
        productName,
        productDescription,
        productPrice,
    });

    console.log(product);
    //res.status(201).redirect("/products");
    res.status(201).json({ product });
};

