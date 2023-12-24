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
        const res = await axios.post(`${backendUrl}api/register/`, body, config);
        return res.data;
    } catch (err: any) {
        throw err.response.data;
    }
}

export {register}

