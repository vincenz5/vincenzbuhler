$.post(url, data, function(response) {
    // Do something with the response
}, 'json');


// var data = {'bob':'foo','paul':'dog'};
// $.ajax({
//   url: url,
//   type: 'POST',
//   contentType:'application/json',
//   data: JSON.stringify(data),
//   dataType:'json',
//   success: function(data){
//     //On ajax success do this
//     alert(data);
//      },
//   error: function(xhr, ajaxOptions, thrownError) {
//      //On error do this
//        if (xhr.status == 200) {

//            alert(ajaxOptions);
//        }
//        else {
//            alert(xhr.status);
//            alert(thrownError);
//        }
//    }
// });