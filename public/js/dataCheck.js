$(document).ready(function() {

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

    // model image load
    var modelShow = $("#modelImg");
    modelShow.attr('src', modelImg);
    modelShow.attr('alt', 'modelImg.jpg');
    $("#modelImg").append(modelShow);

    // selected model html push
    $("#model").text(model);
    knownData();

    // recheck button
    var buttonOn = false;

    // specification range variables
    var totalCanRangeMin = 58;
    var totalCanRangeMax = 62;
    var minRes = 30;
    var maxRes = 55;
    var splitCanRangeMin = 110;
    var splitCanRangeMax = 124;
    var canVoltLowRangeMin = 2.1;
    var canVoltLowRangeMax = 2.45;
    var canVoltHighRangeMin = 2.55;
    var canVoltHighRangeMax = 2.9;
    var minVoltDiff = .4;
    var canVoltShortMin = 2.0;
    var canVoltShortMax = 3.0;
    var canVoltGroundMin = 0;
    var canVoltGroundMax = 1.0;
    var canGroundRange = 700;


    // input box manipulations

    // clear input box when on focus
    $("input:text").focus(function() { $(this).val("") });

    //disable sumbit button until all user input fields are filled
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

    // disable known value input field (for display only)
    $(".knownVal").prop("disabled", true);


    //known good values html push upon page open from selected vehicle
    function knownData() {
        $('#knownTot').attr('value', totRes);
        $('#knownSplitM').attr('value', splitM);
        $('#knownSplitF').attr('value', splitF);
        $('#knownCanH').attr('value', canVh);
        $('#knownCanL').attr('value', canVl);
        $('#knownGroundH').attr('value', '>700');
        $('#knownGroundL').attr('value', '>700');
    }

    // measurement comparison upon submit
    $("#submit").on('click', function() {


        // calculator resets
        $("#results").attr('style', 'display: block;');
        $("#submit").attr('style', 'display: none;');
        $("#inputForm :input").prop("disabled", true);
        // $("#recheck").attr("style", "display:block;");
        $("#reload").attr("style", "display:block;");
        $(".knownVal").prop("disabled", true);

        // show recheck button / hide reload
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

        // test for faults found during logic / value checks
        var totalTest = totResIn > totalCanRangeMax || totResIn < totalCanRangeMin;
        var splitMtest = splitMin > splitCanRangeMax || splitMin < splitCanRangeMin;
        var splitFtest = splitFin > splitCanRangeMax || splitFin < splitCanRangeMin;
        var canHtest = canHvIn > canVoltHighRangeMax || canHvIn < canVoltHighRangeMin;
        var canLtest = canLvIn > canVoltLowRangeMax || canLvIn < canVoltLowRangeMin;
        var groundHtest = canGroundInH < canGroundRange;
        var groundLtest = canGroundInL < canGroundRange;

        // calculated difference between selected vehicle known good values and inputed
        var totResInDiff = totResIn - totRes;
        var splitMInDiff = splitMin - splitM;
        var splitFInDiff = splitFin - splitF;
        var canHvInDiff = canHvIn - canVh;
        var canLvInDiff = canLvIn - canVl;
        var groundInDiffH = canGroundInH - canGroundRange;
        var groundInDiffL = canGroundInL - canGroundRange;

        // debugging
        // console.log('total res test: ' + totalTest);
        // console.log('split m diff: ' + splitMtest);
        // console.log('split f diff: ' + splitFtest);
        // console.log('can h diff: ' + canHtest);
        // console.log('can l diff: ' + canLtest);
        // console.log('ground h: ' + groundHtest);
        // console.log('ground l: ' + groundLtest);

        // console.log('total res diff: ' + totResInDiff);
        // console.log('split m diff: ' + splitMInDiff);
        // console.log('split f diff: ' + splitFInDiff);
        // console.log('can h diff: ' + canHvInDiff);
        // console.log('can l diff: ' + canLvInDiff);
        // console.log('ground h: ' + groundInDiffH);
        // console.log('ground l: ' + groundInDiffL);

        // value differential html push
        $('#knownTot').attr('value', totResInDiff.toFixed(1));
        $('#knownSplitM').attr('value', splitMInDiff.toFixed(1));
        $('#knownSplitF').attr('value', splitFInDiff.toFixed(1));
        $('#knownCanH').attr('value', canHvInDiff.toFixed(2));
        $('#knownCanL').attr('value', canLvInDiff.toFixed(2));
        $('#knownGroundH').attr('value', groundInDiffH);
        $('#knownGroundL').attr('value', groundInDiffL);

        // differential value color change logic
        if (totalTest === true) {
            $('#knownTot').attr('style', 'color: red; font-weight: bolder; font-style: italic;');
        } else {
            $('#knownTot').attr('style', 'color: green; font-weight: bolder; font-style: italic;');
        }
        if (splitMtest === true) {
            $('#knownSplitM').attr('style', 'color: red; font-weight: bolder; font-style: italic;');
        } else {
            $('#knownSplitM').attr('style', 'color: green; font-weight: bolder; font-style: italic;');
        }
        if (splitFtest === true) {
            $('#knownSplitF').attr('style', 'color: red; font-weight: bolder; font-style: italic;');
        } else {
            $('#knownSplitF').attr('style', 'color: green; font-weight: bolder; font-style: italic;');
        }
        if (canHtest === true) {
            $('#knownCanH').attr('style', 'color: red; font-weight: bolder; font-style: italic;');
        } else {
            $('#knownCanH').attr('style', 'color: green; font-weight: bolder; font-style: italic;');
        }
        if (canLtest === true) {
            $('#knownCanL').attr('style', 'color: red; font-weight: bolder; font-style: italic;');
        } else {
            $('#knownCanL').attr('style', 'color: green; font-weight: bolder; font-style: italic;');
        }
        if (groundHtest === true) {
            $('#knownGroundH').attr('style', 'color: red; font-weight: bolder; font-style: italic;');
        } else {
            $('#knownGroundH').attr('style', 'color: green; font-weight: bolder; font-style: italic;');
        }
        if (groundLtest === true) {
            $('#knownGroundL').attr('style', 'color: red; font-weight: bolder; font-style: italic;');
        } else {
            $('#knownGroundL').attr('style', 'color: green; font-weight: bolder; font-style: italic;');
        }

        // inputted value correction
        totResCorrected = Number(totResIn).toFixed(2);
        splitMinCorrected = parseInt(splitMin).toFixed(2);
        splitFinCorrected = parseInt(splitFin).toFixed(2);
        canHvInCorrected = Number(canHvIn).toFixed(2);
        canLvInCorrected = Number(canLvIn).toFixed(2);
        canGroundCorrectedH = Number(canGroundInH).toFixed(2);
        canGroundCorrectedL = Number(canGroundInL).toFixed(2);

        // measure difference if input CAN voltages
        var voltDiff = canHvInCorrected - canLvInCorrected;
        // console.log(voltDiff);

        var groundDiff = parseInt(canGroundCorrectedH) + parseInt(canGroundCorrectedL);


        // debugging
        // console.log("total res in: " + totResIn +
        //     " splitM in: " + splitMin +
        //     " splitF in: " + splitFin +
        //     " can v H:  " + canHvIn +
        //     " can v L:  " + canLvIn);

        // hide model display image to allow
        // results to be seen when submit button pressed
        var imageHide = $("#modelImg");
        imageHide.attr('style', 'display:none;');
        $("#modelImg").append(imageHide);

        // parallel resistance calculator (based on inputs)
        var resMult = splitMinCorrected * splitFinCorrected;
        var resAdd = parseInt(splitMinCorrected) + parseInt(splitFinCorrected);
        var result = (resMult / resAdd).toFixed(2)

        // difference range between calculated 
        // total resistance and user inputed
        // var goNoGo = 1;
        var goNoGoRangeMin = -2;
        var goNoGoRangeMax = 2;

        // differential calculation
        var calcDiff = totResCorrected - result;

        //debugging
        // console.log('Total Res Inputed: ' + totResCorrected);
        // console.log('Split Calculation: ' + result);
        // console.log('Total Res Calculated Diff: ' + calcDiff.toFixed(2));
        // console.log('can H: ' + canHvInCorrected);
        // console.log('can L: ' + canLvInCorrected);
        // console.log('voltDiff: ' + voltDiff);
        // console.log("Ground: " + groundDiff);
        // console.log('volt diff: ' + voltDiff);


        //
        // data comparison logic

        // total resistance validation
        if (result === 'NaN') {
            NaNerror();
            console.log('calculated resulted in NaN');
            return false;
        } else {
            if (totResCorrected >= minRes && totResCorrected <= maxRes && groundDiff < 1400) {
                errorMsg = 'Total Resistance not plausible with ground values inputted by user, lower Ω expected'
                error(errorMsg);
                console.log('impossible ground');
                return false;
            } else {
                if (totResCorrected > minRes && voltDiff <= minVoltDiff && voltDiff >= 0 || totResCorrected >= minRes && totResCorrected <= maxRes && voltDiff <= minVoltDiff) {
                    errorMsg = 'Total Resistance not plausible with user inputted CAN Voltages, lower Ω expected'
                    error(errorMsg);
                    console.log('impossible input');
                    return false;
                } else {
                    if (calcDiff <= goNoGoRangeMin && totResCorrected > minRes && totResCorrected <= maxRes || calcDiff >= goNoGoRangeMax && totResCorrected < minRes && totResCorrected <= maxRes) {
                        errorMsg = 'Total Resistance not plausible with user Ground input, higher resistance expected (calculated from split input: ' + result + 'Ω)'
                        error(errorMsg);
                        console.log('total resistance not possible');
                        return false;
                    } else {
                        if (totResCorrected < minRes && voltDiff >= minVoltDiff && canHvInCorrected >= canVoltHighRangeMax || totResCorrected < minRes && voltDiff <= minVoltDiff && canLvInCorrected >= canVoltLowRangeMax) {
                            errorMsg = 'Total Resistance not plausible with user inputted CAN voltages, voltages are too high';
                            error(errorMsg);
                            console.log('impossible input2');
                            return false;
                        } else {
                            if (calcDiff <= goNoGoRangeMin && totResCorrected > minRes && voltDiff >= minVoltDiff || calcDiff >= goNoGoRangeMax && totResCorrected > minRes && voltDiff >= minVoltDiff) {
                                calDiffHigh();
                                console.log('calculated diff high');
                                return false;
                            } else {

                                //can resistance logic
                                if (totResCorrected > totalCanRangeMax) {
                                    // totResAnswer = "Value is more"
                                    $('#totResIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                                    totResClass = "bad";
                                    totResAnswer = "Tested value is high, inspect split";
                                    // console.log('high, inspect split');
                                    recheckButton();
                                    // console.log("value is more");
                                }
                                if (totResCorrected < totalCanRangeMin) {
                                    totResClass = "bad";
                                    totResAnswer = "Check For Short Between CAN High / Low";
                                    // console.log('short between h / l');
                                }
                                if (totResCorrected > 100) {
                                    $('#totResIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                                    totResClass = "bad";
                                    totResAnswer = "Inspect Spilt for Open Terminating Resistor";
                                    // console.log('split open');
                                }
                                if (totResCorrected < 100 && voltDiff <= .2) {
                                    $('#totResIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                                    totResClass = "bad";
                                    totResAnswer = "Possible CAN Short Together";
                                }
                                if (totResCorrected > 35 && voltDiff <= .2 && voltDiff >= 0) {
                                    $('#totResIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                                    totResClass = "bad";
                                    totResAnswer = "Lower Value Expected";
                                    recheckButton();
                                } else {

                                    if (totResCorrected >= totalCanRangeMin && totResCorrected <= totalCanRangeMax) {
                                        $('#totResIn').attr('style', 'none');
                                        totResClass = "good";
                                        totResAnswer = "Good Value";
                                        // console.log("totRes Good");
                                    }
                                }
                            }
                        }
                    }
                }
                if (splitMinCorrected < splitCanRangeMin) {
                    $('#splitMin').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    splitMclass = "bad";
                    splitMAnswer = "Check For Short Between CAN (H / L)<br>&nbsp;or to Ground between " + testLoc + " and " + trMale;
                    // console.log("Split M short between h / l");
                }
                if (splitMinCorrected > splitCanRangeMax) {
                    // splitMAnswer = "Value is more"
                    $('#splitMin').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    splitMclass = "bad";
                    splitMAnswer = "High Resistance between " + testLoc + " and " + trMale;
                    // console.log("split M High");
                } else {
                    if (splitMinCorrected >= splitCanRangeMin && splitMinCorrected <= splitCanRangeMax) {
                        $('#splitMin').attr('style', 'none');
                        splitMclass = "good";
                        splitMAnswer = "Good Value";
                        // console.log("split M good");
                        // alert("Good Value")
                    }
                }
                if (splitFinCorrected < splitCanRangeMin) {
                    $('#splitFin').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    splitFclass = "bad";
                    splitFAnswer = "Check For Short Between CAN (H / L) or<br>to Ground between " + testLoc + " and " + trFemale + " (circuit or module fault)";
                    // console.log("split F short h / l");
                }
                if (splitFinCorrected > splitCanRangeMax) {
                    // splitFAnswer = "Value is more"
                    $('#splitFin').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    splitFclass = "bad";
                    splitFAnswer = "High Resistance between " + testLoc + " and " + trFemale;
                    // console.log("split F high");
                } else {
                    if (splitFinCorrected >= splitCanRangeMin && splitFinCorrected <= splitCanRangeMax) {
                        $('#splitFin').attr('style', 'none');
                        splitFclass = "good";
                        splitFAnswer = "Good Value";
                        // console.log("split M good value");
                        // alert("Good Value")
                    }
                }



                // can voltage check logic
                if (canHvInCorrected <= canVoltHighRangeMin && canGroundCorrectedH <= 10) {
                    $('#canHvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canHighClass = "bad";
                    canHighAnswer = "Check for Short To Ground CAN High";
                    // console.log("can H v low");
                }
                if (canLvInCorrected <= canVoltLowRangeMin && canGroundCorrectedL > 10) {
                    $('#canLvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canLowClass = "bad";
                    canLowAnswer = "Check for Short To Ground CAN High";
                }
                if (canHvInCorrected >= canVoltHighRangeMax && canGroundCorrectedL >= 10) {
                    $('#canHvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canHighClass = "bad";
                    canHighAnswer = "Check for Short To Ground CAN Low";
                    // console.log("can H v high");
                } else {
                    if (canHvInCorrected >= canVoltHighRangeMin && canHvInCorrected <= canVoltHighRangeMax) {
                        $('#canHvIn').attr('style', 'none');
                        canHighClass = "good";
                        canHighAnswer = "Good Value";
                        // console.log("can H good value");
                        // alert("Good Value")
                    }
                }

                if (canLvInCorrected <= canVoltLowRangeMin && canGroundCorrectedL <= 10) {
                    $('#canLvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canLowClass = "bad";
                    canLowAnswer = "Check for Short To Ground CAN Low";
                    // console.log("can L v low");
                }
                if (canHvInCorrected <= canVoltHighRangeMin && canGroundCorrectedH > 10) {
                    $('#canHvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canHighClass = "bad";
                    canHighAnswer = "Check for Short To Ground CAN Low";
                    // console.log("can L v low");
                }
                if (canLvInCorrected >= canVoltLowRangeMax && canGroundCorrectedH >= 10) {
                    $('#canLvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canLowClass = "bad";
                    canLowAnswer = "Check for Short To Ground CAN High";
                    // console.log("can L low");
                } else {
                    if (canLvInCorrected >= canVoltLowRangeMin && canLvInCorrected <= canVoltLowRangeMax) {
                        $('#canLvIn').attr('style', 'none');
                        canLowClass = "good";
                        canLowAnswer = "Good Value";
                        // console.log("can L good value");
                    }
                }


                if (canGroundCorrectedH < canGroundRange) {
                    $('#canGroundH').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canGroundClassH = "bad";
                    canGroundAnswerH = "Inspect for a short to Ground";
                    // console.log("can H short to ground");
                } else {
                    if (canGroundCorrectedH >= canGroundRange) {
                        $('#canGroundH').attr('style', 'none');
                        canGroundClassH = "good";
                        canGroundAnswerH = "Good Value";
                        // console.log("can H good ground");
                    }
                }


                if (canGroundCorrectedL < canGroundRange) {
                    $('#canGroundL').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canGroundClassL = "bad";
                    canGroundAnswerL = "Inspect for a short to Ground";
                    // console.log("can L short to ground");
                } else {
                    if (canGroundCorrectedL >= canGroundRange) {
                        $('#canGroundL').attr('style', 'none');
                        canGroundClassL = "good";
                        canGroundAnswerL = "Good Value";
                        // console.log("can L good ground");
                    }
                }

                // can circuit shorted together logic
                if (canHvInCorrected - .5 <= canLvInCorrected && canLvInCorrected <= canHvInCorrected + .5 &&
                    totResCorrected < totalCanRangeMin) {
                    $('#canHvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    $('#canLvIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    canHighClass = "bad";
                    canLowClass = "bad";
                    canHighAnswer = "CAN High / Low Short Together";
                    canLowAnswer = "CAN High / Low Short Together";
                    recheckButton();
                    // console.log('can short together');

                }

                if (canLvInCorrected === canHvInCorrected &&
                    totResCorrected > totalCanRangeMin) {
                    error();
                    // console.log('can shorted together resistance greater than min range');
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
                    recheckButton();
                    // console.log('can short together within a range');

                }

                // resistance calculation validation error function when total value high
                function splitError() {
                    // console.log('did this function run');
                    $('#totResIn').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    totResClass = "bad";
                    totResAnswer = "Varify Value Inputed / High Ω at " + testLoc;
                    $('#splitMin').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    splitMclass = "bad";
                    splitMAnswer = "Varify Value Inputed"; // High Ω at " + testLoc;
                    $('#splitFin').attr('style', 'font-weight: bolder; color:red; font-style: italic;');
                    splitFclass = "bad";
                    splitFAnswer = "Varify Value Inputed"; // High Ω at " + testLoc;
                    return false;
                }

                // logic result population / show
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
                // var dataInput8 = $("<p>").html("CAN Total Resistance Calculated from Split Inputs: <span class='calcOutput'>" + result + "</span>");

                $("#results").append(heading, dataInput, dataInput2, dataInput3, dataInput4, dataInput5, dataInput6, dataInput7);

            }
        }

        // if any inputs are not a number error
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
            value.html('Please Press Correct Inputs<br>To Enter Correct Values');
            $("#results").append(heading, error, space, value);
            $("#inputForm :input").attr('style', 'color:red; font-style: italic;');
            recheckButton();
            return false;
        }

        // total resistance value inputed not plausable error
        function error(errorMsg) {
            // $("#testSwap").empty();
            $("#inputForm :input").prop("disabled", true);
            var heading = $('<h1>');
            heading.html('Results <hr>');
            // heading.attr('class', 'mb-4');
            var error = $("<h3>");
            error.attr('style', 'color:red; font-style: italic;');
            error.html('Error in Inputs<br>Values are not Plausible<hr>');
            var error2 = $("<h3>");
            error2.attr('style', 'font-style: italic;');
            error2.html(errorMsg + '<hr>');
            var space = $('<p>');
            var value = $("<h3>");
            value.attr('style', 'color:red; font-style: italic;');
            value.html('Please Press Correct Inputs');
            $("#results").append(heading, error, error2, space, value);
            $("#inputForm :input").attr('style', 'color:red; font-style: italic;');
            recheckButton();
            return false;
        }

        // user inputed total resistance higher than calculated value from split resistance inputs error
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
            value4.html('<hr> Please Press Correct Inputs');
            $("#results").append(heading, error, value, value2, value3, value4);
            $("#inputForm :input").attr('style', 'color:red; font-style: italic;');
            recheckButton();
            return false;
        }

        //enable incorrect value inputs after check function
        function inputEnable() {
            if (totalTest === true) {
                $("#totResIn").prop("disabled", false);
            } else {
                $("#totResIn").prop("disabled", true);
                $('#totResIn').attr('style', 'color: green;');
            }
            if (splitMtest === true) {
                $("#splitMin").prop("disabled", false);
            } else {
                $("#splitMin").prop("disabled", true);
                $('#splitMin').attr('style', 'color: green;');
            }
            if (splitFtest === true) {
                $("#splitFin").prop("disabled", false);
            } else {
                $("#splitFin").prop("disabled", true);
                $('#splitFin').attr('style', 'color: green;');
            }
            if (canHtest === true) {
                $("#canHvIn").prop("disabled", false);
            } else {
                $("#canHvIn").prop("disabled", true);
                $('#canHvIn').attr('style', 'color: green;');
            }
            if (canLtest === true) {
                $("#canLvIn").prop("disabled", false);
            } else {
                $("#canLvIn").prop("disabled", true);
                $('#canLvIn').attr('style', 'color: green;');
            }
            if (groundHtest === true) {
                $("#canGroundH").prop("disabled", false);
            } else {
                $("#canGroundH").prop("disabled", true);
                $('#canGroundH').attr('style', 'color: green;');
            }
            if (groundLtest === true) {
                $("#canGroundL").prop("disabled", false);
            } else {
                $("#canGroundL").prop("disabled", true);
                $('#canGroundL').attr('style', 'color: green;');
            }
        }

        // populate "correct input" button function
        function recheckButton() {
            // if (buttonOn === true) {
            $("#recheck").attr("style", "display:block;");
            $("#reload").attr("style", "display:none;");
            // }

            $("#recheck").on('click', function() {
                $("#results").empty();
                inputEnable();
                $(".knownVal").prop("disabled", true);
                $("#recheck").attr("style", "display: none;");
                $("#reload").attr("style", "display: none;");
                $('#results').attr('style', 'display: none;');
                // $("#inputForm :input").attr('style', 'none');
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

});