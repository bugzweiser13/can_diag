// globals
var vehInput;
var vehShow;

var API = {
    saveExample: function(example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/examples",
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

                var array1Length = data66.length;
                var dataOut = [];

                data66.forEach((elem, index) => {
                        dataOut.push(elem);
                        if (dataOut.length === array1Length)
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
        // clear data images when vehicle changed
        $("#net_sel").empty();
        $("#myTable").empty();
        tablePop(data);
        $("#connBtn").attr('style', 'opacity: 0');
        $("#connLocate").attr('src', clearConn);
        $("#canLayout").attr('src', clearLay);
        $("#net_sel").html("<option>Network</option>");

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

        // if (vehInput === 2 && netSel === 1) {
        //     $("#pageBtn").attr('style', 'display:block;');
        // }

        // vehicle image / text population
        $("#velSelImg").attr('src', dataOut[vehInput].canData[0].canVolts[0].canMedia[0].vehicle);
        $("#velSelImg").attr('alt', dataOut[vehInput].canData[0].canVolts[0].canMedia[0].vehicle);
        $("#vehSel").text(dataOut[vehInput].model_name);
        // network dropdown population
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
                trF = dataOut[vehInput].canData[netID].term_f
                layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].c_can
                locationImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].test_loc
                connView = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].conn_view1
            }
            if (netSel === 'P-CAN') {
                netID = 1
                netSub = 1
                canPinH = dataOut[vehInput].canData[netID].pin_h
                canPinL = dataOut[vehInput].canData[netID].pin_l
                testLoc = dataOut[vehInput].canData[netID].test_loc
                trM = dataOut[vehInput].canData[netID].term_m
                trF = dataOut[vehInput].canData[netID].term_f
                layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].p_can1
                locationImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].test_loc
                connView = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].conn_view1
            }

            // g80 year seperation
            if (netSel === 'P-CAN (~2018)') {
                netID = 2
                netSUB = 1
                canPinH = dataOut[vehInput].canData[netID].pin_h
                canPinL = dataOut[vehInput].canData[netID].pin_l
                testLoc = dataOut[vehInput].canData[netID].test_loc
                trM = dataOut[vehInput].canData[netID].term_m
                trF = dataOut[vehInput].canData[netID].term_f
                layoutImg = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].p_can2
                locationImg = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].test_loc
                connView = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].conn_view2
            }

            if (netSel === 'P-CAN (2018~)') {
                netID = 1
                netSub = 1
                canPinH = dataOut[vehInput].canData[netID].pin_h
                canPinL = dataOut[vehInput].canData[netID].pin_l
                testLoc = dataOut[vehInput].canData[netID].test_loc
                trM = dataOut[vehInput].canData[netID].term_m
                trF = dataOut[vehInput].canData[netID].term_f
                layoutImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].p_can1
                locationImg = dataOut[vehInput].canData[netID].canVolts[netID].canMedia[0].test_loc
                connView = dataOut[vehInput].canData[netID].canVolts[netSub].canMedia[0].conn_view1
            }

            // console.log(vehInput);
            // console.log("netId = " + netID);

            var testBtn = $("#connBtn");
            testBtn.attr('style', 'display:block; float:right;');
            testBtn.attr('class', 'btn btn-info btn-sm mb-2');
            testBtn.text('Connector View');
            var changeImg = $("#connLocate");
            changeImg.attr('style', 'width: 81%;');
            $("#connLocate").append(changeImg);


            // second etm page selection population if needed
            // will need to change if statement for future use as more are added
            if (vehInput === 2 && netID === 1) {
                var secondPagePop = $("#pageBtn");
                secondPagePop.attr('style', 'display:block; float:right;');
                secondPagePop.attr('class', 'btn btn-info btn-sm mb-1');
                secondPagePop.attr('value', 'page2');
                secondPagePop.attr('title', 'Click to Change Page');
                secondPagePop.text('Change Page');
                $("#pageBtn").append(secondPagePop);
                var changeMarg = $("#netLay");
                changeMarg.attr('class', 'card-body mt-3')
                $("#netLay").append(changeMarg);
            }
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

            // connector view popUp
            $("#connBtn").on('click', function() {
                // console.log("Connector: " + connView); 
                var connUrl = connView;
                console.log(connUrl);
                window.open(connUrl, '_blank',
                    'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=600')
                return false;
            });

            // debugging
            // console.log(dataOut);
            // console.log(vehSel);
            // console.log(vehShow);
            // console.log("What is my Number? " + vehInput);
            // // console.log(dataOut[vehInput].model_name);
            // console.log("vehInput= " + vehInput);
            // console.log("netID = " + netID);
            // console.log("testLoc = " + testLoc);
            // console.log("layoutImg = " + layoutImg);
            // console.log("locationImg = " + locationImg);

            netParse = netSel;
            var netSel2 = netParse.substring(0, 5);
            // console.log(netSel2);

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

            knownGoodData(vehInput);

        });
    });



    //  
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

    //known good data population
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