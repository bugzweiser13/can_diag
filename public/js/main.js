$(document).ready(function() {

    $.ajax({
        url: "api/users",
        type: 'GET',

        success: function(users) {

            var arrayLength = users.length;
            var dataOut = [];

            users.forEach((elem, index) => {
                    dataOut.push(elem);
                    if (dataOut.length === arrayLength)
                        users.length = 0
                })
                // debugging
                // console.log(dataIn);
                // dataOut.push(dataIn); 
                // console.log("%o", dataOut);
            userLogin(dataOut);
        }
    });


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

    function userLogin(dataOut) {

        // console.log('users: ' + dataOut[0].user);
        // console.log('password: ' + dataOut[0].password);

        var name = dataOut[0].user;
        var pw = dataOut[0].password;

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

            var uname = $("#userName").val().trim();
            var pword = $("#passWord").val().trim();

            // console.log('user: ' + uname);
            // console.log('password: ' + pword);

            if (uname === name && pword === pw) {

                // console.log("model input clicked");
                window.open('adminPage.html', '_blank',
                    'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=200px, left=375px,width=1175 height=875');
                $("#userName").val('');
                $("#passWord").val('');
                return false;
            } else {
                alert('Wrong Login Info Provided');
                $("#userName").val('');
                $("#passWord").val('');
            }

        });
    };
});