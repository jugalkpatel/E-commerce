import axios from 'axios';

const postAPI = async (url, info) => {
  try {
    const response = await axios.post(url, info);
    if (response.status === 201) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }

    return { errorMessage: 'something went wrong' };
  }
};

export { postAPI };
