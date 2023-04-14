import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Get All Categories
export const getCategories = async (req, res, next) => {
    // Création d'un nouvelle catégorie
    const categories = await Category.find();
    console.log(categories);
    //res.json(categories);
    res.status(200).render('category/getCategories', {
        title: "CategoryList",
        categories: categories,
    });

};

// Get Categorie par l'id
export const getCategory = async (req, res, next) => {
    console.log(req);
    const id = req.params.categoryName.replaceAll('-', ' ');
    //console.log(id);
    //console.log(req.path.split("/")[2]);
    // Création d'un nouvelle catégorie
    //const category = await Category.findById(req.path.split("/")[2]);
    const category = await Category.findOne({"categoryName": id});

    //console.log(category);
    //res.json(category);
    res.status(200).render('category/getCategory', {
        title: "CategoryOne",
        category: category,
    });

};

// Affichage des produits lier à la catégorie soin des mains
export const getHandCare = async (req, res, next) => {
    const id = "6437caa764ae079bbff039a8";
    const categoryHandCare = await Category.findById({"_id": id});
    console.log('je passe ici');
    const productHandCare = await Product.find({"ownedByCategory": id});
    console.log('Et ici aussi');
    console.log(categoryHandCare);
    console.log(productHandCare);

    res.status(200).render('category/getHandCare', {
        title: "Soin des mains",
        categoryHandCare: categoryHandCare,
        productHandCare: productHandCare,
    });
};

// Affichage des produits lier à la catégorie soin du visage
export const getFacialCare = async (req, res, next) => {
    const id = "6437b46436ed00060e206bda";
    const categoryFacialCare = await Category.findById({"_id": id});
    console.log('je passe ici');
    const productFacialCare = await Product.find({"ownedByCategory": id});
    console.log('Et ici aussi');
    console.log(categoryFacialCare);
    console.log(productFacialCare);

    res.status(200).render('category/getFacialCare', {
        title: "Soin du visage",
        categoryFacialCare: categoryFacialCare,
        productFacialCare: productFacialCare,
    });
};

// Affichage des produits lier à la catégorie maquillage
export const getMakeup = async (req, res, next) => {
    const id = "6436c678a7b03f225d71218d";
    const categoryMakeup = await Category.findById({"_id": id});
    console.log('je passe ici');
    const productMakeup = await Product.find({"ownedByCategory": id});
    console.log('Et ici aussi');
    console.log(categoryMakeup);
    console.log(productMakeup);

    res.status(200).render('category/getMakeup', {
        title: "Maquillage",
        categoryMakeup: categoryMakeup,
        productMakeup: productMakeup,
    });
};

// Affichage des produits lier à la catégorie soin du corp
export const getBodyCare = async (req, res, next) => {
    const id = "6437b43b36ed00060e206bd6";
    const categoryBodyCare = await Category.findById({"_id": id});
    console.log('je passe ici');
    const productBodyCare = await Product.find({"ownedByCategory": id});
    console.log('Et ici aussi');
    console.log(categoryBodyCare);
    console.log(productBodyCare);

    res.status(200).render('category/getBodyCare', {
        title: "Soin du corp",
        categoryBodyCare: categoryBodyCare,
        productBodyCare: productBodyCare,
    });
};


// Création des catégories
export const postCategory = async (req, res, next) => {
    const categoryName = req.body.categoryName;

    // Création d'un nouvelle catégorie
    const category = await Category.create({
        categoryName,
    });

    console.log(category);
    //res.status(201).redirect("/categories");
    res.status(201).json({ category });
};

// Pour la modification d'une catégorie
export const putCategory = async (req, res, next) => {
    const _id = req.body._id;
    const categoryName = req.body.categoryName;

    // On cherche la catégorie par son id et on l'a modifie
    const category = await Category.findByIdAndUpdate({
        _id,
    }, {
        categoryName,
    }, {
        new: true,
    });

    console.log(category);
    //res.status(201).redirect("/categories");
    res.status(201).json({ category });
};

// Pour la suppression d'une catégorie
export const deleteCategory = async (req, res, next) => {
    const _id = req.body._id;

    const category = await Category.findByIdAndDelete({
        _id
    });
    console.log(category);
    res.status(201).json({ category });
};
