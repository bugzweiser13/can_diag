var db = require("../models");

module.exports = function(app) {
    // Get all examples

    // app.get("/api/genvehlists", function(req, res) {
    //     // Here we add an "include" property to our options in our findAll query
    //     // We set the value to an array of the models we want to include in a left outer join
    //     // In this case, just db.Post


    //     db.genvehlist.findAll({
    //         include: [{
    //             model: db.gencanres,
    //             as: "model_num"
    //         }]


    //     }).then(function(dbgencanres) {
    //         res.json(dbgencanres);
    //         // console.log("%o", dbgencanres);
    //     });
    // });


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


    app.get("/api/users", function(req, res) {
        db.users.findAll({}).then(function(dbusers) {
            res.json(dbusers);
            // console.log("%o", dbusers);

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