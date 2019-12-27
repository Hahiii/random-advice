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
    newAdvice.classList.add("hide-button");
    if (spinner.style.display == "none") {
      mainContainer.innerHTML = "";
      spinner.style.display = "flex";
      mainContainer.appendChild(spinner);
    }

    if (title.classList == "title-start" ) {
      title.classList.remove("title-start");
      title.classList.add("title-logo");
    }
    
    if (newAdvice.innerHTML == "next advice") {
      setTimeout(() => { 
        getNewAdvice();
      },600)
    }
  };
  
  function animationEnded() {
    spinner.style.display = "flex";
    newAdvice.innerHTML = "next advice";
    setTimeout(() => { 
      getNewAdvice();
    },600)
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
        newAdvice.classList.remove("hide-button");
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
