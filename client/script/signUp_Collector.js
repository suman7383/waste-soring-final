let formC = document.getElementById('signup-formC');
let fnameC= formC.elements['fnameC'];
let lnameC= formC.elements['lnameC'];
let emailC= formC.elements['emailC'];
let passwordC= formC.elements['passC'];
let stateC  = formC.elements['stateC'];
let cityC= formC.elements['cityC'];
let localityC= formC.elements['localityC'];
let col_id = formC.elements['col_id'];

let cityListC=[], localityListC=[];

function onStateChangeC(){
  const value = stateC.value;
  cityListC.length=0;
  clearCityC();
  clearLocalityC();

  if(value!=""){

    axios.get(`http://localhost:5000/api/city/get?state=${value}`).then((res)=>{
      console.log(res.data);
      cityListC= res.data.data.city;
      console.log(res.data.data.city);
      loadCityC();
      onCityChangeC();

    }).catch((err)=>{
      console.log(err)
    })
  }
}

function onCityChangeC(){
  const statevalue = stateC.value;
  const cityvalue = cityC.value;

  if(statevalue!="" && cityvalue!=""){

    localityListC.length=0;
    clearLocalityC();

    axios.get(`http://localhost:5000/api/locality/get?state=${statevalue}&city=${cityvalue}`).then((res)=>{
      console.log(res.data);
      localityListC = res.data.data.locality;
      loadLocalityC();

    }).catch((err)=>{
      console.log(err)
    })
  }
}

function loadCityC(){
  console.log(cityListC);
 
  const select = document.getElementById("cityC");

  cityListC.forEach((elm)=>{
    let option = document.createElement('option');
    const optionText = document.createTextNode(elm);
    option.appendChild(optionText);
    option.value=elm;
    option.setAttribute("value",elm);
    select.appendChild(option);
  })
}

function clearCityC(){
  let cityItem = document.getElementById("cityC");
  let child = cityItem.lastElementChild;

  while (child) {
      cityItem.removeChild(child);
      child = cityItem.lastElementChild;
  }
}

function loadLocalityC(){
 
  const select = document.getElementById("localityC");

  localityListC.forEach((elm)=>{
    let option = document.createElement('option');
    const optionText = document.createTextNode(elm);
    option.appendChild(optionText);
    option.value=elm;
    option.setAttribute("value",elm);
    select.appendChild(option);
  })
}

function clearLocalityC(){
  let localityItem = document.getElementById("localityC");
  let child = localityItem.lastElementChild;

  while (child) {
      localityItem.removeChild(child);
      child = localityItem.lastElementChild;
  }
}

function registerC(event){
  event.preventDefault();

  const data ={
    fname:fnameC.value,
    lname:lnameC.value,
    email:emailC.value,
    password:passwordC.value,
    state:stateC.value,
    city:cityC.value,
    collector_id:col_id.value,
    locality:localityC.value,
  };

  axios.post(`http://localhost:5000/api/register/collector`,data).then((res)=>{
    if(res.status==200){
      console.log("registered!");
    }
  }).catch((err)=>{
    if(err.response.status==403){
      alert(err.response.data.err);
      console.log("user already exists with that email!");
    }
  });
}