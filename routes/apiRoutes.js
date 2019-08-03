var db = require("../models");

module.exports = function(app) {
    // Get all examples

    // app.get("/api/genvehlists", function(req, res) {
    //     // Here we add an "include" property to our options in our findAll query
    //     // We set the value to an array of the models we want to include in a left outer join
    //     // In this case, just db.Post
    //     db.Genvehlist.findAll({
    //         include: [db.Gencanres]
    //     }).then(function(dbGencanres) {
    //         res.json(dbGencanres);
    //     });
    // });

    app.get("/api/genvehlists", function(req, res) {
        db.genvehlist.findAll({}).then(function(dbgenvehlist) {
            res.json(dbgenvehlist);
        });
    });

    // // Create a new example
    // app.post("/api/examples", function(req, res) {
    //     db.Example.create(req.body).then(function(dbExample) {
    //         res.json(dbExample);
    //     });
    // });

    // // Delete an example by id
    // app.delete("/api/examples/:id", function(req, res) {
    //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
    //         res.json(dbExample);
    //     });
    // });
};