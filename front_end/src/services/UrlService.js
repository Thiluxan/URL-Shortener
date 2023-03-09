import axios from "axios";

const API_URL = "https://ffrbaoyedk.execute-api.us-east-1.amazonaws.com/dev/urls"

const getTrimmedUrl = (longUrl) => {
    return axios.post(API_URL, {"longUrl":longUrl}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export default {getTrimmedUrl}