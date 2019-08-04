var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.genvehlist.findAll({}).then(function(dbgenvehlist) {
            res.render("index", {
                msg: "Welcome!",
                examples: dbgenvehlist
            });
        });
    });

    // // Load example page and pass in an example by id
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