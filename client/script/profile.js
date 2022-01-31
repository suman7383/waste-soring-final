let firstname = document.getElementById("fnameP")
let lastname = document.getElementById("lnameP")
let emailP = document.getElementById("emailP")
let stateP = document.getElementById("stateP")
let cityP = document.getElementById("cityP")
let localityP = document.getElementById("localityP")
let profileHeader = document.getElementById("profile-header")
let aboutP = document.getElementById("aboutP")
let oldPass = document.getElementById("oldPassP")
let newPass = document.getElementById("newPassP")
let conPass = document.getElementById("conPassP")

let profile = [];

window.onload= load_data();

function load_data(email){
  data ={
    email:sessionStorage.getItem("user_email")
  }

  axios.post('http://localhost:5000/api/citizen/profile',data).then((res)=>{
    if(res.status==200){
      console.log(res.data);
      if(res.data.user_type!="citizen"){
        sessionStorage.removeItem("jwt_token")
      sessionStorage.removeItem("user_email")
      window.location = "/client/login.html"
      }
      profile = res.data
      updateData();
    }else{
      console.log(res)
    }
  }).catch((err)=>{
    console.log(err)
  })
}

function updateData(){
  firstname.setAttribute("value",profile.firstName)
  lastname.setAttribute("value", profile.secondName)
  emailP.setAttribute("value", profile.email)
  stateP.setAttribute("value", profile.state)
  cityP.setAttribute("value", profile.city)
  localityP.setAttribute("value", profile.locality)
  profileHeader.setAttribute("data-title", firstname.value+" "+lastname.value)
}

function update(){
  const data = {
    email:emailP.value,
    firstName:firstname.value,
    secondName:lastname.value,
    about:aboutP.value,
  }

  axios.post('http://localhost:5000/api/citizen/profile/updateA',data).then((res)=>{
    if(res.status==200){
      alert('Updated!')
    }
  }).catch((err)=>{
    alert("An error occured! Try again later")
  })
}

function updatePass(){
  if(conPass.value!=newPass.value){
    alert("your new password and confirm password does not match!")
    return
  }
   const data = {
    email:sessionStorage.getItem("user_email"),
    oldPass:oldPass.value,
    newPass:newPass.value,
  }

  axios.post('http://localhost:5000/api/citizen/profile/updateP',data).then((res)=>{
    if(res.status==200){
      alert('Updated!')
    }
  }).catch((err)=>{
    alert("An error occured! Try again later")
  })
}