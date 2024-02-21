import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
async function login(values: any): Promise<any> {
    try {
        const res = await axios.get(`${backendUrl}api/auth/login/`,
            {params: values});
        return res.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export {login}