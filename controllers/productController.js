import Product from "../models/Product.js";
import Category from "../models/Category.js";


// Afficher tous les produits
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).render("product/getProducts", {
            title: "Liste des produits",
            products: products,
        });
    } catch (error) {
        console.error(error);
    }
};

// Afficher un produit par son id
export const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        //console.log(id);
        //console.log(req.path.split("/")[2]);
        //const category = await Category.findById(req.path.split("/")[2]);
        const product = await Product.findById({ "_id": id });
        const category = await Category.findById(product.ownedByCategory);
        console.log(category);

        //res.json(product);
        res.status(200).render('product/getProduct', {
            title: "productOne",
            product: product,
            category: category,
        });
    } catch (error) {
        console.error(error);
    }

};

// Affichage du formulaire pour créer un produit
export const addProduct = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.render('product/addProduct', {
            title: "productAdd",
            categories: categories,
        });
    } catch (error) {
        console.error(error);
    }
};

// Soumission du formulaire en post
export const postProduct = async (req, res, next) => {
    try {
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
        res.status(201).redirect("/administration/dashboard");
        //res.status(201).json({ product });
    } catch (error) {
        console.error(error);
    }
};

// Affichage du formulaire pour créer un produit
export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const categories = await Category.find();
        const product = await Product.findById({ "_id": id });
        res.render('product/updateProduct', {
            title: "Modifier un produit",
            categories: categories,
            product: product,
        });
    } catch (error) {
        console.error(error);
    }
};
// Pour la modification d'un produit
export const putProduct = async (req, res, next) => {
    try {
        const _id = req.body.id;
        let productName = req.body.productName;
        let productDescription = req.body.productDescription;
        let productPrice = req.body.productPrice;
        let ownedByCategory = req.body.ownedByCategory;
        console.log(req.body.productPrice);
        // On cherche la catégorie par son id et on l'a modifie
        const product = await Product.findOneAndUpdate({
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

        console.log(product);
        res.status(201).redirect("/administration/dashboard");
        //res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.error(error);
    }
};

// Pour la suppression d'un produit
export const deleteProduct = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const product = await Product.findByIdAndDelete({
            _id
        });
        console.log(product);
        //res.status(201).json({ product });
        res.status(201).redirect("/administration/dashboard");
    } catch (error) {
        console.error(error);
    }
};