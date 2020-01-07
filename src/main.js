const playKey = function({ key }) {
  const audio = document.getElementById(`key-${key}`);
  if (!audio) return; // Do nothing if audio element doesn't exist
  audio.currentTime = 0; // always restart sound on keydown
  audio.play();
};

document.addEventListener("keydown", playKey);

const buttons = document.getElementsByTagName("button");
for (let button of buttons) {
  button.addEventListener("click", () =>
    console.log(button.getAttribute("data-key"))
  );
}
