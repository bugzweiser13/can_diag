//get brand from prev page
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

//url variables
var params = getUrlParams();
var brand = params['brand'];
console.log("param push: " + brand);

$("#brand").attr('value', brand);

//input length set and clear when clicked
// $("input[placeholder]").each(function() {
//     $(this).attr('size', $(this).attr('placeholder').length);
// });
// $('.input').on('click focusin', function() {
//     this.value = '';
// });

// $("#submitButton").click(function(e) {
//     if ($("#userNameTextBox").val() == "")
//         $("#userNamSpan").text("Enter Username");
//     else
//         $("#userNamSpan").text("");
//     if ($("#passwordTextBox").val() == "")
//         $("#passwordSpan").text("Enter Password");
//     else
//         $("#passwordSpan").text("");
//     if (($("#userNameTextBox").val() != "") && ($("#passwordTextBox").val() != ""))
//         $.ajax({
//             type: "POST",
//             url: "index.aspx/login",
//             contentType: "application/json; charset=utf-8",
//             data: '{"username":"' + $("#userNameTextBox").val() + '","password":"' + $("#passwordTextBox").val() + '"}',
//             dataType: "json",
//             success: function(result, status, xhr) {
//                 if (result.d == "Success") {
//                     $("#messageSpan").text("Login Successful, Redireting to your profile page.");
//                     setTimeout(function() { window.location = "profile.aspx"; }, 2000);
//                 } else $("#messageSpan").text("Login failed, Please try again.");
//             },
//             error: function(xhr, status, error) { $("#dbData").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText) }
//         });
// });
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