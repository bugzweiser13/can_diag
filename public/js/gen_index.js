$(document).ready(function() {

    // globals
    var vehInput;
    var vehShow;
    var splitConnView;
    var dataOut;

    var API = {
        saveExample: function(example) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "api/genvehlists",
                data: JSON.stringify(example)
            });
        },
        getExamples: function() {
            return $.ajax({
                url: "api/genvehlists",
                type: 'GET',

                success: function(data66) {
                    //debugging

                    // dataOut.push.apply(dataOut, data66)

                    var arrayLength = data66.length;
                    var dataOut = [];

                    data66.forEach((elem, index) => {
                            dataOut.push(elem);
                            if (dataOut.length === arrayLength)
                                data66.length = 0
                        })
                        // debugging
                        // console.log(dataIn);
                        // dataOut.push(dataIn); 
                    console.log("%o", dataOut);
                    dataPopulate(dataOut);
                }
            })
        },
        deleteExample: function(id) {
            return $.ajax({
                url: "api/genvehlist/" + id,
                type: "DELETE"
            });
        }
    };

    API.getExamples();

    // base table population before data push
    var data = [
        data1 = 'CAN High Voltage',
        data2 = 'CAN Low Voltage',
        data3 = 'Total &Omega;',
        data4 = 'Split &Omega; (M)',
        data5 = 'Split &Omega; (F)'
    ];

    var info = [
        data1 = 'v',
        data2 = 'v',
        data3 = '&Omega;',
        data4 = '&Omega;',
        data5 = '&Omega;'
    ]


    function dataPopulate(dataOut) {
        // debugging
        // console.log(dataOut);

        //vehicle dropdown population
        for (i = 0; i < dataOut.length; i++) {
            // debugging
            // console.log(dataOut[i].model_num);
            var modelOption = $("<option>")
            modelOption.attr("value", dataOut[i].model_num);
            modelOption.text(dataOut[i].model_name);
            $("#veh_sel").append(modelOption);
        }

        // vehicle selection
        $("#veh_sel").change(function() {

            var clearConn = 'images/conn_fill.jpg'
            var clearLay = 'images/layout_fill.jpg'

            // clear network dropdown on change
            // clear data boxes / cards when vehicle changed
            $("#test_loc").empty();
            $("#can_H_p").empty();
            $("#can_L_p").empty();
            $("#net_sel").empty();
            $("#myTable").empty();
            $("#trM").empty();
            $("#trF").empty();
            $(".netInput").empty();
            $(".netInput2").empty();

            //term res connector view button clear
            var trMbtn = $("#tr1btn");
            trMbtn.attr('style', 'display:none;');
            $("#tr1btn").append(trMbtn);
            var trMbtn2 = $("#tr1btn2");
            trMbtn2.attr('style', 'display:none;');
            $("#trMbtn2").append(trMbtn2);
            var trFbtn = $("#tr2btn");
            trFbtn.attr('style', 'display:none;');
            $("#tr2btn").append(trFbtn);
            var trFbtn2 = $("#tr2btn2");
            trFbtn2.attr('style', 'display:none;');
            $("#trFbtn2").append(trFbtn2);

            //table reset
            tablePop(data);

            // split connector section clear
            $("#connBtn").attr('style', 'display: none;');
            $("#connBtn2").attr('style', 'display: none;');
            $("#connLocate").attr('src', clearConn);
            $("#canLayout").attr('src', clearLay);


            //vehicle selection value
            vehSel = $("#veh_sel").val().trim();
            vehShow = parseInt(vehSel);

            // dropdown vehicle id number correction
            for (l = 0; l < dataOut.length; l++) {

                if (vehShow === dataOut[l].model_num) {
                    var dataCorrection = (dataOut[l].id - 1);
                    vehInput = dataCorrection
                }
            }
            // console.log("vehicle input = " + vehInput);

            // vehicle image / text population
            $("#velSelImg").attr('src', dataOut[vehInput].canData[0].canVolts[0].canMedia[0].vehicle);
            $("#velSelImg").attr('alt', dataOut[vehInput].canData[0].canVolts[0].canMedia[0].vehicle);
            $("#vehSel").text(dataOut[vehInput].model_name);

            // network select dropdown population
            $("#net_sel").html("<option style='display:none;' selected>Select Network</option>");
            for (j = 0; j < dataOut[vehInput].canData.length; j++) {

                var netOption = $("<option>")
                netOption.attr("value", dataOut[vehInput].canData[j].net_id);
                netOption.text(dataOut[vehInput].canData[j].net_id);
                $("#net_sel").append(netOption);
            }

            //data population
            $("#net_sel").change(function() {

                netSel = $("#net_sel").val().trim();
                // netShow = parseInt(netSel);
                // console.log("netSel = " + netSel);

                //network select
                if (netSel === 'C-CAN') {
                    netID = 0
                    netSub = 0
                    testLoc = dataOut[vehInput].canData[netID].test_loc
                    canPinH = dataOut[vehInput].canData[netID].pin_h
                    canPinL = dataOut[vehInput].canData[netID].pin_l
                    trM = dataOut[vehInput].canData[netID].term_m
                    trMview = dataOut[vehInput].canData[netID].term_M_view
                    trF = dataOut[vehInput].canData[netID].term_f
                    trFview = dataOut[vehInput].canData[netID].term_F_view
                    layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].c_can
                    locationImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].test_loc
                }
                if (netSel === 'P-CAN') {
                    netID = 1
                    netSub = 1
                    testLoc = dataOut[vehInput].canData[netID].test_loc
                    canPinH = dataOut[vehInput].canData[netID].pin_h
                    canPinL = dataOut[vehInput].canData[netID].pin_l
                    trM = dataOut[vehInput].canData[netID].term_m
                    trMview = dataOut[vehInput].canData[netID].term_M_view
                    trF = dataOut[vehInput].canData[netID].term_f
                    trFview = dataOut[vehInput].canData[netID].term_F_view
                    trFview2 = dataOut[vehInput].canData[netID].term_F_view2
                    layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].p_can1
                    locationImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].test_loc
                }

                // g80 year seperation
                if (netSel === 'P-CAN (~2018)') {
                    netID = 2
                    netSub = 1
                    canPinH = dataOut[vehInput].canData[netID].pin_h
                    canPinL = dataOut[vehInput].canData[netID].pin_l
                    testLoc = dataOut[vehInput].canData[netID].test_loc
                    trM = dataOut[vehInput].canData[netID].term_m
                    trMview = dataOut[vehInput].canData[netID].term_M_view
                    trF = dataOut[vehInput].canData[netID].term_f
                    trFview = dataOut[vehInput].canData[netID].term_F_view
                    trFview2 = dataOut[vehInput].canData[netID].term_F_view2
                    layoutImg = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].p_can2
                    locationImg = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].test_loc
                }

                if (netSel === 'P-CAN (2018~)') {
                    netID = 1
                    netSub = 1
                    canPinH = dataOut[vehInput].canData[netID].pin_h
                    canPinL = dataOut[vehInput].canData[netID].pin_l
                    testLoc = dataOut[vehInput].canData[netID].test_loc
                    trM = dataOut[vehInput].canData[netID].term_m
                    trMview = dataOut[vehInput].canData[netID].term_M_view
                    trF = dataOut[vehInput].canData[netID].term_f
                    trFview = dataOut[vehInput].canData[netID].term_F_view
                    trFview2 = dataOut[vehInput].canData[netID].term_F_view2
                    layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].p_can1
                    locationImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].test_loc
                }

                splitConnView = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].conn_view1
                totResXfer = dataOut[vehInput].canData[netID].total_res
                splitMXfer = dataOut[vehInput].canData[netID].res_val_m
                splitFXfer = dataOut[vehInput].canData[netID].res_val_f
                canVhighXfer = dataOut[vehInput].canData[netID].canVolts[netSub].volt_h
                canVlowXfer = dataOut[vehInput].canData[netID].canVolts[netSub].volt_l
                trMxfer = dataOut[vehInput].canData[netID].term_m
                trFxfer = dataOut[vehInput].canData[netID].term_f
                testLocXfer = dataOut[vehInput].canData[netID].test_loc
                model = dataOut[vehInput].model_name
                modelImg = dataOut[vehInput].canData[0].canVolts[0].canMedia[0].vehicle


                if (vehInput === 1) {
                    splitConnView = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].conn_view1
                    splitConnView2 = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].conn_view2
                }
                if (vehInput === 1 && netSel === 'C-CAN') {
                    trMview = dataOut[vehInput].canData[1].term_M_view
                    trMview2 = dataOut[vehInput].canData[2].term_M_view
                }


                // console.log(vehInput);
                // console.log("netId = " + netID);
                // connPopUp(splitConnView);
                // console.log(netSub);
                // var connBtn = $("#connBtn");
                // connBtn.attr('style', 'display:block; float:right;');
                // connBtn.attr('class', 'btn btn-info btn-sm mb-2');
                // connBtn.attr('title', 'Click for Connector View');
                // connBtn.text('Connector View');


                //secondary connector view button population if needed
                if (vehInput === 1) {
                    var connBtn = $("#connBtn");
                    connBtn.attr('style', 'display:block; float:right;');
                    connBtn.attr('class', 'btn btn-info btn-sm ml-2 mb-2');
                    connBtn.attr('title', 'Click for Connector ' + testLoc + ' View');
                    connBtn.text('2018~ Connector View');

                    var connBtn2 = $("#connBtn2");
                    connBtn2.attr('style', 'display:block; float:right;');
                    connBtn2.attr('class', 'btn btn-info btn-sm mb-2');
                    connBtn2.attr('title', 'Click for Connector ' + testLoc + ' View');
                    connBtn2.text('~2018 Connector View');
                } else {
                    var connBtn = $("#connBtn");
                    connBtn.attr('style', 'display:block; float:right;');
                    connBtn.attr('class', 'btn btn-info btn-sm mb-2');
                    connBtn.attr('title', 'Click for Connector ' + testLoc + ' View');
                    connBtn.text('Connector View');

                    var connBtn2 = $("#connBtn2");
                    connBtn2.attr('style', 'display:none');
                    connBtn2.text('Connector View');
                }

                var changeImg = $("#connLocate");
                changeImg.attr('style', 'width: 78%;');
                $("#connLocate").append(changeImg);

                // console.log("Vehicle: " + vehInput + " Network: " + netID);

                // network layout page selection button population
                // will need to change "if" statement for future use as more are added
                if (vehInput === 2 && netID === 1) {
                    var secondPagePop = $("#pageBtn");
                    secondPagePop.attr('style', 'display:block; float:right;');
                    secondPagePop.attr('class', 'btn btn-info btn-sm mb-2');
                    secondPagePop.attr('value', 'page2');
                    secondPagePop.attr('title', 'Click to Change Page');
                    secondPagePop.text('Change Page');
                    $("#pageBtn").append(secondPagePop);
                    var changeMarg = $("#netLay");
                    changeMarg.attr('class', 'card-body mt-2');
                    $("#netLay").append(changeMarg);
                } else {
                    var secondPagePop = $("#pageBtn");
                    secondPagePop.attr('style', 'display:none;');
                    $("#pageBtn").append(secondPagePop);
                    var changeMarg = $("#netLay");
                    changeMarg.attr('class', 'card-body mt-5');
                    $("#netLay").append(changeMarg);
                }

                //network layout page selection button operation if there are multiple pages
                var click = 0;

                $("#pageBtn").on('click', function() {

                    if (click != 0) {
                        layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].p_can1;
                        $("#canLayout").attr('src', layoutImg);
                        $("#canLayout").attr('alt', layoutImg);
                        $("#canLayoutHref").attr('href', layoutImg);
                        click = 0;
                    } else if (click == 0) {
                        layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].p_can2;
                        $("#canLayout").attr('src', layoutImg);
                        $("#canLayout").attr('alt', layoutImg);
                        $("#canLayoutHref").attr('href', layoutImg);
                        click = 1;
                    }
                })

                // debugging
                // console.log(dataOut);
                // console.log(vehSel);
                // console.log(vehShow);
                // console.log("What is my Number? " + vehInput);
                // console.log(dataOut[vehInput].model_name);
                // console.log("vehInput= " + vehInput);
                // console.log("netID = " + netID);
                // console.log("testLoc = " + testLoc);
                // console.log("layoutImg = " + layoutImg);
                // console.log("locationImg = " + locationImg);

                netParse = netSel;
                var netSel2 = netParse.substring(0, 5);
                // console.log(netSel2);

                // data population on page based on vehicle selection
                $("#connLocate").attr('src', locationImg);
                $("#connLocate").attr('alt', locationImg);
                $("#canLayout").attr('src', layoutImg);
                $("#canLayout").attr('alt', layoutImg);
                $("#canLayoutHref").attr('href', layoutImg);
                $("#connLocationHref").attr('href', locationImg);
                // $("#model").text(dataOut[vehInput].model);
                $(".netInput").text(netSel);
                $(".netInput2").text(netSel2);
                $("#test_loc").text(testLoc);
                $("#can_H_p").text(canPinH);
                $("#can_L_p").text(canPinL);
                $("#trM").text(trM);
                $("#trF").text(trF);
                var dataBtn = $("#dataCheck");
                dataBtn.attr('style', 'display:block;');
                dataBtn.attr('class', 'btn btn-info btn-sm')
                dataBtn.attr('title', 'Click Here to Check Measurements');
                $("#dataCheck").append(dataBtn);
                knownGoodData(vehInput);
                // dataCheck(dataOut, vehInput, netID);


                // tr connector view link button population
                // tr (male) connector view popUp button population
                if (netSel === "C-CAN" && trM === "IGPM" && vehInput === 1) {

                    var trMbtn = $("#tr1btn");
                    trMbtn.attr('style', 'display:block; float: right;');
                    trMbtn.attr('class', 'btn btn-info btn-sm ml-1');
                    trMbtn.attr('value', 'tr1a');
                    trMbtn.attr('title', 'Click to View ' + trM + ' Connector');
                    trMbtn.text('2018~');
                    $("#tr1btn").append(trMbtn);

                    var trMbtn2 = $("#tr1btn2");
                    trMbtn2.attr('style', 'display:block; float: right;');
                    trMbtn2.attr('class', 'btn btn-info btn-sm  ml-.75');
                    trMbtn2.attr('value', 'tr1b');
                    trMbtn2.attr('title', 'Click to View ' + trM + ' Connector');
                    trMbtn2.text('~2018');
                    $("#tr1btn2").append(trMbtn2);

                } else {

                    var trMbtn = $("#tr1btn");
                    trMbtn.attr('style', 'display:block; float:right;');
                    trMbtn.attr('class', 'btn btn-info btn-sm mr-4');
                    trMbtn.attr('value', 'tr1a');
                    trMbtn.attr('title', 'Click to View ' + trM + ' Connector');
                    trMbtn.text('Connector');
                    $("#tr1btn").append(trMbtn);

                    var trMbtn2 = $("#tr1btn2");
                    trMbtn2.attr('style', 'display:none;');
                    $("#tr1btn2").append(trMbtn2);
                }

                // tr (female) connector view popUp button population
                if (trF === 'ECM') {
                    var trFbtn = $("#tr2btn");
                    trFbtn.attr('style', 'display:block; float:right;');
                    trFbtn.attr('class', 'btn btn-info btn-sm mr-7');
                    trMbtn.attr('value', 'tr2a');
                    if (vehInput === 0) {
                        trFbtn.text('4cyl');
                        trFbtn.attr('title', 'Click to View 4cyl ' + trF + ' Connector');
                    } else {
                        trFbtn.text('V6');
                        trFbtn.attr('title', 'Click to View V6 ' + trF + ' Connector');
                    }
                    $("#tr2btn").append(trFbtn);

                    var trFbtn2 = $("#tr2btn2");
                    trFbtn2.attr('style', 'display:block; float:right;');
                    trFbtn2.attr('class', 'btn btn-info btn-sm mr-3');
                    trFbtn2.attr('value', 'tr2b');
                    if (vehInput === 0) {
                        trFbtn2.text('V6');
                        trFbtn2.attr('title', 'Click to View V6 ' + trF + ' Connector');
                    } else {
                        trFbtn2.text('V8');
                        trFbtn2.attr('title', 'Click to View V8 ' + trF + ' Connector');
                    }
                    $("#tr2btn2").append(trFbtn2);
                } else {
                    var trFbtn = $("#tr2btn");
                    trFbtn.attr('style', 'display:block; float:right;');
                    trFbtn.attr('class', 'btn btn-info btn-sm mr-4');
                    trMbtn.attr('value', 'tr2a');
                    trFbtn.attr('title', 'Click to View ' + trF + ' Connector');
                    trFbtn.text('Connector');
                    $("#tr2btn").append(trFbtn);

                    var trFbtn2 = $("#tr2btn2");
                    trFbtn2.attr('style', 'display:none;');
                    $("#tr2btn2").append(trFbtn2);
                }

                // vehicleXfer(dataOut, vehInput, netID);
            });
        });

        $("#dataCheck").on('click', function() {

            // console.log(modelImg);

            var myUrl = "dataCheck.html?totRes=" +
                totResXfer + "&splitM=" +
                splitMXfer + "&splitF=" +
                splitFXfer + "&canVh=" +
                canVhighXfer + "&canVl=" +
                canVlowXfer + "&model=" +
                model + "&modelImg=" +
                modelImg + "&trMale=" +
                trMxfer + "&trFemale=" +
                trFxfer + "&testLoc=" +
                testLocXfer;

            window.open(myUrl, '_blank',
                'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,status=no,top=250px, left=500px,width=1100,height=725')
            return false;
        });

        //popUp button operations
        // tr1 connector view
        $("#tr1btn").on('click', function() {
            // debugging
            // console.log("Connector: " + splitConnView); 
            var url = trMview;
            console.log(url);
            windowOpen(url);
        });

        $("#tr1btn2").on('click', function() {
            // debugging
            // console.log("Connector: " + splitConnView); 
            console.log("I'm clicked");
            var url = trMview2;
            console.log(url);
            windowOpen(url);
        });

        // tr2 connector view
        $("#tr2btn").on('click', function() {
            // debugging
            // console.log("Connector: " + splitConnView); 
            var url = trFview;
            console.log(url);
            windowOpen(url);
        });

        $("#tr2btn2").on('click', function() {
            // debugging
            // console.log("Connector: " + splitConnView); 
            var url = trFview2;
            console.log(url);
            windowOpen(url);
        });

        // split connector view
        // debugging
        // console.log(splitConnView);
        $("#connBtn").on('click', function() {
            // debugging
            // console.log("Connector: " + splitConnView); 
            var url = splitConnView;
            console.log(url);
            windowOpen(url)
        });

        //split connector alt view if needed
        $("#connBtn2").on('click', function() {
            // debugging
            // console.log("Connector: " + splitConnView); 
            var url = splitConnView2;
            console.log(url);
            windowOpen(url)
        });

        //window popUp function
        function windowOpen(url) {
            window.open(url, '_blank',
                'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=600')
            return false;
        }

        // known good data table population (blank / static)
        function tablePop(data) {
            for (let i = 0; i < data.length; i++) {
                tRow = $('<tr>');
                tCell1 = $('<td>').html(data[i]);
                tCell1.attr('class', "title");
                var tCell2 = $('<td>')
                tCell2.html(info[i]);
                tCell2.attr('class', "goodValue");
                $("#myTable").append(tRow.append(tCell1, tCell2));
            }
        }

        //known good data population (within table)
        function knownGoodData(vehInput) {
            $("#myTable").empty();

            // console.log(vehInput);
            // console.log(info);

            var info = [
                CANhighV = dataOut[vehInput].canData[netID].canVolts[netSub].volt_h + "v",
                CANlowV = dataOut[vehInput].canData[netID].canVolts[netSub].volt_l + "v",
                totRes = dataOut[vehInput].canData[netID].total_res + "&Omega;",
                splitM = dataOut[vehInput].canData[netID].res_val_m + "&Omega;",
                splitF = dataOut[vehInput].canData[netID].res_val_f + "&Omega;",
            ];

            // table population
            for (let i = 0; i < data.length; i++) {
                tRow = $('<tr>');
                tCell1 = $('<td>').html(data[i]);
                tCell1.attr('class', "title");
                var tCell2 = $('<td>')
                tCell2.html(info[i]);
                tCell2.attr('class', "goodValue");
                $("#myTable").append(tRow.append(tCell1, tCell2));
            }
        }

    }


    // new model input page open
    // inputBtn value loads genesis / hyundai
    var inputBtn = $("#input-btn").val().trim();

    $("#input-btn").on('click', function() {
        console.log("model input clicked: " + inputBtn);
        var myUrl = "model_input.html?brand=" + inputBtn;
        window.open(myUrl, '_blank',
            'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=500')
        return false;
    });

});