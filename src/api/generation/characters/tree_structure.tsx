import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


async function get_all_character_for_project(): Promise<any> {
    try {
        return await axios.get(`${backendUrl}/api/characters/`, {
            params: {
            }
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}

async function deleteCharacterFromTree(id: number): Promise<any> {
    try {
        return await axios.post(`${backendUrl}/api/delete/`, {
                'id': id,
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}

async function createCharacterFromTreeAPI(id: number | string, name: string, type: 'leaf' | 'node', parentId: string|null = null): Promise<any> {
    try {
        return await axios.post(`${backendUrl}/api/create/`, {
            'id': id,
            'name': name,
            'type': type,
            'parent': parentId,
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}


export {get_all_character_for_project, deleteCharacterFromTree, createCharacterFromTreeAPI};
