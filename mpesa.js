console.log("hello from mpesa")
function sendMoney() {

    var http = new XMLHttpRequest();
    var url = 'get_data.php';
    var params = 'orem=ipsum&name=binny';
    http.open('POST', url, true);
    console.log("werer")
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
}