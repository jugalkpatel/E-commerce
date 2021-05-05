const isItemInList = (list, itemId) => {
    return list.filter((item) => item.product._id === itemId).length > 0 ? true : false;
}
export { isItemInList };