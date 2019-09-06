var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.users.findAll({}).then(function(dbusers) {
            res.render("index", {
                msg: "Welcome!",
                examples: dbusers
            });
        });
    });

    app.get("/genesis", function(req, res) {
        db.genvehlist.findAll({}).then(function(dbgenvehlist) {
            res.render("genesis", {
                msg: "Welcome!",
                examples: dbgenvehlist
            });
        });
    });

    // // Load example page and pass in an example by id
    app.get("/admin/:id", function(req, res) {
        db.users.findOne({ where: { id: req.params.id } }).then(function(dbusers) {
            res.render("example", {
                example: dbusers
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};