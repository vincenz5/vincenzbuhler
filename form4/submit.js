// $(function (){
//     $("#add-cart").click(function(){
//        var bid=$('#bid').val();
//        var myqty=new Array()
//        var myprice=new Array()
   
//        qty1=$('#qty10').val();
//        qty2=$('#qty11').val();
//        qty3=$('#qty12').val();
   
//        price1=$('#price1').val();
//        price2=$('#price2').val();
//        price3=$('#price3').val();
   
//        var postData = 
//                    {
//                        "bid":bid,
//                        "location1":"1","quantity1":qty1,"price1":price1,
//                        "location2":"2","quantity2":qty2,"price2":price2,
//                        "location3":"3","quantity3":qty3,"price3":price3
//                    }
//        var dataString = data: {myData:postData},;
   
//        $.ajax({
//                type: "POST",
//                dataType: "json",
//                url: "add_cart.php",
//                data: {myData:dataString},
//                success: function(data){
//                    alert('Items added');
//                },
//                error: function(e){
//                    console.log(e.message);
//                }
//        });
//    });
//    });