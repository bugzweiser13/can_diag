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
$("input[placeholder]").each(function() {
    $(this).attr('size', $(this).attr('placeholder').length);
});
$('.input').on('click focusin', function() {
    this.value = '';
});

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