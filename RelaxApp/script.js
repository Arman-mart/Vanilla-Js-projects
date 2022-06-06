const text = document.querySelector("#circle-text");
const container = document.querySelector(".container");

const updateCircleText = () => {
  text.innerText = "Breathe in";
  setTimeout(() => {
    text.innerText = "Hold Breath";
    setTimeout(() => {
      text.innerText = "Breath Out";
    }, 1500);
  }, 3000);
};

const updateCircle = () => {
  container.classList.remove("shrink");
  container.classList.add("grow");
  setTimeout(() => {
    setTimeout(() => {
      container.classList.remove("grow");
      container.classList.add("shrink");
    }, 3000);
  }, 1500);
  updateCircleText();
};
updateCircle();
setInterval(updateCircle, 7500);

