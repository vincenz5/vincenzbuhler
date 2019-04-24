//cache the select and span elements
var mySelect = document.getElementById("mySelect"),
    tag = document.getElementById("tag");

var myTransfer = document.getElementById("transfer"),
    flag = document.getElementById("PayE()");

//when it changes
mySelect.onchange = function() {
    console.log (flag)
       //change the tag innerHTML checking the selected value of the select
       tag.innerHTML = mySelect.value === "1" ? "Send Dai" : "Send Eth";
    //    flag.innerHTML = transfer.value === "1" ? "Pay()" : "PayE()";
    document.getElementById("transfer").setAttribute( "onClick", "PayE()" );

}