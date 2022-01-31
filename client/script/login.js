let loginForm = document.getElementById('login-form');
let loginEmail = loginForm.elements["email"];
let loginPassword = loginForm.elements["password"];
let type = loginForm.elements["login_as"]; 

function login(event){

  event.preventDefault();
  let data ={
    email:loginEmail.value,
    password: loginPassword.value,
    type:type.value,
  }

  console.log(data)
  axios.post('http://localhost:5000/api/login',data,{credentials: 'include'}).then((res)=>{
    if(res.status==200){
      console.log("logged In!");
      sessionStorage.setItem("jwt_token", res.data.token);
      sessionStorage.setItem("user_email", res.data.data.email)
      if(type.value=="citizen"){

        window.location = "/client/main.html";
      }else if(type.value=="collector"){
        window.location = "/client/collector.html";
      }
    }
  }).catch((err=>{
    if(err?.response?.status==404){
      alert(err.response.data.err)
    }
    console.log(err);
  }))
}