import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;



async function get_all_type_relationship(): Promise<any> {
    try {
        return await axios.get(`${backendUrl}/api/projects/hero/graph/relation/`, {
            params: {
            }
        });
    }catch (error){
        console.error('Error select all type of the relationship for project:', error);
    }
}


export {
    get_all_type_relationship
}