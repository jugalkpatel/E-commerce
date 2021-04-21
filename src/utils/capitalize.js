const capitalize = (string) => {
    const replacedString = string.replaceAll("_", " ");
    return replacedString.split(" ").map((word) => {
        return word.charAt(0).toUpperCase() + word.substr(1);
    }).join(" ");
}

export { capitalize };