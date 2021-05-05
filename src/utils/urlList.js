const getUserUrls = (userId) => {
    return {
        ADD_ITEM: `http://localhost:7000/user/${userId}/cart/`,
        REMOVE_ITEM: `http://localhost:7000/user/${userId}/cart/remove`,
        UPDATE_ITEM: `http://localhost:7000/user/${userId}/cart/update`,
        ADD_ITEM_TO_WISHLIST: `http://localhost:7000/user/${userId}/wishlist`,
        REMOVE_ITEM_FROM_WISHLIST: `http://localhost:7000/user/${userId}/wishlist/remove`
    }
}


const urlList = getUserUrls('60923c9d2907b96c1cd8105f')

export { urlList };