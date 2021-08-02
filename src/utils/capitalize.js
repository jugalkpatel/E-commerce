const capitalize = (string) => {
  if (!string || string === "None") return "--";

  if (typeof string === "number") return string;

  return string
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.substr(1);
    })
    .join(" ");
};

export { capitalize };
