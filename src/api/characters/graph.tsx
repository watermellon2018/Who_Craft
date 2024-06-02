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

interface EdgeI {
    label: string;
    from: string;
    to: string;
}
async function add_edge_graph(edge: EdgeI, projectId: number): Promise<any> {
    const token = localStorage.getItem('userId');
    try {
        return await axios.post(`${backendUrl}/api/projects/hero/graph/add/`, {
            data: {
                label: edge.label,
                from: edge.from,
                to: edge.to,
                token_user: token,
                projectId: projectId,
            }
        });
    }catch (error){
        console.error('Error select all type of the relationship for project:', error);
    }
}


async function select_edge_graph(projectId: number): Promise<any> {
    const token = localStorage.getItem('userId');
    try {
        return await axios.get(`${backendUrl}/api/projects/hero/graph/select/`, {
            params: {
                token_user: token,
                projectId: projectId,
            }
        });
    }catch (error){
        console.error('Error select all type of the relationship for project:', error);
    }
}

async function delete_edge_graph_api(edge: EdgeI, projectId: number): Promise<any> {
    const token = localStorage.getItem('userId');
    try {
        return await axios.get(`${backendUrl}/api/projects/hero/graph/delete/`, {
            params: {
                token_user: token,
                projectId: projectId,
                from: edge.from,
                to: edge.to,
            }
        });
    }catch (error){
        console.error('Error select all type of the relationship for project:', error);
    }
}

export {
    get_all_type_relationship,
    add_edge_graph,
    select_edge_graph,
    delete_edge_graph_api
}