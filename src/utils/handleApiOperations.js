import { postAPI } from './postAPI';

const handleApiOperations = async (url, postData, callback, action) => {
  const data = await postAPI(url, postData);
  callback({ type: action, payload: data });
};

export { handleApiOperations };

