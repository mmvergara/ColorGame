export type Colors = "red" | "blue" | "green" | "white" | "yellow" | "pink";

/// use switch case instead of if else
export const getEmbedColor = (color: Colors): number => {
  switch (color) {
    case "red":
      return 0xd93321;
    case "green":
      return 0x21d933;
    case "blue":
      return 0x2196f3;
    case "white":
      return 0xffffff;
    case "yellow":
      return 0xffff00;
    case "pink":
      return 0xffc0cb;
    default:
      return 0x34d9d9;
  }
};

export const getColorEmoji = (color: Colors): string => {
  switch (color) {
    case "red":
      return "🟥";
    case "green":
      return "🟩";
    case "blue":
      return "🟦";
    case "white":
      return "🐻‍❄️";
    case "yellow":
      return "🟨";
    case "pink":
      return "🟪";
  }
};

export const getTwoRandomColors = (): [Colors, Colors] => {
  const colors: Colors[] = ["red", "green", "blue", "white", "yellow", "pink"];
  const randomIndex1 = Math.floor(Math.random() * colors.length);
  let randomIndex2 = Math.floor(Math.random() * colors.length);
  while (randomIndex1 === randomIndex2) {
    randomIndex2 = Math.floor(Math.random() * colors.length);
  }
  return [colors[randomIndex1], colors[randomIndex2]];
};
