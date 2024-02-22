import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface ProjectI {
    genre: string[];
    format: string;
    title: string;
    desc: string;
    annot: string;
    audience: string[];
    image: File | undefined;
}

async function create_new_project(data: ProjectI): Promise<any> {
    try {
        return await axios.post(`${backendUrl}/api/projects/create/`, {
            data: {
                ...data
            }
        });
    } catch (error) {
        console.error('Error creating project:', error);
    }

}

export { create_new_project }