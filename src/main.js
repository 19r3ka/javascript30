const borderColors = [
  "magenta",
  "yellow",
  "aqua",
  "blue",
  "orange",
  "green",
  "lime",
  "cornsilk",
  "maroon",
  "lavenderBlush"
];

// select a random color as keys highlight color when pressed
document.documentElement.style.setProperty(
  "--border-color",
  borderColors[Math.floor(Math.random() * borderColors.length)]
);

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
