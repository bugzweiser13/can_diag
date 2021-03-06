var db = require("../models");

module.exports = function(app) {
    // Get all examples

    // get user
    app.get("/api/users", function(req, res) {
        db.users.findAll({}).then(function(dbusers) {
            res.json(dbusers);
            // console.log("%o", dbusers);

        });
    });

    // // Create a new user
    app.post("/api/users", function(req, res) {
        db.users.create(req.body).then(function(dbusers) {
            res.json(dbusers);
        });
    });

    // Delete an example by id
    app.delete("/api/users", function(req, res) {
        console.log(req.body);
        db.users.destroy({ where: { user: req.body.user } }).then(function(dbusers) {
            // if (err) {
            //     return res.status(404).send('Error deleting')
            // }
            res.json(dbusers);
        });


    });

    app.post("/api/genvehlists", function(req, res) {
        console.log(req.body);
        db.genvehlist.create(req.body).then(function(dbgenvehlist) {
            res.json(dbgenvehlist);
        });
    });
    app.post("/api/gencanress", function(req, res) {
        console.log(req.body);
        db.gencanres.create(req.body).then(function(dbgencanres) {
            res.json(dbgencanres);
        });
    });
    app.post("/api/gencanvolts", function(req, res) {
        console.log(req.body);
        db.gencanvolts.create(req.body).then(function(dbgencanvolts) {
            res.json(dbgencanvolts);
        });
    });
    app.post("/api/genmedia", function(req, res) {
        console.log(req.body);
        db.genmedia.create(req.body).then(function(dbgenmedia) {
            res.json(dbgenmedia);
        });
    });

    app.get('/api/genvehlists', (req, res) => {

        db.genvehlist.findAll({
            include: [{ model: db.gencanres }, { model: db.gencanvolts }, { model: db.genmedia }]

        }).then(genvehlist => {
            // console.log("%o", genvehlist);
            // console.log(JSON.stringify(genvehlist));
            const resObj = genvehlist.map(vehicle => {

                //vehicle data
                return Object.assign({}, {
                    id: vehicle.id,
                    model: vehicle.model,
                    model_num: vehicle.model_num,
                    model_name: vehicle.model_name,
                    canData: vehicle.gencanres.map(omega => {

                        //can res data
                        return Object.assign({}, {
                            id: omega.id,
                            model_name: omega.model,
                            model_num: omega.model_num,
                            start_year: omega.start_year,
                            end_year: omega.end_year,
                            net_id: omega.net_id,
                            test_loc: omega.test_loc,
                            pin_h: omega.pin_h,
                            pin_l: omega.pin_l,
                            res_val_m: omega.res_val_m,
                            res_val_f: omega.res_val_f,
                            term_m: omega.term_m,
                            term_M_view: omega.trM_view,
                            term_f: omega.term_f,
                            term_F_view: omega.trF_view,
                            term_F_view2: omega.trF_view2,
                            total_res: omega.tot_res,

                            canVolts: vehicle.gencanvolts.map(volts => {

                                // can voltage
                                return Object.assign({}, {
                                    model_num: volts.model_num,
                                    model_name: volts.model,
                                    net_id: volts.net_id,
                                    volt_h: volts.volt_h,
                                    volt_l: volts.volt_l,

                                    canMedia: vehicle.genmedia.map(media => {

                                        // can media
                                        return Object.assign({}, {
                                            model_num: media.model_num,
                                            vehicle: media.model_img,
                                            c_can: media.c_can_img,
                                            p_can1: media.p_can_img1,
                                            p_can2: media.p_can_img2,
                                            test_loc: media.test_loc_img,
                                            conn_view1: media.conn_view1,
                                            conn_view2: media.conn_view2
                                        })
                                    })
                                })
                            })
                        })
                    })
                })

            });
            res.json(resObj)

        });
    });




};