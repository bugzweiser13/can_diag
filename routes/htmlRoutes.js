// var path = require("path");
// // =============================================================
// // Routes
// // =============================================================
// module.exports = function(app) {

//     // Each of the below routes just handles the HTML page that the user gets sent to.

//     // index route loads view.html
//     app.get("/", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/index.html"));
//     });

//     // cms route loads cms.html
//     app.get("/cms", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/cms.html"));
//     });

//     // blog route loads blog.html
//     app.get("/blog", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/blog.html"));
//     });

//     // authors route loads author-manager.html
//     app.get("/authors", function(req, res) {
//         res.sendFile(path.join(__dirname, "../public/author-manager.html"));
//     });

// };

var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.render("index", {
                msg: "Welcome!",
                examples: dbExamples
            });
        });
    });

    // Load example page and pass in an example by id
    app.get("/example/:id", function(req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
            res.render("example", {
                example: dbExample
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};