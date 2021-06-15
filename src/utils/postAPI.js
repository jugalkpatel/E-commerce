import axios from 'axios';

const postAPI = async (url, info) => {
  try {
    const response = await axios.post(url, info);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error.response.status;
  }
};

export { postAPI };
