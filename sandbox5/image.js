var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === '../assets/images/Mega.jpg') {
      myImage.setAttribute ('src','../assets/images/Soriana.jpg');
    } else {
      myImage.setAttribute ('src','../assets/images/Mega.jpg');
    }
}
