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

//known good html push
$('#knownTot').attr('value', totRes);
$('#knownSplitM').attr('value', splitM);
$('#knownSplitF').attr('value', splitF);
$('#knownCanH').attr('value', canVh);
$('#knownCanL').attr('value', canVl);

// specification as an object
// var canSpecs = [

//     totalResRange = {
//         min: 58,
//         max: 62
//     },
//     splitResRange = {
//         min: 110,
//         max: 124
//     },
//     canVoltLowRange = {
//         min: 2.1,
//         max: 2.45
//     },
//     canVoltHighRange = {
//         min: 2.55,
//         max: 2.9
//     },
//     canShort = {
//         min: 2.0,
//         max: 3.0
//     },
//     canVoltGround = {
//         min: 0,
//         max: 1.0
//     },
//     canGround = {
//         min: 700
//     }
// ];

var buttonOn = false;

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

$(".knownVal").prop("disabled", true);

//limit number input decimal places to two
// $(':input[type="number"]').change(function() {
//     this.value = parseFloat(this.value).toFixed(2);
// });

// measurement comparison upon submit
$("#submit").on('click', function() {

    $("#results").attr('style', 'display: block;');
    $("#submit").attr('style', 'display: none;');
    $("#inputForm :input").prop("disabled", true);
    // $("#recheck").attr("style", "display:block;");
    $("#reload").attr("style", "display:block;");
    $(".knownVal").prop("disabled", true);

    if (buttonOn === true) {
        $("#recheck").attr("style", "display:none;");
        $("#reload").attr("style", "display:block;");
    }

    // user input values
    var totResIn = $('#totResIn').val().trim();
    var splitMin = $('#splitMin').val().trim();
    var splitFin = $('#splitFin').val().trim();
    var canHvIn = $('#canHvIn').val().trim();
    var canLvIn = $('#canLvIn').val().trim();
    var canGroundInH = $('#canGroundH').val().trim();
    var canGroundInL = $('#canGroundL').val().trim();

    // inputted value correction
    totResCorrected = Number(totResIn).toFixed(2);
    splitMinCorrected = parseInt(splitMin).toFixed(2);
    splitFinCorrected = parseInt(splitFin).toFixed(2);
    canHvInCorrected = Number(canHvIn).toFixed(2);
    canLvInCorrected = Number(canLvIn).toFixed(2);
    canGroundCorrectedH = Number(canGroundInH).toFixed(2);
    canGroundCorrectedL = Number(canGroundInL).toFixed(2);

    var voltDiff = canHvInCorrected - canLvInCorrected
    console.log(voltDiff);

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
    var goNoGoRangeMin = -5;
    var goNoGoRangeMax = 5;

    //debugging
    console.log('Inputed: ' + totResCorrected);
    console.log('Calculation: ' + result);

    // differential calculation
    var calcDiff = totResCorrected - result;

    //debugging
    console.log('value: ' + calcDiff);

    //
    // data comparison logic

    var test = calcDiff <= goNoGoRangeMin && totResCorrected > 30 || calcDiff >= goNoGoRangeMax && totResCorrected > 30;
    var test1 = totResCorrected > 30;
    var test123 = result === 'NaN';
    var test17 = calcDiff <= goNoGoRangeMin && totResCorrected > 30 && voltDiff >= .3 || calcDiff >= goNoGoRangeMax && totResCorrected > 30 && voltDiff >= .3;

    console.log('Calculated value a number: ' + test123);
    console.log('calcDiff validation: ' + test);
    console.log('totRes validation: ' + test1);
    console.log('voltDiff validation: ' + test17);


    // total resistance validation
    if (result === 'NaN') {
        NaNerror();
        console.log('calculated resulted in NaN');
        return false;
    } else {
        if (calcDiff <= goNoGoRangeMin && totResCorrected > 30 && totResCorrected <= 50 || calcDiff >= goNoGoRangeMax && totResCorrected > 30 && totResCorrected <= 50) {
            error();
            console.log('calculated difference too high');
            return false;
        } else {
            if (totResCorrected < 30 && voltDiff >= .3) {
                error();
                console.log('impossible input');
                return false;
            } else {
                if (calcDiff <= goNoGoRangeMin && totResCorrected > 30 && voltDiff >= .3 || calcDiff >= goNoGoRangeMax && totResCorrected > 30 && voltDiff >= .3) {
                    calDiffHigh();
                    console.log('impossible input');
                    return false;
                } else {
                    // if (calcDiff <= goNoGoRangeMin && totResCorrected < 30 && voltDiff <= 1 || calcDiff >= goNoGoRangeMax && totResCorrected < 30 && voltDiff <= .3) {
                    // if (calcDiff >= goNoGoRangeMin && calcDiff <= goNoGoRangeMax) {

                    console.log('this far?');

                    if (totResCorrected > totalCanRangeMax) {
                        // totResAnswer = "Value is more"
                        $('#totResIn').attr('style', 'color:red; font-style: italic;');
                        totResClass = "bad";
                        totResAnswer = "Tested value is high, inspect split";
                        console.log('high, inspect split');
                        recheckButton();
                        // console.log("value is more");
                    }
                    if (totResCorrected < totalCanRangeMin) {
                        totResClass = "bad";
                        totResAnswer = "Check For Short Between CAN High / Low";
                        // console.log('short between h / l');
                    }
                    if (totResCorrected > 100) {
                        $('#totResIn').attr('style', 'color:red; font-style: italic;');
                        totResClass = "bad";
                        totResAnswer = "Inspect Spilt for Open Terminating Resistor";
                        // console.log('split open');
                    }
                    if (totResCorrected < 100 && voltDiff <= .2) {
                        $('#totResIn').attr('style', 'color:red; font-style: italic;');
                        totResClass = "bad";
                        totResAnswer = "Possible CAN Short Together";
                    }
                    if (totResCorrected > 35 && voltDiff <= .2) {
                        $('#totResIn').attr('style', 'color:red; font-style: italic;');
                        totResClass = "bad";
                        totResAnswer = "Lower Value Expected";
                        recheckButton();
                    } else {

                        if (totResCorrected >= totalCanRangeMin && totResCorrected <= totalCanRangeMax) {
                            $('#totResIn').attr('style', 'none');
                            totResClass = "good";
                            totResAnswer = "Good Value";
                            // buttonOn = true;
                            // console.log("totRes Good");
                            // alert("Good Value")
                        }
                    }
                }
            }


            console.log('make it to here?');

            if (splitMinCorrected < splitCanRangeMin) {
                $('#splitMin').attr('style', 'color:red; font-style: italic;');
                splitMclass = "bad";
                splitMAnswer = "Check For Short Between CAN High / Low";
                // console.log("Split M short between h / l");
            }
            if (splitMinCorrected > splitCanRangeMax) {
                // splitMAnswer = "Value is more"
                $('#splitMin').attr('style', 'color:red; font-style: italic;');
                splitMclass = "bad";
                splitMAnswer = "High Resistance between " + testLoc + " and " + trMale;
                // console.log("split M High");
            }
            if (splitMinCorrected >= splitCanRangeMin && splitMinCorrected <= splitCanRangeMax) {
                $('#splitMin').attr('style', 'none');
                splitMclass = "good";
                splitMAnswer = "Good Value";
                // console.log("split M good");
                // alert("Good Value")
            }
            if (splitFinCorrected < splitCanRangeMin) {
                $('#splitFin').attr('style', 'color:red; font-style: italic;');
                splitFclass = "bad";
                splitFAnswer = "Check For Short Between CAN High / Low";
                // console.log("split F short h / l");
            }
            if (splitFinCorrected > splitCanRangeMax) {
                // splitFAnswer = "Value is more"
                $('#splitFin').attr('style', 'color:red; font-style: italic;');
                splitFclass = "bad";
                splitFAnswer = "High Resistance between " + testLoc + " and " + trFemale;
                // console.log("split F high");
            }
            if (splitFinCorrected >= splitCanRangeMin && splitFinCorrected <= splitCanRangeMax) {
                $('#splitFin').attr('style', 'none');
                splitFclass = "good";
                splitFAnswer = "Good Value";
                // console.log("split M good value");
                // alert("Good Value")
            } else {

                //} 

                if (calcDiff > goNoGo && totResCorrected < 100) {
                    // $('#totResIn').attr('style', 'color:red; font-style: italic;');
                    // totResClass = "bad";
                    // totResAnswer = "Varify Value Inputed / High Ω at " + testLoc;
                    // $('#splitMin').attr('style', 'color:red; font-style: italic;');
                    // splitMclass = "bad";
                    // splitMAnswer = "Varify Value Inputed"; // High Ω at " + testLoc;
                    // $('#splitFin').attr('style', 'color:red; font-style: italic;');
                    // splitFclass = "bad";
                    // splitFAnswer = "Varify Value Inputed"; // High Ω at " + testLoc;
                    splitError();
                    // buttonOn = true;
                    console.log('calDiff >');
                    // return false;
                    // console.log('more');
                }

                if (calcDiff < goNoGo && voltDiff > 1.0) {
                    // $('#totResIn').attr('style', 'color:red; font-style: italic;');
                    // totResClass = "bad";
                    // totResAnswer = "Recheck Value Inputed";
                    // $('#splitMin').attr('style', 'color:red; font-style: italic;');
                    // splitMclass = "bad";
                    // splitMAnswer = "Recheck Value Inputed";
                    // $('#splitFin').attr('style', 'color:red; font-style: italic;');
                    // splitFclass = "bad";
                    // splitFAnswer = "Recheck Value Inputed";
                    console.log('calcDiff less than goNoGo');
                    error();
                    // buttonOn = true;
                    // return false;
                    // console.log('less');

                }
                console.log('here????');
                console.log(totResClass);
            }

            // }
            // }
            console.log('tooooooo hereeeeee....2');

            if (canHvInCorrected < canVoltHighRangeMin) {
                $('#canHvIn').attr('style', 'color:red; font-style: italic;');
                canHighClass = "bad";
                canHighAnswer = "Check for Short To Ground High";
                // console.log("can H v low");
            }
            if (canHvInCorrected > canVoltHighRangeMax) {
                $('#canHvIn').attr('style', 'color:red; font-style: italic;');
                canHighClass = "bad";
                canHighAnswer = "Check for Short To Ground Low";
                // console.log("can H v high");
            }
            if (canHvInCorrected >= canVoltHighRangeMin && canHvInCorrected <= canVoltHighRangeMax) {
                canHighClass = "good";
                canHighAnswer = "Good Value";
                // console.log("can H good value");
                // alert("Good Value")
            }
            if (canLvInCorrected < canVoltLowRangeMin) {
                $('#canLvIn').attr('style', 'color:red; font-style: italic;');
                canLowClass = "bad";
                canLowAnswer = "Check for Short To Ground Low";
                // console.log("can L v low");
            }
            if (canLvInCorrected > canVoltLowRangeMax) {
                $('#canLvIn').attr('style', 'color:red; font-style: italic;');
                canLowClass = "bad";
                canLowAnswer = "Check for Short To Ground High";
                // console.log("can L low");
            }
            if (canLvInCorrected >= canVoltLowRangeMin && canLvInCorrected <= canVoltLowRangeMax) {
                canLowClass = "good";
                canLowAnswer = "Good Value";
                // console.log("can L good value");
                // alert("Good Value")
            }

            if (canGroundCorrectedH < canGroundRange) {
                $('#canGroundH').attr('style', 'color:red; font-style: italic;');
                canGroundClassH = "bad";
                canGroundAnswerH = "Inspect for a short to Ground";
                // console.log("can H short to ground");
            }
            if (canGroundCorrectedH >= canGroundRange) {
                canGroundClassH = "good";
                canGroundAnswerH = "Good Value";
                // console.log("can H good ground");
            }

            if (canGroundCorrectedL < canGroundRange) {
                $('#canGroundL').attr('style', 'color:red; font-style: italic;');
                canGroundClassL = "bad";
                canGroundAnswerL = "Inspect for a short to Ground";
                // console.log("can L short to ground");
            }
            if (canGroundCorrectedL >= canGroundRange) {
                canGroundClassL = "good";
                canGroundAnswerL = "Good Value";
                // console.log("can L good ground");
            }

            //can shorted to gether checks

            if (canHvInCorrected - .5 <= canLvInCorrected && canLvInCorrected <= canHvInCorrected + .5 &&
                totResCorrected < totalCanRangeMin) {
                $('#canHvIn').attr('style', 'color:red; font-style: italic;');
                $('#canLvIn').attr('style', 'color:red; font-style: italic;');
                canHighClass = "bad";
                canLowClass = "bad";
                canHighAnswer = "CAN High / Low Short Together";
                canLowAnswer = "CAN High / Low Short Together";
                recheckButton();
                // buttonOn = true;
                // console.log('can short together');

            }

            if (canLvInCorrected === canHvInCorrected &&
                totResCorrected > totalCanRangeMin) {
                error();
                // console.log('can shorted together resistance greater than min range');
                // buttonOn = true;
                return false;


            } else if (canLvInCorrected === canHvInCorrected &&
                totResCorrected < totalCanRangeMin) {
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
                // buttonOn = true;
                recheckButton();
                // console.log('can short together (equal values) totRes less than min');

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
                // buttonOn = true;
                recheckButton();
                // console.log('can short together within a range');

            }


            //statement validation
            var test2 = canHvInCorrected < canVoltHighRangeMin;
            var test3 = canHvInCorrected > canVoltHighRangeMax;
            var test4 = canHvInCorrected >= canVoltHighRangeMin && canHvInCorrected <= canVoltHighRangeMax;
            var test5 = canLvInCorrected < canVoltLowRangeMin;
            var test6 = canLvInCorrected > canVoltLowRangeMax;
            var test7 = canLvInCorrected >= canVoltLowRangeMin && canLvInCorrected <= canVoltLowRangeMax;
            var test8 = canGroundCorrectedH < canGroundRange;
            var test9 = canGroundCorrectedH >= canGroundRange;
            var test10 = canGroundCorrectedL < canGroundRange;
            var test11 = canGroundCorrectedL >= canGroundRange;
            var test12 = canHvInCorrected - .5 <= canLvInCorrected && canLvInCorrected <= canHvInCorrected + .5 && totResCorrected < totalCanRangeMin;;
            var test13 = canLvInCorrected === canHvInCorrected && totResCorrected > totalCanRangeMin;
            var test14 = canLvInCorrected === canHvInCorrected && totResCorrected < totalCanRangeMin;
            var test15 = canLvInCorrected >= canVoltGroundMin && canLvInCorrected <= canVoltGroundMax &&
                canHvInCorrected >= canVoltGroundMin && canHvInCorrected <= canVoltGroundMax &&
                canGroundCorrectedH < canGroundRange && canGroundCorrectedL < canGroundRange

            console.log('CAN H V low: ' + test2);
            console.log('CAN H V high: ' + test3);
            console.log('CAN High Good: ' + test4);
            console.log('CAN L V low: ' + test5);
            console.log('CAN L V high: ' + test6);
            console.log('CAN Low Good: ' + test7);
            console.log('CAN High Short to Ground: ' + test8);
            console.log('CAN High No Short: ' + test9);
            console.log('CAN Low Short to Ground: ' + test10);
            console.log('CAN Low No Short: ' + test11);
            console.log('Can Short together: ' + test12);
            console.log('Can Short together totRes Greater Than Min Range: ' + test13);
            console.log('CAN Short together (equal values) totRes less than min: ' + test14);
            console.log('CAN Short together Within a Range: ' + test15);

            function splitError() {
                console.log('did this function run');
                $('#totResIn').attr('style', 'color:red; font-style: italic;');
                totResClass = "bad";
                totResAnswer = "Varify Value Inputed / High Ω at " + testLoc;
                $('#splitMin').attr('style', 'color:red; font-style: italic;');
                splitMclass = "bad";
                splitMAnswer = "Varify Value Inputed"; // High Ω at " + testLoc;
                $('#splitFin').attr('style', 'color:red; font-style: italic;');
                splitFclass = "bad";
                splitFAnswer = "Varify Value Inputed"; // High Ω at " + testLoc;
                return false;
            }



            //results shown
            var heading = $('<h1>')
            heading.html('Results <hr>');
            heading.attr('class', 'mb-2');
            var dataInput = $("<p>").html("Total Resistance: <span class=" + totResClass + ">" + totResAnswer + "</span");
            var dataInput2 = $("<p>").html("Split Resistance (M): <span class=" + splitMclass + ">" + splitMAnswer + "</span>");
            var dataInput3 = $("<p>").html("Split Resistance (F):  <span class=" + splitFclass + ">" + splitFAnswer + "</span>");
            var dataInput4 = $("<p>").html("CAN High Voltage:  <span class=" + canHighClass + ">" + canHighAnswer + "</span>");
            var dataInput5 = $("<p>").html("CAN Low Voltage: <span class=" + canLowClass + ">" + canLowAnswer + "</span>");
            var dataInput6 = $("<p>").html("CAN (H) Resistance to Ground: <span class=" + canGroundClassH + ">" + canGroundAnswerH + "</span>");
            var dataInput7 = $("<p>").html("CAN (L) Resistance to Ground: <span class=" + canGroundClassL + ">" + canGroundAnswerL + "</span>");
            var dataInput8 = $("<p>").html("CAN Total Resistance Calculated from Split Inputs: <span class='calcOutput'>" + result + "</span>");

            $("#results").append(heading, dataInput, dataInput2, dataInput3, dataInput4, dataInput5, dataInput6, dataInput7, dataInput8);

            // alert("Total Resistance: " + totResAnswer + "\n" +
            //     "Split Resistance (Male): " + splitMAnswer + "\n" +
            //     "Split Resistance (Female): " + splitFAnswer + "\n" +
            //     "CAN High Voltage: " + canHighAnswer + "\n" +
            //     "CAN Low Voltage: " + canLowAnswer + "\n" +
            //     "CAN Resistance to Ground: " + canGroundAnswer);
            // self.close();
        }
    }

    function NaNerror() {
        // $("#testSwap").empty();
        $("#inputForm :input").prop("disabled", true);
        var heading = $('<h1>');
        heading.html('Results <hr>');
        // heading.attr('class', 'mb-4');
        var error = $("<h3>");
        error.attr('style', 'color:red; font-style: italic;');
        error.html('Error Within Inputs<br>a Value is Not a Number<hr>');
        var space = $('<p>');
        var value = $("<h3>");
        value.attr('style', 'color:red; font-style: italic;');
        value.html('Press Correct Inputs<br>To Enter Correct Values');
        $("#results").append(heading, error, space, value);
        $("#inputForm :input").attr('style', 'color:red; font-style: italic;');
        recheckButton();
        return false;
    }

    function error() {
        // $("#testSwap").empty();
        $("#inputForm :input").prop("disabled", true);
        var heading = $('<h1>');
        heading.html('Results <hr>');
        // heading.attr('class', 'mb-4');
        var error = $("<h3>");
        error.attr('style', 'color:red; font-style: italic;');
        error.html('Error in Input<br>Inputed Total Resistance Invalid<hr>');
        var space = $('<p>');
        var value = $("<h3>");
        value.attr('style', 'color:red; font-style: italic;');
        value.html('Press Correct Inputs');
        $("#results").append(heading, error, space, value);
        $("#inputForm :input").attr('style', 'color:red; font-style: italic;');
        recheckButton();
        return false;
    }

    function calDiffHigh() {
        // $("#testSwap").empty();
        $("#inputForm :input").prop("disabled", true);
        var heading = $('<h1>');
        heading.html('Results <hr>');
        // heading.attr('class', 'mb-4');
        var error = $("<h3>");
        error.attr('style', 'color:red; font-style: italic;');
        error.html('Inputed Total Resistance <br> Greater Than Calculated<hr>');
        var value = $("<p>");
        value.html("User Inputed Total Resistance: <span style='font-weight: bolder; color: red;'>" + totResCorrected + "</span>");
        var value2 = $("<p>");
        value2.html("Calculated Total Resistance: <span style='font-weight: bolder; color: green;'>" + result + "</span>");
        var value3 = $("<p style='font-style:italic;'>");
        value3.text("***Possible issue with split (test location) connector***");
        var value4 = $("<h3>");
        value4.attr('style', 'color:red; font-style: italic;');
        value4.html('<hr>Press Correct Inputs');
        $("#results").append(heading, error, value, value2, value3, value4);
        $("#inputForm :input").attr('style', 'color:red; font-style: italic;');
        recheckButton();
        return false;
    }
    console.log('button state: ' + buttonOn);

    function recheckButton() {
        // if (buttonOn === true) {
        $("#recheck").attr("style", "display:block;");
        $("#reload").attr("style", "display:none;");
        // }

        $("#recheck").on('click', function() {
            $("#results").empty();
            $("#inputForm :input").prop("disabled", false);
            $(".knownVal").prop("disabled", true);
            $("#recheck").attr("style", "display: none;");
            $("#reload").attr("style", "display: none;");
            $('#results').attr('style', 'display: none;')
            $("#inputForm :input").attr('style', 'none');
            $("#submit").attr('style', 'display: block;');
            var imageShow = $("#modelImg");
            imageShow.attr('style', 'display:block; width: 100%; border-radius: 5px;');
            $("#modelImg").append(imageShow);
            buttonOn = true;
        });
    }
});

//adding decimals to needed inputs
// $("#canHvIn").blur(function() {
//     this.value = ((parseInt(this.value) * .01).toFixed(2));
// });
// $("#canLvIn").blur(function() {
//     this.value = ((parseInt(this.value) * .01).toFixed(2));
// });
// $("#totResIn").blur(function() {
//     this.value = ((parseInt(this.value) * .10).toFixed(1));
// });
// $("#splitMin").blur(function() {
//     this.value = ((parseInt(this.value) * .10).toFixed(1));
// });
// $("#splitFin").blur(function() {
//     this.value = ((parseInt(this.value) * .10).toFixed(1));
// });