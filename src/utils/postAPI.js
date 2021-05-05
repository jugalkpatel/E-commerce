import axios from "axios"

const postAPI = async (url, info) => {
    console.log("post is called");
    try {
        const { data } = await axios.post(
            url,
            info
        );
        return data.data.products;
    } catch (error) {
        throw error;
    }
}

export { postAPI };