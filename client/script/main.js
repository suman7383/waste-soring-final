const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress-custom");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const progress_bar = document.querySelector(".progress-bar");
const organic_count = document.getElementById("organic-item-count");
const recyclable_count = document.getElementById("recyclable-item-count");
const electronic_count = document.getElementById("electronic-item-count");

let formStepsNum = 0;
let currProgress=0;
let organicWaste=[], recyclableWaste=[], electronicWaste=[];
let itemLink = {
                leave:"./images/leaves.png", plastic:"./images/plastic.png",
                glass:"./images/glass.png", cans:"./images/cans.png",
                bulb:"./images/bulb.png", battery:"./images/battery.png",
                chicken:"./images/food.png", paper:"./images/paper.png"
              };

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
    if(formStepsNum==1){
      currProgress=0;
      progress_bar.setAttribute("aria-valuenow", 0);
      progress_bar.setAttribute("style", "width: "+0+'%');
      progressInterval = window.setInterval(progressIncrease,1000);
    }
    if(formStepsNum==2){
      window.clearInterval(progressInterval);
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if(formStepsNum==2){
       formStepsNum-=2;
    }else{

      formStepsNum--;
    }
    updateFormSteps();
    updateProgressbar();
    if(formStepsNum==0){
      currProgress=0;
      window.clearInterval(progressInterval);
      clearWasteArray();
      setItemCount(0,0,0);
      removeImages();
    }
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

function progressIncrease(){
  currProgress+=(Math.random()*25);
  if(currProgress>100){
    window.clearInterval(progressInterval);
    formStepsNum++;
    if(formStepsNum>=2){
      formStepsNum=2;
    }
    updateFormSteps();
    updateProgressbar();
    
  }
  progress_bar.setAttribute("aria-valuenow", currProgress);
  progress_bar.setAttribute("style", "width: "+currProgress+'%');
}

function setItemCount(organic, recyclable, electronic){
  organic_count.setAttribute("data-title",organic);
  recyclable_count.setAttribute("data-title",recyclable);
  electronic_count.setAttribute("data-title",electronic);
}

function sort(){
  let checkedValue = document.querySelectorAll('.form-check-input');
  checkedValue.forEach((elm)=>{
    if(elm.checked){
      if(elm.value=="organic"){
        organicWaste.push(elm.name);
      }else if(elm.value=="recyclable"){
        recyclableWaste.push(elm.name);
      }else{
        electronicWaste.push(elm.name);
      }
    }
  })

  setItemCount(organicWaste.length,recyclableWaste.length, electronicWaste.length);
  
  addItemImage();
  console.log("organic--> "+ organicWaste+" recyclable--> "+recyclableWaste+" electronicWaste--> "+electronicWaste);
}

function addItemImage(){
  organicWaste.forEach((elm)=>{
    let img = document.createElement('img');
    img.src = itemLink[elm];
    img.className = "waste-img";
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.marginTop = "15px";
    img.style.marginBottom = "15px";
    img.style.marginLeft = "15px";
    document.getElementById("organic-items").appendChild(img);
  })
  recyclableWaste.forEach((elm)=>{
    let img = document.createElement('img');
    img.src = itemLink[elm];
    img.className = "waste-img";
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.marginTop = "15px";
    img.style.marginBottom = "15px";
    img.style.marginLeft = "15px";
    document.getElementById("recyclable-items").appendChild(img);
  })
 electronicWaste.forEach((elm)=>{
    let img = document.createElement('img');
    img.src = itemLink[elm];
    img.className = "waste-img";
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.marginTop = "15px";
    img.style.marginBottom = "15px";
    img.style.marginLeft = "15px";
    document.getElementById("electronic-items").appendChild(img);
  })

}

function removeImages(){
  let organicImages = document.getElementById("organic-items");
  let recyclableImages = document.getElementById("recyclable-items");
  let electronicImages = document.getElementById("electronic-items");
  let child = organicImages.lastElementChild;

  while (child) {
      organicImages.removeChild(child);
      child = organicImages.lastElementChild;
  }
   
  child = recyclableImages.lastElementChild;

  while (child) {
      recyclableImages.removeChild(child);
      child = recyclableImages.lastElementChild;
  }
 
  child = electronicImages.lastElementChild;

  while (child) {
      electronicImages.removeChild(child);
      child = electronicImages.lastElementChild;
  }
}

function clearWasteArray(){
  organicWaste.length=0;
  recyclableWaste.length=0;
  electronicWaste.length=0;
}