$(function() {

    $("#hyundai-btn").on('click', function() {
        console.log("hyundai clicked");
        window.location.href = "hyundai.html";
        return false;
    });
    $("#genesis-btn").on('click', function() {
        console.log("genesis clicked");
        window.location.href = "genesis.html";
        return false;
    });
    $("#input-btn").on('click', function() {
        console.log("model input clicked");
        window.open('model_input.html', '_blank',
            'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=500')
        return false;
    });

});