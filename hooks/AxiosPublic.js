import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://career-connect-backend-delta.vercel.app",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
