tablePopulate();

// vehicle input
$('#vehSubmit').on('click', function() {
    event.preventDefault();

    var brand = $('#brand').val().trim();

    if (brand === 'genesis') {
        var search = new Array();

        $.ajax({
            url: "api/genvehlists",
            datatype: 'json',
            success: function(rows) {
                rows.forEach(function(row) {
                    if (search.indexOf(row.id) == -1) {
                        search.push(row.id);
                    }
                })
                console.log(search);
                var lastId = search.pop();
                console.log(lastId);
                genVehInput(lastId);
                // console.log(data.id)
            }
        });
        // alert('genesis')
    } else {
        if (brand === 'hyundai') {

            // alert('hyundai')
        }
    }
})

function genVehInput(lastId) {

    console.log(lastId);

    var genId = parseInt(lastId) + 1;

    // var genId = Math.floor(Math.random() * 20);
    var modId = Math.floor(Math.random() * 500);

    var modelIn = $("#mod_code").val().trim();
    var modelCodeUp = modelIn.toUpperCase();
    var nameIn = $("#mod_name").val().trim();
    var nameUp = nameIn.toUpperCase();
    var netIdIn = $("#net_id").val().trim();
    var netIdUp = netIdIn.toUpperCase();
    var trMin = $("#term_m").val().trim();
    var trMup = trMin.toUpperCase();
    var trFin = $("#term_f").val().trim();
    var trFup = trFin.toUpperCase();
    var testLocIn = $("#test_loc").val().trim();
    var testLocUp = testLocIn.toUpperCase();


    var newGen = {
        //brand = $("#brand").val().trim(),
        id: genId,
        model_num: modId,
        model_name: nameUp,
        model: modelCodeUp,
        start_year: $("#start_year").val().trim(),
    }

    var genVolt = {
        // id: genId,
        model: nameUp,
        model_num: modId,
        start_year: $("#start_year").val().trim(),
        net_id: netIdUp,
        test_loc: testLocUp,
        volt_h: $("#can_h_v").val().trim(),
        volt_l: $("#can_l_v").val().trim(),

    }

    var genRes = {
        // id: genId,
        model_num: modId,
        model_name: nameUp,
        model: modelCodeUp,
        start_year: $("#start_year").val().trim(),
        net_id: netIdUp,
        res_val_m: $("#split_res_m").val().trim(),
        res_val_f: $("#split_res_f").val().trim(),
        tot_res: $("#tot_res").val().trim(),
        term_m: trMup,
        term_f: trFup,
        test_loc: testLocUp,
        pin_h: $("#pin_h").val().trim(),
        pin_l: $("#pin_l").val().trim(),
    }

    addGen(newGen);
    addGenRes(genRes);
    addGenVolt(genVolt);

    $("#mod_name").val("");
    $("#mod_code").val("");
    $("#start_year").val("");
    $("#net_id").val("");
    $("#can_h_v").val("");
    $("#can_l_v").val("");
    $("#split_res_m").val("");
    $("#split_res_f").val("");
    $("#tot_res").val("");
    $("#term_m").val("");
    $("#term_f").val("");
    $("#test_loc").val("");
    $("#pin_h").val("");
    $("#pin_l").val("");
}


function addGen(newGen) {

    return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/genvehlists",
        data: JSON.stringify(newGen),

        success: function() {
            // alert(newGen.model_name + ' has been added!');
        }
    })
}

function addGenRes(genRes) {

    return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/gencanress",
        data: JSON.stringify(genRes),

        success: function() {
            // alert(genRes.model_name + ' has been added!');
        }
    })
}

function addGenVolt(genVolt) {

    return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/gencanvolts",
        data: JSON.stringify(genVolt),

        success: function() {
            alert(genVolt.model + ' has been added!');
        }
    })
}

function tablePopulate() {

    //reset table
    $("#userTableBody").empty();

    $.ajax({
        url: "api/users",
        type: 'GET',

        success: function(data) {
            // console.log(data);

            for (let i = 0; i < data.length; i++) {
                tRow = $('<tr>');
                var tCell1 = $('<td>').html(data[i].id);
                tCell1.attr('class', "id");
                var tCell2 = $('<td>').html(data[i].user);
                tCell2.attr('class', "user");
                var tCell3 = $('<td>').html(data[i].password);
                tCell3.attr('class', "password");
                $("#userTableBody").append(tRow.append(tCell1, tCell2, tCell3));
            }

        },
        error: function() {
            alert('error');
        }

    });
}

// loading gif show/hide 
$(document).ready(function() {
    $(document).ajaxStart(function() {
        $("#userTableBody").hide();
        $("#loading").show();
    }).ajaxStop(function() {
        setTimeout(function() {
            $("#loading").hide();
            $("#userTableBody").show();
        }, 1000);
    });
});



// user add
$('#userSubmit').on('click', function() {
    event.preventDefault();

    var newUser = {
        user: $('#add_user').val().trim(),
        password: $('#pass_word').val().trim()
    };

    var userCount = newUser.user.length;
    var passCount = newUser.password.length;

    if (!(newUser.user && newUser.password)) {
        alert("You must enter an username and password to add a new user!");
        return;
    } else {
        if (userCount < 6 || passCount < 6) {
            alert('Please make sure user and/or password are 6 characters in length')
            return;
        }

        addUser(newUser);


        $('#add_user').val("");
        $('#pass_word').val("");
    }
});

function addUser(newUser) {

    return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/users",
        data: JSON.stringify(newUser),

        success: function() {
            // alert(newUser.user + ' has been added!');
            tablePopulate();
        }
    })
}

// user delete
$('#delSubmit').on('click', function() {
    event.preventDefault();
    // console.log('this ran');

    var user = $('#del_user').val().trim();

    if (!(user)) {
        alert("You must enter a username to remove!");
        return;
    }

    delUser(user)

    $('#del_user').val("");
});

function delUser(user) {
    // alert(remove + ' has been removed');

    return $.ajax({

        type: "DELETE",
        url: "api/users",
        data: { user: user }

    }).then(function(rowDeleted) {
        if (rowDeleted === 1) {
            // alert(user + ' was deleted succesfully');
            tablePopulate();
        }
    }, function(err) {
        console.log(err);
    });

}

//input length set and clear when clicked
// $("input[placeholder]").each(function() {
//     $(this).attr('size', $(this).attr('placeholder').length);
// });

$('.input').on('click focusin', function() {
    this.value = '';
});

//adding decimals to needed inputs
$("#can_h_v").blur(function() {
    this.value = ((parseInt(this.value) * .01).toFixed(2));
});
$("#can_l_v").blur(function() {
    this.value = ((parseInt(this.value) * .01).toFixed(2));
});
$("#tot_res").blur(function() {
    this.value = ((parseInt(this.value) * .10).toFixed(2));
});
$("#split_res_m").blur(function() {
    this.value = ((parseInt(this.value) * .10).toFixed(2));
});
$("#split_res_f").blur(function() {
    this.value = ((parseInt(this.value) * .10).toFixed(2));
});