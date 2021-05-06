const getUserUrls = (userId) => {
    return {
        ADD_ITEM: `https://nvidia-ecommerce.herokuapp.com/user/${userId}/cart/`,
        REMOVE_ITEM: `https://nvidia-ecommerce.herokuapp.com/user/${userId}/cart/remove`,
        UPDATE_ITEM: `https://nvidia-ecommerce.herokuapp.com/user/${userId}/cart/update`,
        ADD_ITEM_TO_WISHLIST: `https://nvidia-ecommerce.herokuapp.com/user/${userId}/wishlist`,
        REMOVE_ITEM_FROM_WISHLIST: `https://nvidia-ecommerce.herokuapp.com/user/${userId}/wishlist/remove`
    }
}


const urlList = getUserUrls('60923c9d2907b96c1cd8105f')

export { urlList };