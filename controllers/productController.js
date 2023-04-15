import Product from "../models/Product.js";
import Category from "../models/Category.js";



export const getProducts = async (req, res, next) => {
    const products = await Product.find();
    console.log('limite' + productsLimit);
    res.status(200).render("product/getProducts", {
        title: "Liste des produits",
        products: products,
    });
};

// Get Categorie par l'id
export const getProduct = async (req, res, next) => {
    const id = req.params.id
    //console.log(id);
    //console.log(req.path.split("/")[2]);
    // Création d'un nouvelle catégorie
    //const category = await Category.findById(req.path.split("/")[2]);
    const product = await Product.findById({"_id":id});
    const category = await Category.findById(product.ownedByCategory);
    console.log(category);

    //res.json(product);
    res.status(200).render('product/getProduct', {
        title: "productOne",
        product: product,
        category: category,
    });

};

export const addProduct = async (req, res, next) => {

    const categories = await Category.find();
    res.render('product/addProduct', {
        title: "productAdd",
        categories: categories,
    });
};

export const postProduct = async (req, res, next) => {

    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productPrice = req.body.productPrice;
    const ownedByCategory = req.body.ownedByCategory;

    const product = await Product.create({
        productName,
        productDescription,
        productPrice,
        ownedByCategory,
    });

    console.log(product);
    res.status(201).redirect("/products");
    //res.status(201).json({ product });
    
};

// Pour la modification d'une catégorie
export const putProduct = async (req, res, next) => {
    
    const _id = req.body._id;
    let productName = req.body.productName;
    let productDescription = req.body.productDescription;
    let productPrice = req.body.productPrice;
    let ownedByCategory = req.body.ownedByCategory;
    console.log(req.body.productPrice);
    // On cherche la catégorie par son id et on l'a modifie
    const newProduct = await Product.findOneAndUpdate({
        _id,
    }, {
        productName,
    }, {
        productDescription,
    }, {
        productPrice,
    }, {
        ownedByCategory,
    }, {
        new: true,
    });

    console.log(newProduct);
    //res.status(201).redirect("/categories");
    res.status(201).json({ success: true, data: newProduct });
};

// Pour la suppression d'un produit
export const deleteProduct = async (req, res, next) => {
    const _id = req.body._id;

    const product = await Product.findByIdAndDelete({
        _id
    });
    console.log(product);
    res.status(201).json({ product });
};