const isItemInList = (list, itemId) => {
    return list.filter((item) => item.id === itemId).length > 0 ? true : false;
}
export { isItemInList };