import Category from "../models/Category.js";

// Get All Categories
export const getCategories = (req, res, next) => {
    res.render("category/getCategories", {
        title: "CategoryList",
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