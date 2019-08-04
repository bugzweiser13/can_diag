// globals
var vehInput;
var vehShow;
var inputBtn = $("#input-btn").val().trim();

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


var data = [
    data1 = 'CAN High Voltage',
    data2 = 'CAN Low Voltage',
    data3 = 'Total &Omega;',
    data4 = 'Split &Omega; (M)',
    data5 = 'Split &Omega; (F)'
];

var info = [
    data1 = '2.71',
    data2 = '2.31',
    data3 = '59.7',
    data4 = '119.7',
    data5 = '118.6',
]

var veh = [{
        id: 0,
        name: "G70",
        model: 'IK',
        network: "C-CAN",
        testLocation: 'EF21',
        CANhighP: '09',
        CANlowP: '10',
        CANhighV: '2.81',
        CANlowV: '2.22',
        TotRes: '60.1',
        SplitM: '120.5',
        SplitF: '119.7',
        vehImage: 'images/ik/g70.jpg',
        conLocate: 'images/ik/conn_local.jpg',
        canLayout: 'images/ik/c_can.jpg'
    },
    {
        id: 1,
        name: "G80",
        model: 'DH',
        network: "C-CAN",
        testLocation: 'EF21',
        CANhighP: '13',
        CANlowP: '14',
        CANhighV: '2.79',
        CANlowV: '2.33',
        TotRes: '59.9',
        SplitM: '118.6',
        SplitF: '121.1',
        vehImage: 'images/dh/g80.jpg',
        conLocate: 'images/dh/conn_local.jpg',
        canLayout: 'images/dh/c_can.jpg'
    },
    {
        id: 2,
        name: 'G90',
        model: 'HI',
        network: "C-CAN",
        testLocation: 'EF21',
        CANhighP: '21',
        CANlowP: '20',
        CANhighV: '2.71',
        CANlowV: '2.31',
        TotRes: '59.7',
        SplitM: '119.7',
        SplitF: '118.6',
        vehImage: 'images/hi/g90.jpg',
        conLocate: 'images/hi/conn_local.jpg',
        canLayout: 'images/hi/c_can.jpg'
    }
];


function dataPopulate(dataOut) {
    // debugging
    // console.log(dataOut);

    for (i = 0; i < dataOut.length; i++) {
        // debugging
        // console.log(dataOut[i].model_num);
        var option = $("<option>")
        option.attr("value", dataOut[i].model_num);
        option.text(dataOut[i].model_name);
        $("#veh_sel").append(option);
    }



    //data population
    $("#veh_sel").change(function() {

        vehSel = $("#veh_sel").val().trim();
        vehShow = parseInt(vehSel);

        // debugging 
        console.log(dataOut);
        console.log(vehSel);
        console.log(vehShow);

        for (l = 0; l < dataOut.length; l++) {

            if (vehShow === dataOut[l].model_num) {
                var dataCorrection = (dataOut[l].id - 1);
                vehInput = dataCorrection
            }

        }

        //debugging
        console.log("What is my Number? " + vehInput);
        console.log(dataOut[vehInput].model_name);

        $("#velSelImg").attr('src', veh[vehInput].vehImage);
        $("#velSelImg").attr('alt', veh[vehInput].vehImage);
        $("#connLocate").attr('src', veh[vehInput].conLocate);
        $("#connLocate").attr('alt', veh[vehInput].conLocate);
        $("#canLayout").attr('src', veh[vehInput].canLayout);
        $("#canLayout").attr('alt', veh[vehInput].canLayout);
        $("#canLayoutHref").attr('href', veh[vehInput].canLayout);
        $("#connLocationHref").attr('href', veh[vehInput].conLocate);
        $("#vehSel").text(veh[vehInput].name);
        $("#model").text(veh[vehInput].model);
        $(".netInput").text(veh[vehInput].network);
        $("#test_loc").text(veh[vehInput].testLocation);
        $("#can_H_p").text(veh[vehInput].CANhighP);
        $("#can_L_p").text(veh[vehInput].CANlowP);

        knownGoodData(vehInput);

    });

    //known good data population
    function knownGoodData(vehInput) {
        $("#myTable").empty();

        var info = [
            CANhighV = veh[vehInput].CANhighV + "v",
            CANlowV = veh[vehInput].CANlowV + "v",
            TotRes = veh[vehInput].TotRes + "&Omega;",
            SplitM = veh[vehInput].SplitM + "&Omega;",
            SplitF = veh[vehInput].SplitF + "&Omega;"
        ];

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

$("#input-btn").on('click', function() {
    console.log("model input clicked: " + inputBtn);
    var myUrl = "model_input.html?brand=" + inputBtn;
    window.open(myUrl, '_blank',
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=500')
    return false;
});