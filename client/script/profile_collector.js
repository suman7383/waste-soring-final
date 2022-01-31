let firstnameC = document.getElementById("fnameC")
let lastnameC = document.getElementById("lnameC")
let emailC = document.getElementById("emailC")
let stateC = document.getElementById("stateC")
let cityC = document.getElementById("cityC")
let localityC = document.getElementById("localityC")
let col_idC = document.getElementById("col_idC")
let profileHeaderC = document.getElementById("profile-headerC")
let oldPassC = document.getElementById("oldPassC")
let newPassC = document.getElementById("newPassC")
let conPassC = document.getElementById("conPassC")

let profileC = [];

window.onload= load_dataC();

function load_dataC(email){
  data ={
    email:sessionStorage.getItem("user_email")
  }
  axios.post('http://localhost:5000/api/collector/profile',data).then((res)=>{
    if(res.status==200){
      console.log(res.data);
      if(res.data.user_type!="collector"){
        sessionStorage.removeItem("jwt_token")
      sessionStorage.removeItem("user_email")
      window.location = "/client/login.html"
      }
      profileC = res.data
      updateDataC();
    }else{
      console.log(res)
    }
  }).catch((err)=>{
    console.log(err)
  })
}

function updateDataC(){
  firstnameC.setAttribute("value",profileC.firstName)
  lastnameC.setAttribute("value", profileC.secondName)
  emailC.setAttribute("value", profileC.email)
  stateC.setAttribute("value", profileC.state)
  cityC.setAttribute("value", profileC.city)
  col_idC.setAttribute("value", profileC.collector_id)
  localityC.setAttribute("value", profileC.locality)
  profileHeaderC.setAttribute("data-title", firstname.value+" "+lastname.value)
}

function updateC(){
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

function updatePassC(){
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