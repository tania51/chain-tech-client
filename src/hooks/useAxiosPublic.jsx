import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://chain-tech-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;