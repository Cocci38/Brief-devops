import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {

    const products = await Product.find();
    console.log(products);
    res.status(200).render("product/getProducts", {
        title: "ProductList",
        products: products,
    });
};

// Get Categorie par l'id
export const getProduct = async (req, res, next) => {
    const id = req.params.id
    console.log(id);
    //console.log(req.path.split("/")[2]);
    // Création d'un nouvelle catégorie
    //const category = await Category.findById(req.path.split("/")[2]);
    const product = await Product.findById({"_id":id});

    console.log(product);
    //res.json(product);
    res.status(200).render('product/getProduct', {
        title: "productOne",
        product: product,
    });

};

export const addProduct = async (req, res, next) => {
    res.render('product/addProduct', {
        title: "productAdd",
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
    res.status(201).redirect("/products");
    //res.status(201).json({ product });
    
};

