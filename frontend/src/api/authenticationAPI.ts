import axiosAPI from "./axiosAPI";

export const managerLogin = async (username: string, password: string) => {
    const response = await axiosAPI.post('/login', { username, password });
    return response.data.token;
}