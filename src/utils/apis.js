import axios from 'axios';
const KEY = process.env.REACT_APP_GOOGLE_API;
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})