const capitalize = (string) => {
    const strArr = string.split("_");
    return strArr.map((word) => {
        return word.charAt(0).toUpperCase() + word.substr(1);
    }).join(" ");
}

export { capitalize };