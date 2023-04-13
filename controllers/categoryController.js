import Category from "../models/Category.js";

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
    const id = req.params.id
    console.log(id);
    //console.log(req.path.split("/")[2]);
    // Création d'un nouvelle catégorie
    //const category = await Category.findById(req.path.split("/")[2]);
    const category = await Category.findById({"_id":id});

    console.log(category);
    //res.json(category);
    res.status(200).render('category/getCategory', {
        title: "CategoryOne",
        category: category,
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

// Création des catégories
export const putCategory = async (req, res, next) => {
    const _id = req.body._id;
    const categoryName = req.body.categoryName;

    // Création d'un nouvelle catégorie
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

export const deleteCategory = async (req, res, next) => {
    const _id = req.body._id;

    const category = await Category.findByIdAndDelete({
        _id
    });
    console.log(category);
    res.status(201).json({ category });
};
