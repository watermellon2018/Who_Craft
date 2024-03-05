import axios from 'axios';
import {SettingHero} from "./interfaceHero";

const backendUrl = process.env.REACT_APP_BACKEND_URL;


async function create_new_hero(data: SettingHero, project_id: number): Promise<any> {
    try {

        return await axios.post(`${backendUrl}/api/projects/hero/create/`, {
            data: {
                projectId: project_id,
                image: data.image,
                name: data.personal.name,
                lastName: data.personal.lastName,
                middleName: data.personal.middleName,
                dob: data.personal.dob,
                town: data.personal.town,

                forWhat: data.motivate.forWhat,
                goal: data.motivate.goal,
                philosophy: data.motivate.philosophy,
                develop: data.development,

                personalTraits: data.insideHero.personalTraits,
                strengthsWeaknesses: data.insideHero.strengthsWeaknesses,
                character: data.insideHero.character,
                complexes: data.identify.complexs,
                insideConflict: data.psyho.insideConflict,
                style: data.identify.style,

                biography: data.bio,
                relationship: data.relationship,

                profession: data.competition.profession,
                hobby: data.competition.hobby,

                talents: data.competition.talents,
                mindInfo: data.competition.mindInfo,
                sportInfo: data.competition.sportInfo,
                appearance: data.identify.appearance,
                speech: data.identify.speech,

                additInfo: data.additInfo,

            }
        });
    } catch (error) {
        console.error('Error generating image to image:', error);
    }

}

export { create_new_hero }