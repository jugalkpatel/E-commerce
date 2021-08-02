import axios from "axios";

const postAPI = async (url, info) => {
  console.log({ url, info });
  try {
    const { data, status } = await axios.post(url, info);
    return { data, status };
  } catch (error) {
    console.error(error.response);
    const { data, status } = error.response;
    return { data, status };
  }
};

export { postAPI };
