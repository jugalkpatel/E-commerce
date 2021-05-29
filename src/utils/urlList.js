const getUserUrls = (userId) => {
  const url = 'https://neog-ecommerce--backend.herokuapp.com/user';
  return {
    ADD_ITEM: `${url}/${userId}/cart/`,
    REMOVE_ITEM: `${url}/${userId}/cart/remove`,
    UPDATE_ITEM: `${url}/${userId}/cart/update`,
    ADD_ITEM_TO_WISHLIST: `${url}/${userId}/wishlist`,
    REMOVE_ITEM_FROM_WISHLIST: `${url}/${userId}/wishlist/remove`,
  };
};

let urlList = '';

const prepareUrls = (userId) => {
  urlList = getUserUrls(userId);
};

export { urlList, getUserUrls, prepareUrls };
