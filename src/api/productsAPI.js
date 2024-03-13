import axios from "axios";

const productApi = axios.create({
    baseURL: "http://localhost:3001"
})

const getProducts = async () => {
    const res = await productApi.get("/products")
    console.log(res)
    return res.data
}
const postProducts = async (data) => {
    const res = await productApi.post("/products", data)
    console.log(res)
    return res.data
}

export {getProducts, postProducts}