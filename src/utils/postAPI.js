import axios from "axios";

const postAPI = async (url, payload) => {
  console.log({ url, payload });
  try {
    const { data, status } = await axios.post(url, payload);
    return { data, status };
  } catch (error) {
    console.error(error.response);
    const { data, status } = error.response;
    return { data, status };
  }
};

export { postAPI };
