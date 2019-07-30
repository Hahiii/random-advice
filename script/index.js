window.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main-container");
  const newAdvice = document.querySelector("#new-advice");
  newAdvice.addEventListener("click", setlogo, false);
  let title = document.querySelector("#title");
  title.addEventListener("animationend", animationEnded);
  let spinner = document.querySelector(".spin")
  let adviceSource = document.querySelector("#advice-template").innerHTML;
  let adviceTemplate = Handlebars.compile(adviceSource);
  
  function setlogo() {
    if (spinner.style.display == "none") {
      mainContainer.innerHTML = "";
      spinner.style.display = "flex";
      mainContainer.appendChild(spinner);
      console.log("halooo its flex")
    }

    if (title.classList == "title-start" ) {
      title.classList.remove("title-start");
      title.classList.add("title-logo");
    }
    
    if (newAdvice.innerHTML == "Next Advice") {
      setTimeout(() => { 
        getNewAdvice();
      },1000)
    }
  };
  
  function animationEnded() {
    spinner.style.display = "flex";
    newAdvice.innerHTML = "Next Advice";
    getNewAdvice();
  };
  
  function getNewAdvice(data) {
    fetch(`https://api.adviceslip.com/advice`)
    .then(function(response) {
      if (response.ok) {
        spinner.style.display = "none";
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
        throw new Error("got no data");        
      }
    })
    .catch(function(err){
      spinner.style.display = "none";
      let noData = adviceTemplate({error: err});
      mainContainer.innerHTML += noData;
    })
  };
  
});
