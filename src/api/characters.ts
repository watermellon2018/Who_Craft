import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface FormData {
    gender: string;
    min?: number | undefined;
    max?: number | undefined;
    eyes?: string | undefined;
    hair?: string | undefined;
    body?: string | undefined;
    appearance?: string | undefined;
    character?: string | undefined;
}
async function generateImageAPI(formData: FormData): Promise<any> {
    try {
        return await axios.get(`${backendUrl}generate_image/`, {
            params: {
                gender: formData.gender,
                minAge: formData.min,
                maxAge: formData.max,
                eyes: formData.eyes,
                hair: formData.hair,
                body: formData.body,
                appearance: formData.appearance,
                character: formData.character,
            }
        });
    } catch (error) {
        console.error('Error generating image:', error);
    }

}

interface FormDataUndefined {
    description: string | null;
    character: string | null;
}

async function generateImageUndefinedAPI(formData: FormDataUndefined): Promise<any> {
    try {
        return await axios.get('`${backendUrl}generate_image_undefined/', {
            params: {
                description: formData.description,
                character: formData.character,
            }
        });
    } catch (error) {
        console.error('Error generating image:', error);
    }

}

export {generateImageAPI, generateImageUndefinedAPI};