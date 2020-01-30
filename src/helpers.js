export const randomColor = () => {
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

  return borderColors[Math.floor(Math.random() * borderColors.length)];
};
