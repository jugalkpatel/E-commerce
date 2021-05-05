import { postAPI } from "./postAPI"

const handleApiOperations = async (url, postData, callback, action) => {
    console.log(action);
    console.log({ url, postData, callback });
    const data = await postAPI(url, postData);
    console.log("response from server", data);
    callback({ type: action, payload: data });
}

export { handleApiOperations }