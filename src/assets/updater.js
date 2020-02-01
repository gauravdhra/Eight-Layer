

function myFun(){

setTimeout(function(){

//alert("updated")
    //alert("updated_user_Id", localStorage.getItem("Updated_user_id"));
    var basePath = localStorage.getItem("ExePath");
    console.log("basePath=" + basePath);
   
    const updateJsonFile = require('update-json-file')
    
    const filePath = basePath;
    const options = { defaultValue: {} }
    
    updateJsonFile(filePath, (data) => {
     // not safe to return `data`, need to return a modified clone 
     return Object.assign({}, data, {
       eight_layer_api_url_userId: localStorage.getItem("Updated_user_id")
     })
    }, options)
    

},5000)


}
    