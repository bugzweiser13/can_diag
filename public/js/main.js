$("#hyundai-btn").on('click', function() {
    // console.log("hyundai clicked");
    window.location.href = "hyundai.html";
    return false;
});

$("#genesis-btn").on('click', function() {
    // console.log("genesis clicked");
    window.location.href = "genesis.html";
    return false;
});


// password show button
$(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

$("#admin").on('click', function() {
    userLogin();
});

function userLogin() {



    var uname = $("#userName").val().trim();
    var pword = $("#passWord").val().trim();

    $.ajax({
        url: "api/users",
        type: 'GET',
        // where: {
        //     user: uname,
        //     password: pword
        // },

        success: function(data) {
            // console.log(data);

            var loginId = data.find(function(userId) {
                return userId.user === uname;
            })

            if (pword === loginId.password) {
                adminOpen();
            } else {
                alert('Wrong Login Info Provided');
                $("#userName").val('');
                $("#passWord").val('');
            }
        }
    });
}

// admin page open
function adminOpen() {
    // console.log("model input clicked");
    window.location.href = 'adminPage.html';

    // window.open('adminPage.html', '_blank',
    //     'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=100px, left=375px,width=1175 height=890');
    $("#userName").val('');
    $("#passWord").val('');
    return false;
}