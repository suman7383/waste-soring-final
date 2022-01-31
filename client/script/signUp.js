let form = document.getElementById('signup-form');
let fname= form.elements['fname'];
let lname= form.elements['lname'];
let email= form.elements['email'];
let password= form.elements['pass'];
let state  = form.elements['state'];
let city= form.elements['city'];
let locality= form.elements['locality'];

let cityList=[], localityList=[];

function onStateChange(){
  const value = state.value;
  cityList.length=0;
  clearCity();
  clearLocality();

  if(value!=""){

    axios.get(`http://localhost:5000/api/city/get?state=${value}`).then((res)=>{
      console.log(res.data);
      cityList= res.data.data.city;
      console.log(res.data.data.city);
      loadCity();
      onCityChange();

    }).catch((err)=>{
      console.log(err)
    })
  }
}

function onCityChange(){
  const statevalue = state.value;
  const cityvalue = city.value;

  if(statevalue!="" && cityvalue!=""){

    localityList.length=0;
    clearLocality();

    axios.get(`http://localhost:5000/api/locality/get?state=${statevalue}&city=${cityvalue}`).then((res)=>{
      console.log(res.data);
      localityList = res.data.data.locality;
      loadLocality();

    }).catch((err)=>{
      console.log(err)
    })
  }
}

function loadCity(){
  console.log(cityList);
 
  const select = document.getElementById("city");

  cityList.forEach((elm)=>{
    let option = document.createElement('option');
    const optionText = document.createTextNode(elm);
    option.appendChild(optionText);
    option.value=elm;
    option.setAttribute("value",elm);
    select.appendChild(option);
  })
}

function clearCity(){
  let cityItem = document.getElementById("city");
  let child = cityItem.lastElementChild;

  while (child) {
      cityItem.removeChild(child);
      child = cityItem.lastElementChild;
  }
}

function loadLocality(){
 
  const select = document.getElementById("locality");

  localityList.forEach((elm)=>{
    let option = document.createElement('option');
    const optionText = document.createTextNode(elm);
    option.appendChild(optionText);
    option.value=elm;
    option.setAttribute("value",elm);
    select.appendChild(option);
  })
}

function clearLocality(){
  let localityItem = document.getElementById("locality");
  let child = localityItem.lastElementChild;

  while (child) {
      localityItem.removeChild(child);
      child = localityItem.lastElementChild;
  }
}

function register(event){
  event.preventDefault();
  const data ={
    fname:fname.value,
    lname:lname.value,
    email:email.value,
    password:password.value,
    state:state.value,
    city:city.value,
    locality:locality.value,
  };

  axios.post(`http://localhost:5000/api/register?type=citizen`,data).then((res)=>{
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