import axios from "axios";

const fetchData=axios.create({
    baseURL:"https://api.themoviedb.org/3",
});



export default fetchData;