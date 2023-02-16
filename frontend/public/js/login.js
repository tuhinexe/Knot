
let eyeicon = document.querySelector("#eyeicon");
let password = document.querySelector("#password");

eyeicon.onclick=function(){
  if(password.type == "password"){
    password.type = "text";
    eyeicon.src=("/images/openeye.png");
    
  }else{
    password.type = "password";
    eyeicon.src=("/images/closedeye.png");
    
  }
}
