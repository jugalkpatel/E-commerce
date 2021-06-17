const getUserUrls = (userId) => {
  const ROOT_URL = 'https://neog-ecommerce--backend.herokuapp.com/user';
  // const TEST_URL = 'http://localhost:7000/user';
  return {
    ADD_ITEM: `${ROOT_URL}/${userId}/cart`,
    GET_CART: `${ROOT_URL}/${userId}/cart`,
    GET_WISHLIST: `${ROOT_URL}/${userId}/wishlist`,
    REMOVE_ITEM: `${ROOT_URL}/${userId}/cart/remove`,
    UPDATE_ITEM: `${ROOT_URL}/${userId}/cart/update`,
    ADD_ITEM_TO_WISHLIST: `${ROOT_URL}/${userId}/wishlist`,
    REMOVE_ITEM_FROM_WISHLIST: `${ROOT_URL}/${userId}/wishlist/remove`,
  };
};

let urlList = {};

const prepareUrls = (userId) => {
  urlList = getUserUrls(userId);
};

export { urlList, getUserUrls, prepareUrls };
