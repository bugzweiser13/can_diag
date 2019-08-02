var vehInput;
var vehShow;
var inputBtn = $("#input-btn").val().trim();

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

//vehicle dropdown selection
for (i = 0; i < veh.length; i++) {
    var option = $("<option>")
    option.attr("value", veh[i].id);
    option.text(veh[i].name);
    $("#veh_sel").append(option);
}

//data population
$("#veh_sel").change(function() {

    vehSel = $("#veh_sel").val().trim();
    vehShow = parseInt(vehSel);

    for (l = 0; l < veh.length; l++) {

        if (vehShow === veh[l].id) {
            vehInput = vehShow
        }

        // initMap(zoom);
    }

    console.log(vehInput);

    // console.log("What is my Number? " + vehInput);
    // console.log("You got G90");
    // console.log(veh[vehInput].name);

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

$("#input-btn").on('click', function() {
    console.log("model input clicked: " + inputBtn);
    var myUrl = "model_input.html?brand=" + inputBtn;
    window.open(myUrl, '_blank',
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=500')
    return false;
});