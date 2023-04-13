// Ancienne façon de faire : 
// exports.getHomepage = (req, res, next) => {
//     res.render( "homepage", {
//         title: this.getHomepage,
//     });
// };

export const getHomepage = (req, res, next) => {
    res.render("homepage", {
        title: "Homepage",
    });
};