import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


async function get_all_character_for_project(): Promise<any> {
    try {
        return await axios.get(`${backendUrl}/api/character/select/`, {
            params: {
            }
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}

async function deleteCharacterFromTree(id: string): Promise<any> {
    try {
        return await axios.post(`${backendUrl}/api/character/delete/`, {
            'id': id,
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}

async function createCharacterFromTreeAPI(id: number | string,
                                          name: string,
                                          type: 'leaf' | 'node',
                                          parentId: string|null = null,
)
    : Promise<any> {
    try {
        const token = localStorage.getItem('userId');
        const curProjectStr = localStorage.getItem('curProject');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const projectTitle: any = JSON.parse(curProjectStr!).title;

        return await axios.post(`${backendUrl}/api/character/create/`, {
            'id': id,
            'name': name,
            'type': type,
            'parent': parentId,
            'token_user': token,
            'projectTitle': projectTitle,
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}

async function renameCharacterFromTree(id: string,
                                       name: string
): Promise<any> {
    try {
        return await axios.post(`${backendUrl}/api/character/rename/`, {
            'id': id,
            'name': name,
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}

export {
    get_all_character_for_project,
    deleteCharacterFromTree,
    createCharacterFromTreeAPI,
    renameCharacterFromTree
};
