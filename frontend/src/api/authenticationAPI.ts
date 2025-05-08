import axiosAPI from "./axiosAPI";

export const userLogin = async (username: string, password: string) => {
    const response = await axiosAPI.post('/authentication/login', { username, password });
    return response.data;
}

