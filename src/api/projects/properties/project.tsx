import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface ProjectI {
    genre: string[];
    format: string;
    title: string;
    desc: string;
    annot: string;
    audience: string[];
    image: any;
}

async function create_new_project(data: ProjectI): Promise<any> {
    try {
        return await axios.post(`${backendUrl}/api/projects/create/`, {
            data: {
                ...data
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error creating project:', error);
    }

}

async function get_all_list_projects(): Promise<any> {
    try {
        return await axios.get(`${backendUrl}/api/projects/get-list-projects/`, {
        });
    } catch (error) {
        console.error('Error creating project:', error);
    }

}

export { create_new_project,
    get_all_list_projects}