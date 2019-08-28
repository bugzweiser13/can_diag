// param decipher
function getUrlParams() {

    var paramMap = {};
    if (location.search.length == 1) {
        return paramMap;
    }
    var parts = location.search.substring(1).split("&");

    for (var i = 0; i < parts.length; i++) {
        var component = parts[i].split("=");
        paramMap[decodeURIComponent(component[0])] = decodeURIComponent(component[1]);
    }
    return paramMap;
}

// url (param) variables
var params = getUrlParams();
var totResP = params['totRes'];
var splitMP = params['splitM'];
var splitFP = params['splitF'];
var canVhP = params['canVh'];
var canVlP = params['canVl'];
var trMale = params['trMale'];
var trFemale = params['trFemale'];
var testLoc = params['testLoc'];
var model = params['model'];
var modelImg = params['modelImg'];

// debugging 
// console.log("Known Total: " + totRes);
// console.log("Known Male Split: " + splitM);
// console.log("Known Female Split: " + splitF);
// console.log("Known CAN High Voltage: " + canVh);
// console.log("Known CAN Low Voltage: " + canVl);
// console.log(modelImg);
// console.log(trMale);

// change strings to int as needed
totRes = Number(totResP).toFixed(2);
splitM = Number(splitMP).toFixed(2);
splitF = Number(splitFP).toFixed(2);
canVh = Number(canVhP).toFixed(2);
canVl = Number(canVlP).toFixed(2);

// specification range variables
var totalCanRangeMin = 58;
var totalCanRangeMax = 62;
var splitCanRangeMin = 110;
var splitCanRangeMax = 124;
var canVoltLowRangeMin = 2.1;
var canVoltLowRangeMax = 2.45;
var canVoltHighRangeMin = 2.55;
var canVoltHighRangeMax = 2.9;
var canVoltShortMin = 2.0;
var canVoltShortMax = 3.0;
var canVoltGroundMin = 0;
var canVoltGroundMax = 1.0;
var canGroundRange = 700;

// image load
var modelShow = $("#modelImg");
modelShow.attr('src', modelImg);
modelShow.attr('alt', 'modelImg.jpg');
$("#modelImg").append(modelShow);

// selected model html push
$("#model").text(model);

// input box width based on placeholders
// $("input[placeholder]").each(function() {
//     $(this).attr('size', $(this).attr('placeholder').length);
// });

// clear input box when on focus
$('.canInput').on('click focusin', function() {
    this.value = '';
});

// param (known good) html push (if needed)
// $("#totRes").text(totRes);
// $("#splitM").text(splitM);
// $("#splitF").text(splitF);
// $("#canH").text(canVh);
// $("#canL").text(canVl);


//disable sumbit button until all fields are inputed
$("input[type=submit]").attr("disabled", "disabled");
$('#submit').attr('class', 'btn btn-secondary btn-sm ml-2');

$('.canInput').bind('keyup', function() {
    var totResInTest = $("#totResIn");
    var splitMinTest = $("#splitMin");
    var splitFinTest = $("#splitFin");
    var canHvInTest = $("#canHvIn");
    var canLvInTest = $("#canLvIn");
    var canGroundHTest = $("#canGroundH");
    var canGroundLTest = $("#canGroundL")

    if (totResInTest.val().length > 0 && splitMinTest.val().length > 0 &&
        splitFinTest.val().length > 0 && canHvInTest.val().length > 0 &&
        canLvInTest.val().length > 0 && canGroundHTest.val().length > 0 &&
        canGroundLTest.val().length) {
        $("input[type=submit]").removeAttr("disabled");
        $('#submit').attr('class', 'btn btn-info btn-sm ml-2');
    } else {
        $("input[type=submit]").attr("disabled", "disabled");
        $('#submit').attr('class', 'btn btn-secondary btn-sm ml-2');
    }

});

// measurement comparison upon submit
$("#submit").on('click', function() {

    $("#submit").attr('style', 'display: none;');
    $("#inputForm :input").prop("disabled", true);
    $("#reload").attr("style", "display:block;");

    // user input values
    var totResIn = $('#totResIn').val().trim();
    var splitMin = $('#splitMin').val().trim();
    var splitFin = $('#splitFin').val().trim();
    var canHvIn = $('#canHvIn').val().trim();
    var canLvIn = $('#canLvIn').val().trim();
    var canGroundInH = $('#canGroundH').val().trim();
    var canGroundInL = $('#canGroundL').val().trim();

    // inputted value correction
    totResCorrected = Number(totResIn).toFixed(1);
    splitMinCorrected = parseInt(splitMin).toFixed(2);
    splitFinCorrected = parseInt(splitFin).toFixed(2);
    canHvInCorrected = Number(canHvIn).toFixed(2);
    canLvInCorrected = Number(canLvIn).toFixed(2);
    canGroundCorrectedH = Number(canGroundInH).toFixed(2);
    canGroundCorrectedL = Number(canGroundInL).toFixed(2);

    // debugging
    // console.log("total res in: " + totResIn +
    //     " splitM in: " + splitMin +
    //     " splitF in: " + splitFin +
    //     " can v H:  " + canHvIn +
    //     " can v L:  " + canLvIn);

    // hide model display to show results upon
    // submit button press
    var imageHide = $("#modelImg");
    imageHide.attr('style', 'display:none;');
    $("#modelImg").append(imageHide);

    // Parallel Resistance Calculator
    var resMult = splitMinCorrected * splitFinCorrected;
    var resAdd = parseInt(splitMinCorrected) + parseInt(splitFinCorrected);
    var result = (resMult / resAdd).toFixed(2)

    // difference range between calculated 
    // total resistance and user inputed
    var goNoGo = 1;
    var goNoGoRangeMin = -1;
    var goNoGoRangeMax = 1;

    //debugging
    // console.log('Inputed: ' + totResCorrected);
    // console.log('Calculation: ' + result);

    // differential calculation
    var calcDiff = totResCorrected - result;

    //debugging
    // console.log('value: ' + calcDiff);

    //
    // data comparison

    // total resistance validation
    if (calcDiff < goNoGo) {
        $('#totResIn').attr('style', 'color:red; font-style: italic;');
        totResClass = "bad";
        totResAnswer = "Recheck Value Inputed";
        $('#splitMin').attr('style', 'color:red; font-style: italic;');
        splitMclass = "bad";
        splitMAnswer = "Recheck Value Inputed";
        $('#splitFin').attr('style', 'color:red; font-style: italic;');
        splitFclass = "bad";
        splitFAnswer = "Recheck Value Inputed";
        // console.log('less');

    }
    if (calcDiff > goNoGo) {
        $('#totResIn').attr('style', 'color:red; font-style: italic;');
        totResClass = "bad";
        totResAnswer = "Recheck Value Inputed / High Ω at " + testLoc;
        $('#splitMin').attr('style', 'color:red; font-style: italic;');
        splitMclass = "bad";
        splitMAnswer = "Recheck Value Inputed"; // High Ω at " + testLoc;
        $('#splitFin').attr('style', 'color:red; font-style: italic;');
        splitFclass = "bad";
        splitFAnswer = "Recheck Value Inputed"; // High Ω at " + testLoc;
        // console.log('more');

    }
    if (calcDiff >= goNoGoRangeMin && calcDiff <= goNoGoRangeMax) {

        if (totResCorrected < totalCanRangeMin) {
            totResClass = "bad";
            totResAnswer = "Check For Short Between CAN High / Low";
        }
        if (totResCorrected > totalCanRangeMax) {
            // totResAnswer = "Value is more"
            $('#totResIn').attr('style', 'color:red; font-style: italic;');
            totResClass = "bad";
            totResAnswer = "Tested value is high, inspect split";
            // console.log("value is more");
        }
        if (totResCorrected >= totalCanRangeMin && totResCorrected <= totalCanRangeMax) {
            $('#totResIn').attr('style', 'none');
            totResClass = "good";
            totResAnswer = "Good Value";
            // console.log("good value");
            // alert("Good Value")
        }

        if (splitMinCorrected < splitCanRangeMin) {
            $('#splitMin').attr('style', 'color:red; font-style: italic;');
            splitMclass = "bad";
            splitMAnswer = "Check For Short Between CAN High / Low";
            // console.log("value is less");
        }
        if (splitMinCorrected > splitCanRangeMax) {
            // splitMAnswer = "Value is more"
            $('#splitMin').attr('style', 'color:red; font-style: italic;');
            splitMclass = "bad";
            splitMAnswer = "High Resistance between " + testLoc + " and " + trMale;
            // console.log("value is more");
        }
        if (splitMinCorrected >= splitCanRangeMin && splitMinCorrected <= splitCanRangeMax) {
            $('#splitMin').attr('style', 'none');
            splitMclass = "good";
            splitMAnswer = "Good Value";
            // console.log("good value");
            // alert("Good Value")
        }
        if (splitFinCorrected < splitCanRangeMin) {
            $('#splitFin').attr('style', 'color:red; font-style: italic;');
            splitFclass = "bad";
            splitFAnswer = "Check For Short Between CAN High / Low";
            // console.log("value is less");
        }
        if (splitFinCorrected > splitCanRangeMax) {
            // splitFAnswer = "Value is more"
            $('#splitFin').attr('style', 'color:red; font-style: italic;');
            splitFclass = "bad";
            splitFAnswer = "High Resistance between " + testLoc + " and " + trFemale;
            // console.log("value is more");
        }
        if (splitFinCorrected >= splitCanRangeMin && splitFinCorrected <= splitCanRangeMax) {
            $('#splitFin').attr('style', 'none');
            splitFclass = "good";
            splitFAnswer = "Good Value";
            // console.log("good value");
            // alert("Good Value")
        }
    }

    if (canHvInCorrected < canVoltHighRangeMin) {
        $('#canHvIn').attr('style', 'color:red; font-style: italic;');
        canHighClass = "bad";
        canHighAnswer = "Check for Short To Ground High";
        // console.log("value is less");
    }
    if (canHvInCorrected > canVoltHighRangeMax) {
        $('#canHvIn').attr('style', 'color:red; font-style: italic;');
        canHighClass = "bad";
        canHighAnswer = "Check for Short To Ground Low";
        // console.log("value is more");
    }
    if (canHvInCorrected >= canVoltHighRangeMin && canHvInCorrected <= canVoltHighRangeMax) {
        canHighClass = "good";
        canHighAnswer = "Good Value";
        // console.log("good value");
        // alert("Good Value")
    }
    if (canLvInCorrected < canVoltLowRangeMin) {
        $('#canLvIn').attr('style', 'color:red; font-style: italic;');
        canLowClass = "bad";
        canLowAnswer = "Check for Short To Ground Low";
        // console.log("value is less");
    }
    if (canLvInCorrected > canVoltLowRangeMax) {
        $('#canLvIn').attr('style', 'color:red; font-style: italic;');
        canLowClass = "bad";
        canLowAnswer = "Check for Short To Ground High";
        // console.log("value is more");
    }
    if (canLvInCorrected >= canVoltLowRangeMin && canLvInCorrected <= canVoltLowRangeMax) {
        canLowClass = "good";
        canLowAnswer = "Good Value";
        // console.log("good value");
        // alert("Good Value")
    }

    if (canGroundCorrectedH < canGroundRange) {
        $('#canGround').attr('style', 'color:red; font-style: italic;');
        canGroundClassH = "bad";
        canGroundAnswerH = "Inspect for a short to Ground";
        // console.log("value is less");
    }
    if (canGroundCorrectedH >= canGroundRange) {
        canGroundClassH = "good";
        canGroundAnswerH = "Good Value";
        // console.log("value is more");
    }

    if (canGroundCorrectedL < canGroundRange) {
        $('#canGround').attr('style', 'color:red; font-style: italic;');
        canGroundClassL = "bad";
        canGroundAnswerL = "Inspect for a short to Ground";
        // console.log("value is less");
    }
    if (canGroundCorrectedL >= canGroundRange) {
        canGroundClassL = "good";
        canGroundAnswerL = "Good Value";
        // console.log("value is more");
    }

    //can shorted to gether checks
    if (canLvInCorrected >= canVoltShortMin && canLvInCorrected <= canVoltShortMax &&
        canHvInCorrected >= canVoltShortMin && canHvInCorrected <= canVoltShortMax &&
        totResCorrected < totalCanRangeMin) {
        canHighClass = "bad";
        canLowClass = "bad";
        canHighAnswer = "CAN High / Low Short Together";
        canLowAnswer = "CAN High / Low Short Together";
    }

    if (canLvInCorrected === canHvInCorrected) {
        totResClass = "bad";
        splitMclass = "bad";
        splitFclass = "bad";
        canHighClass = "bad";
        canLowClass = "bad";
        totResAnswer = "Recheck Value Inputed";
        splitFAnswer = "Recheck Value Inputed";
        splitMAnswer = "Recheck Value Inputed";
        canHighAnswer = "CAN High / Low Short Together";
        canLowAnswer = "CAN High / Low Short Together";
    }


    if (canLvInCorrected >= canVoltGroundMin && canLvInCorrected <= canVoltGroundMax &&
        canHvInCorrected >= canVoltGroundMin && canHvInCorrected <= canVoltGroundMax &&
        canGroundCorrectedH < canGroundRange && canGroundCorrectedL < canGroundRange) {
        canHighClass = "bad";
        canLowClass = "bad";
        canGroundClassH = "bad"
        canGroundClassL = "bad"
        canHighAnswer = "CAN Short Together / Short To Ground";
        canLowAnswer = "CAN Short Together / Short To Ground";
        canGroundAnswerH = "Inspect for a short to Ground";
        canGroundAnswerL = "Inspect for a short to Ground";
    }

    //results shown
    var heading = $('<h1>').html('Results <hr>');
    heading.attr('class', 'mb-4');
    var dataInput = $("<p>").html("Total Resistance: <span class=" + totResClass + ">" + totResAnswer + "</span");
    var dataInput2 = $("<p>").html("Split Resistance (M): <span class=" + splitMclass + ">" + splitMAnswer + "</span>");
    var dataInput3 = $("<p>").html("Split Resistance (F):  <span class=" + splitFclass + ">" + splitFAnswer + "</span>");
    var dataInput4 = $("<p>").html("CAN High Voltage:  <span class=" + canHighClass + ">" + canHighAnswer + "</span>");
    var dataInput5 = $("<p>").html("CAN Low Voltage: <span class=" + canLowClass + ">" + canLowAnswer + "</span>");
    var dataInput6 = $("<p>").html("CAN (H) Resistance to Ground: <span class=" + canGroundClassH + ">" + canGroundAnswerH + "</span>");
    var dataInput7 = $("<p>").html("CAN (L) Resistance to Ground: <span class=" + canGroundClassL + ">" + canGroundAnswerL + "</span>");
    var dataInput8 = $("<p>").html("CAN Total Resistance Calculated from Split Inputs: <span class='calcOutput'>" + result + "</span>");

    $("#testSwap").append(heading, dataInput, dataInput2, dataInput3, dataInput4, dataInput5, dataInput6, dataInput7, dataInput8);

    // alert("Total Resistance: " + totResAnswer + "\n" +
    //     "Split Resistance (Male): " + splitMAnswer + "\n" +
    //     "Split Resistance (Female): " + splitFAnswer + "\n" +
    //     "CAN High Voltage: " + canHighAnswer + "\n" +
    //     "CAN Low Voltage: " + canLowAnswer + "\n" +
    //     "CAN Resistance to Ground: " + canGroundAnswer);
    // self.close();

});

//adding decimals to needed inputs
$("#canHvIn").blur(function() {
    this.value = ((parseInt(this.value) * .01).toFixed(2));
});
$("#canLvIn").blur(function() {
    this.value = ((parseInt(this.value) * .01).toFixed(2));
});
$("#totResIn").blur(function() {
    this.value = ((parseInt(this.value) * .10).toFixed(1));
});
$("#splitMin").blur(function() {
    this.value = ((parseInt(this.value) * .10).toFixed(1));
});
$("#splitFin").blur(function() {
    this.value = ((parseInt(this.value) * .10).toFixed(1));
});