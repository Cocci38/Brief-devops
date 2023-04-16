import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Afficher toutes les catégories
export const getCategories = async (req, res, next) => {
    // Création d'un nouvelle catégorie
    try {
        const categories = await Category.find();
        console.log(categories);
        // res.json(categories);
        res.status(200).render('category/getCategories', {
            title: "Liste des catégories",
            categories: categories,
        });
    } catch (error) {
        console.error(error);
    }
};

// Afficher une categorie par son nom et les produits qui lui son associé
export const getCategory = async (req, res, next) => {
    try {
        //console.log(req);
        let id = req.params.categoryName[0].toUpperCase() + req.params.categoryName.slice(1).replaceAll('-', ' ');
        if (id === "Beaute des mains") {
            id = "Beauté des mains";
        }
        console.log(id);

        const category = await Category.findOne({ "categoryName": id });
        const idCategory = category._id; 
        console.log(idCategory);
        const products = await Product.find({ "ownedByCategory": idCategory });
        //const category = await Category.findOne({"_id": id});
        console.log(category);
        // res.json(category);
        res.status(200).render('category/getCategory', {
            title: category.categoryName,
            category: category,
            products: products,
        });
    } catch (error) {
        console.error(error);
    }

};

// // Affichage des produits lier à la catégorie soin des mains
// export const getHandCare = async (req, res, next) => {
//     try {
//         const id = "6437caa764ae079bbff039a8";
//         const categoryHandCare = await Category.findById({ "_id": id });
//         const productHandCare = await Product.find({ "ownedByCategory": id });
//         // console.log(categoryHandCare);
//         // console.log(productHandCare);

//         res.status(200).render('category/getHandCare', {
//             title: "Beauté des mains",
//             categoryHandCare: categoryHandCare,
//             productHandCare: productHandCare,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

// // Affichage des produits lier à la catégorie soin du visage
// export const getFacialCare = async (req, res, next) => {
//     try {
//         const id = "6437b46436ed00060e206bda";
//         const categoryFacialCare = await Category.findById({ "_id": id });
//         const productFacialCare = await Product.find({ "ownedByCategory": id });
//         // console.log(categoryFacialCare);
//         // console.log(productFacialCare);

//         res.status(200).render('category/getFacialCare', {
//             title: "Soin du visage",
//             categoryFacialCare: categoryFacialCare,
//             productFacialCare: productFacialCare,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

// // Affichage des produits lier à la catégorie maquillage
// export const getMakeup = async (req, res, next) => {
//     try {
//         const id = "6436c678a7b03f225d71218d";
//         const categoryMakeup = await Category.findById({ "_id": id });
//         // console.log('je passe ici');
//         const productMakeup = await Product.find({ "ownedByCategory": id });
//         // console.log(categoryMakeup);
//         // console.log(productMakeup);

//         res.status(200).render('category/getMakeup', {
//             title: "Maquillage",
//             categoryMakeup: categoryMakeup,
//             productMakeup: productMakeup,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };

// // Affichage des produits lier à la catégorie soin du corp
// export const getBodyCare = async (req, res, next) => {
//     try {
//         const id = "6437b43b36ed00060e206bd6";
//         const categoryBodyCare = await Category.findById({ "_id": id });
//         const productBodyCare = await Product.find({ "ownedByCategory": id });
//         // console.log(categoryBodyCare);
//         // console.log(productBodyCare);

//         res.status(200).render('category/getBodyCare', {
//             title: "Soin du corp",
//             categoryBodyCare: categoryBodyCare,
//             productBodyCare: productBodyCare,
//         });
//     } catch (error) {
//         console.error(error);
//     }
// };


// Création des catégories
export const postCategory = async (req, res, next) => {
    try {
        const categoryName = req.body.categoryName;

        // Création d'un nouvelle catégorie
        const category = await Category.create({
            categoryName,
        });

        console.log(category);
        //res.status(201).redirect("/categories");
        res.status(201).json({ category });
    } catch (error) {
        console.error(error);
    }
};

// Pour la modification d'une catégorie
export const putCategory = async (req, res, next) => {
    try {
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
    } catch (error) {
        console.error(error);
    }
};

// Pour la suppression d'une catégorie
export const deleteCategory = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const category = await Category.findByIdAndDelete({
            _id
        });
        console.log(category);
        res.status(201).json({ category });
    } catch (error) {
        console.error(error);
    }
};
