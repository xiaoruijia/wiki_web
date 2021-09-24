import axios from "axios"
//远程Url用第一个，第二个解决开发的跨域问题
export const baseUrl = "localhost:8000"

let URL = baseUrl
export const categoryApi = () => {
    return axios.post(URL + "api.php/wiki/index/category")
}

export const classApi = (id: string) => {
    return axios.post(URL + "api.php/wiki/index/class", {
        id
    })
}

export const articleApi = (id: string) => {
    return axios.post(URL + "api.php/wiki/index/article", {
        id
    })
}

