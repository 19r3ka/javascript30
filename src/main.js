import "./components/app-container.component.js";
import "./components/sound.key.component.js";

const playKey = function({ key }) {
  const audio = document.getElementById(`key-${key}`);
  const button = document.getElementById(`button-${key}`);
  if (!audio || !key) return; // Do nothing if audio element doesn't exist
  audio.currentTime = 0; // always restart sound on keydown
  audio.play();
  button.classList.add("playing");
};

document.addEventListener("keydown", playKey);

const buttons = document.getElementsByTagName("button");
for (let button of buttons) {
  button.addEventListener("click", () =>
    playKey({ key: button.getAttribute("data-key") })
  );

  button.addEventListener("transitionend", () =>
    button.classList.remove("playing")
  );
}
