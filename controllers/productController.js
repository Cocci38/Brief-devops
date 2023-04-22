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
        if (req.session.userRole === "USER_ADMIN") {
            const userAdmin = req.session.userRole;
            res.status(200).render('product/getProduct', {
                title: "productOne",
                product: product,
                category: category,
                userAdmin: userAdmin,
            });
        } else {
            res.status(200).render('product/getProduct', {
                title: "productOne",
                product: product,
                category: category,
            });
        }
    } catch (error) {
        console.error(error);
    }

};

// Affichage du formulaire pour créer un produit
export const addProduct = async (req, res, next) => {
    console.log(req.session);
    if (req.session.userRole === "USER_ADMIN") {
        try {
            const userAdmin = req.session.userRole;
            const categories = await Category.find();
            res.render('product/addProduct', {
                title: "productAdd",
                categories: categories,
                userAdmin: userAdmin,
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect("/");
    }
};

// Soumission du formulaire en post
export const postProduct = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
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
            res.status(201).redirect("/admin/dashboard");
            //res.status(201).json({ product });
        } catch (error) {
            console.error(error);
        }
    }
};

// Affichage du formulaire pour créer un produit
export const updateProduct = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
        try {
            const userAdmin = req.session.userRole;
            const id = req.params.id;
            console.log("id : " + id);
            const product = await Product.findById({ "_id": id });

            const categories = await Category.find();
            console.log("categorie : " + categories);
            const productCategory = await Category.findById({ "_id": product.ownedByCategory });
            console.log("produit : " + productCategory);

            res.render('product/updateProduct', {
                title: "Modifier un produit",
                categories: categories,
                product: product,
                productCategory: productCategory,
                userAdmin: userAdmin,
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        res.redirect("/");
    }
};
// Pour la modification d'un produit
export const putProduct = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
        try {
            console.log(req.body);
            const _id = req.body._id;
            let productName = req.body.productName;
            let productDescription = req.body.productDescription;
            let productPrice = req.body.productPrice;
            let ownedByCategory = req.body.ownedByCategory;
            console.log(req.body.productPrice);
            // On cherche la catégorie par son id et on l'a modifie
            const product = await Product.findByIdAndUpdate({
                _id: _id,
            }, {
                productName,
                productDescription,
                productPrice,
                ownedByCategory,
            }, {
                new: true,
            });

            console.log(product);
            //res.status(201).json({ product })
            res.status(201).redirect("/admin/dashboard");
            // res.status(201).json({ success: true, data: product });
        } catch (error) {
            console.error(error);
        }
    }
};

// Pour la suppression d'un produit
export const deleteProduct = async (req, res, next) => {
    if (req.session.userRole === "USER_ADMIN") {
        try {
            const _id = req.params.id;
            const product = await Product.findByIdAndDelete({
                _id
            });
            console.log(product);
            //res.status(201).json({ product });
            res.status(201).redirect("/admin/dashboard");
        } catch (error) {
            console.error(error);
        }
    }
};