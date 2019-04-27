//cache the select and span elements
var mySelect = document.getElementById("mySelect"),
    tag = document.getElementById("tag");
    // flag = document.getElementById("transfer");
console.log(tag);
console.log(flag);
// var mySelect = document.getElementById("mySelect"),
//     flag = document.getElementById("PayE()");

//when it changes
mySelect.onchange = function() {
    console.log(mySelect.Value);

       tag.innerHTML = mySelect.value === "1" ? "USD" : "Ether";       //change the tag innerHTML checking the selected value of the select
       flag.innerHTML = mySelect.value === "1" ? "Pay()" : "PayE()";
    // document.getElementById("transfer").setAttribute( "onClick", "PayE()" );
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