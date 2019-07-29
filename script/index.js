window.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main-container");
  const newAdvice = document.querySelector("#new-advice");
  newAdvice.addEventListener("click", setlogo, false);
  let title = document.querySelector("#title");
  title.addEventListener("animationend", getNewAdvice);
  let spinner = document.querySelector(".spin")
  let adviceSource = document.querySelector("#advice-template").innerHTML;
  let adviceTemplate = Handlebars.compile(adviceSource);
  
  function setlogo() {
    if (spinner.childNodes[1].classList == "") {
      spinner.childNodes[1].classList.add("spinner");
      spinner.childNodes[3].innerHTML ="...loading..."
      mainContainer.innerHTML = "";
      mainContainer.appendChild(spinner);
    }else{
      mainContainer.innerHTML = "";
      mainContainer.appendChild(spinner);
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
    newAdvice.innerHTML = "Next Advice";
    mainContainer.removeChild(spinner);
  };
  
});
