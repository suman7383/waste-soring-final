module.exports.date =()=>{
  let date = new Date();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  let day = date.getDate();

  let newDate = "";
  newDate = year+"-"+month+"-"+day;
  return newDate;
}