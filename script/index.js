window.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main-container");
  const newAdvice = document.querySelector("#new-advice");
  newAdvice.addEventListener("click", getNewAdvice, false);
  let adviceSource = document.querySelector("#advice-template").innerHTML;
  let adviceTemplate = Handlebars.compile(adviceSource);
  
function getNewAdvice(data) {
  fetch(`https://api.adviceslip.com/advice`)
.then(function(response) {
  if (response.ok) {
    return response.json();
  }else{
    throw new Error("got no data");
  }
})
.then(function(data){
  if (data) {
  let advice = adviceTemplate({advice: data.slip.advice});
  mainContainer.innerHTML = advice;
  }else{
    let noData = adviceTemplate({advice: "Got no more free Advice"});
  mainContainer.innerHTML += noData;
  }
  

})
.catch(function(err){
  let noData = adviceTemplate({advice: err});
  mainContainer.innerHTML += noData;
})
}


});
