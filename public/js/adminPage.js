tablePopulate();

function tablePopulate() {

    //reset table
    $("#userTableBody").empty();

    $.ajax({
        url: "api/users",
        type: 'GET',
        // where: {
        //     user: uname,
        //     password: pword
        // },

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
                $("#userTableBody").append(tRow.append(tCell2, tCell3));
            }

        },

    });

}

$('#vehSubmit').on('click', function() {

    var brand = $('#brand').val().trim();

    if (brand === 'genesis') {
        alert('genesis')
    } else {
        if (brand === 'hyundai') {
            alert('hyundai')
        }
    }
})


// user add
$('#userSubmit').on('click', function() {
    event.preventDefault();

    var newUser = {
        user: $('#add_user').val().trim(),
        password: $('#pass_word').val().trim()
    };

    if (!(newUser.user && newUser.password)) {
        alert("You must enter an username and password to add a new user!");
        return;
    }

    addUser(newUser);


    $('#add_user').val("");
    $('#pass_word').val("");
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
            alert(newUser.user + ' has been added!');
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
            alert(user + ' was deleted succesfully');
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

// $(document).ajaxStart(function() { $("#loadingImg").show(); });
// $(document).ajaxStop(function() { $("#loadingImg").hide(); });


//adding decimals to needed inputs
$("#can_h_v").blur(function() {
    this.value = parseFloat(this.value) * .01.toFixed(2);
});
$("#can_l_v").blur(function() {
    this.value = parseFloat(this.value) * .01.toFixed(2);
});
$("#tot_res").blur(function() {
    this.value = parseFloat(this.value) * .10.toFixed(2);
});
$("#split_res_m").blur(function() {
    this.value = parseFloat(this.value) * .10.toFixed(2);
});
$("#split_res_f").blur(function() {
    this.value = parseFloat(this.value) * .10.toFixed(2);
});