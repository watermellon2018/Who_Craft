import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

async function register(values: any): Promise<any> {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify(values);

    try {
        const res = await axios.post(`${backendUrl}api/auth/register/`, body, config);
        const userId = res.data.token;
        console.log(userId)
        localStorage.setItem('userId', userId);

        return res;
    } catch (err: any) {
        throw err.response.data;
    }
}

export {register}

