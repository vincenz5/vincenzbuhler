//cache the select and span elements
var mySelect = document.getElementById("mySelect"),
    tag = document.getElementById("tag");
    flag = document.getElementById("transfer");

// var mySelect = document.getElementById("mySelect"),
//     flag = document.getElementById("PayE()");

//when it changes
mySelect.onchange = function() {
    console.log(flag);
       //change the tag innerHTML checking the selected value of the select
       tag.innerHTML = mySelect.value === "1" ? "USD" : "Ether";
       flag.innerHTML = mySelect.value === "1" ? "Pay()" : "PayE()";
    // document.getElementById("transfer").setAttribute( "onClick", "PayE()" );
    console.log(mySelect.value);
}



function Copy() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");
  
    /* Select the text field */
    copyText.select();
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);

    location.reload();
  }