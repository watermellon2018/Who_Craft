import React, {useEffect, useState} from 'react';
import {Card, Steps, Row, Col, Image, Button, Divider} from 'antd';
import HeaderComponent from "../../../main/header";
import './style.css'
import PersonalCharacterData from "./personalInfo";
import {
    AndroidOutlined,
    LinkedinOutlined,
    TwitterOutlined
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import MotivationCharacterData from "./motivation";
import InsideCharacterData from "./personal";
import CompetionsCharacterData from "./competations";
import IdentifyCharacterData from "./identity";
import PsychologyCharacterData from "./psychologyData";
import {create_new_hero} from "../../../../api/characters/basic";
import {useLocation} from "react-router-dom";
import {
    CompetitionI,
    IdentifyI,
    InsideI,
    MotivateI,
    PersonalDataI,
    PsyhoI, SettingHero
} from "../../../../api/characters/interfaceHero";


const { Step } = Steps;
interface LocationState {
    is_edit?: boolean;
    project_id?: number;
}
const CharacterData = () => {

    const location = useLocation();
    const { is_edit, project_id } = location.state as LocationState || {};
    console.log(is_edit, project_id);

    // const is_edit = location.state?.is_edit;
    // const project_id = location.state?.project_id;

    // Значения, которыми мы инициализируем формы при загрузке,
    // подтягивая данные с сервера
    // Затем используется для сохранения предыдущего состояния формы,
    // чтобы отправлять данные той формы, которую обновили и не обращаться ко многим БД
    const [formDataPersonalInit, setFormPersonalInit] = useState<PersonalDataI>();
    const [formDataMotivateInit, setFormMotivateInit] = useState<MotivateI>();
    const [formDataInsideHeroInit, setFormInsideHeroInit] = useState<InsideI>();
    const [formDataCompetitionInit, setFormCompetitionInit] = useState<CompetitionI>();
    const [formDataIdentifyInit, setFormIdentifyInit] = useState<IdentifyI>();
    const [formDataPsychologyInit, setFormPsychologyInit] = useState<PsyhoI>();

    const [developmentHeroTextInit, setDevelopmentHeroTextInit] = useState<string>('');
    const [additInfoTextInit, setAdditInfoTextInit] = useState<string>('');
    const [biographyTextInit, setBiographyTextInit] = useState<string>('');
    const [relationshipTextInit, setRelationshipTextInit] = useState<string>('');


    const [formDataPersonal, setFormPersonal] = useState<PersonalDataI>();
    const [formDataMotivate, setFormMotivate] = useState<MotivateI>();
    const [formDataInsideHero, setFormInsideHero] = useState<InsideI>();
    const [formDataCompetition, setFormCompetition] = useState<CompetitionI>();
    const [formDataIdentify, setFormIdentify] = useState<IdentifyI>();
    const [formDataPsychology, setFormPsychology] = useState<PsyhoI>();

    const [developmentHeroText, setDevelopmentHeroText] = useState<string>('');
    const [additInfoText, setAdditInfoText] = useState<string>('');
    const [biographyText, setBiographyText] = useState<string>('');
    const [relationshipText, setRelationshipText] = useState<string>('');


    const [imgUrl, setImgUrl] = useState<string>('');
    const [imgUrlInit, setImgUrlInit] = useState<string>('');


    // При загрузке страницы выгружаем данные с сервера
    useEffect(() => {
        const url = "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        setImgUrl(url);
        setImgUrlInit(url);

        const data1 = {
            name: '',
            lastName: '',
            middleName: '',
            dob: '',
            town: '',
        };
        setFormPersonalInit(data1);

        const data2 = {
            forWhat: '',
            goal: '',
            philosophy: '',
        }
        setFormMotivateInit(data2)

        const data3 = {
            personalTraits: '',
            character: '',
            strengthsWeaknesses: '',
        }
        setFormInsideHeroInit(data3);

        const data4 = {
            profession: '',
            hobby: '',
            talents: '',
            mindInfo: '',
            sportInfo: '',
        }
        setFormCompetitionInit(data4);

        const data5 = {
            appearance: '',
            style: '',
            complexs: '',
            speech: ''
        }
        setFormIdentifyInit(data5);

        const data6 = {
            character: '',
            insideConflict: ''
        }
        setFormPsychologyInit(data6);

        const dev = ''
        const addit = ''
        const bio = ''
        const rel = ''
        setDevelopmentHeroTextInit(dev);
        setAdditInfoTextInit(addit);
        setBiographyTextInit(bio);
        setRelationshipText(rel);



        // Так как выше это инициализация начального (прошлого состояния), которое
        // применяется лишь при сравнении сохранения, а не заполнении форму
        // необходимо заполнить значения, которые отвечают за форму
        setFormPersonal(data1);
        setFormMotivate(data2);
        setFormInsideHero(data3);
        setFormCompetition(data4);
        setFormIdentify(data5);
        setFormPsychology(data6);

        setDevelopmentHeroText(dev);
        setAdditInfoText(addit);
        setBiographyText(bio);
        setRelationshipText(rel);

    }, [])





    const [currentRequiredF, setCurrentRequiredF] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(0);

    const handleNextStepRequiredF = () => {
        setCurrentRequiredF(currentRequiredF + 1);
    };
    const handlePrevStepRequiredF = () => {
        setCurrentRequiredF(currentRequiredF - 1);
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const isEqual = (obj1: any, obj2: any): boolean => {
        // Сравниваем количество ключей у объектов
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Сравниваем значения свойств объектов
        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }

    const createCreateNewHero = async (project_id: number) => {
        try {
            const data: SettingHero = {
                image: imgUrl,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                personal: formDataPersonal!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                motivate: formDataMotivate!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                insideHero: formDataInsideHero!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                competition: formDataCompetition!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                identify: formDataIdentify!,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                psyho: formDataPsychology!,
                development: developmentHeroText,
                additInfo: additInfoText,
                bio: biographyText,
                relationship: relationshipText,
            }
            const response = await create_new_hero(data, project_id);
            if(response.status == 200){
                // openNotificationWithIcon('Герой успешно создался!',
                //     'Ура!',
                //     'success');
                // localStorage.setItem('curProject', JSON.stringify(data));
                // navigate(PathConstants.PROJECTS);
            }
        } catch (error) {
            console.error('Ошибка при получении списка жанров:', error);
        }
    }

    const handleSaveSettingHero = () => {
        if (!is_edit) {
            if(project_id !== undefined){
                createCreateNewHero(project_id);
            }
        }
        console.log('Save');
        if (imgUrl !== imgUrlInit){
            // send data
            setImgUrlInit(imgUrl);
        }
        if (!isEqual(formDataPersonal, formDataPersonalInit)) {
            // saveFormData(formData1);
            setFormPersonalInit(formDataPersonal);
        }
        if (!isEqual(formDataMotivate, formDataMotivateInit)) {
            // saveFormData(formData1);
            setFormMotivateInit(formDataMotivate);
        }
        if (!isEqual(formDataInsideHero, formDataInsideHeroInit)) {
            // saveFormData(formData1);
            setFormInsideHeroInit(formDataInsideHero);
        }
        if (!isEqual(formDataCompetition, formDataCompetitionInit)) {
            // saveFormData(formData1);
            setFormCompetitionInit(formDataCompetition);
        }
        if (!isEqual(formDataIdentify, formDataIdentifyInit)) {
            // saveFormData(formData1);
            setFormIdentifyInit(formDataIdentify);
        }
        if (!isEqual(formDataPsychology, formDataPsychologyInit)) {
            // saveFormData(formData1);
            setFormPsychologyInit(formDataPsychology);
        }
        if (developmentHeroText !== developmentHeroTextInit) {
            // saveFormData(formData1);
            setDevelopmentHeroTextInit(developmentHeroText);
        }
        if (additInfoText !== additInfoTextInit) {
            // saveFormData(formData1);
            setAdditInfoTextInit(additInfoText);
        }
        if (biographyText !== biographyTextInit) {
            // saveFormData(formData1);
            setBiographyTextInit(biographyText);
        }
        if (relationshipText !== relationshipTextInit) {
            // saveFormData(formData1);
            setRelationshipTextInit(relationshipText);
        }
    }


    return (
        <>
            <HeaderComponent />


            <div className="p-4 bg-gray-800 min-h-screen text-white">
                <h1 className="text-3xl font-bold mb-4">Настройки информации о персонаже</h1>
                <Divider style={{ borderColor: 'rgba(250, 176, 5, 0.6)'}} />
                <Row gutter={[16, 16]}>
                    <Col style={{marginRight: '5px'}} span={7}>
                        <Image
                            src={imgUrl}
                            style={{width: '100%'}}
                        />
                    </Col>

                    <Col span={8}>
                        <h1 className="text-2xl font-bold mb-4">Личные данные</h1>
                        <Card className="card-form">
                            <div className="flex">
                                <Steps size="small" direction="vertical" current={currentRequiredF}>
                                    <Step icon={<AndroidOutlined />} />
                                    <Step icon={<TwitterOutlined />} />
                                    <Step icon={<LinkedinOutlined />} />
                                </Steps>
                                <div className="form-data-character">
                                    {currentRequiredF === 0 && (
                                        <PersonalCharacterData formData={formDataPersonal}
                                                               setFormData={setFormPersonal} />
                                    )}
                                    {currentRequiredF === 1 && (
                                        <MotivationCharacterData formData={formDataMotivate}
                                                                 setFormData={setFormMotivate} />
                                    )}
                                    {currentRequiredF === 2 && (
                                        <InsideCharacterData formData={formDataInsideHero}
                                                             setFormData={setFormInsideHero} />
                                    )}
                                </div>
                            </div>
                        </Card>

                        <div className="control-steps-div flex justify-end mt-3">
                            {currentRequiredF > 0 && (
                                <Button className="min-w-100" style={{ marginRight: '8px' }} onClick={handlePrevStepRequiredF}>
                                    Назад
                                </Button>
                            )}
                            {currentRequiredF < 2 && (
                                <Button className="min-w-100" onClick={handleNextStepRequiredF}>
                                    Дальше
                                </Button>
                            )}
                        </div>
                        <div className='relationship-info-card'>

                            <h1 className="text-2xl font-bold mb-4">Отношения с другими героями</h1>
                            <Card className="card-form ">
                                <TextArea
                                    value={relationshipText}
                                    onChange={(e) => setRelationshipText(e.target.value)}
                                    rows={6}
                                />
                            </Card>
                        </div>

                    </Col>

                    <Col>
                        <h1 className="text-2xl font-bold mb-4">Биография персонажа</h1>
                        <Card className="card-form biography-card" style={{height: '500px'}}>
                            <TextArea
                                value={biographyText}
                                onChange={(e) => setBiographyText(e.target.value)}
                                name='biography-hero'
                                placeholder='Напишите информацию о жизни персонажа'
                                style={{height: '100%'}} />
                        </Card>
                    </Col>

                </Row>


                <Row>
                    <Col span={10}>
                        <h1 className="text-2xl font-bold mb-4">Особенности</h1>
                        <Card className="card-form competitions">
                            <div className="flex">
                                <Steps size="small" direction="vertical" current={currentStep}>
                                    <Step icon={<AndroidOutlined />} />
                                    <Step icon={<TwitterOutlined />} />
                                    <Step icon={<LinkedinOutlined />} />
                                </Steps>
                                <div className="form-data-character">
                                    {currentStep === 0 && (
                                        <CompetionsCharacterData
                                            formData={formDataCompetition}
                                            setFormData={setFormCompetition}
                                        />
                                    )}
                                    {currentStep === 1 && (
                                        <IdentifyCharacterData
                                            formData={formDataIdentify}
                                            setFormData={setFormIdentify}
                                        />
                                    )}
                                    {currentStep === 2 && (
                                        <PsychologyCharacterData
                                            formData={formDataPsychology}
                                            setFormData={setFormPsychology}
                                        />
                                    )}
                                </div>
                            </div>

                        </Card>

                        <div className="control-steps-div flex justify-end mt-3">
                            {currentStep > 0 && (
                                <Button className="min-w-100"
                                        style={{ marginRight: '8px' }}
                                        onClick={handlePrevStep}>
                                    Назад
                                </Button>
                            )}
                            {currentStep < 2 && (
                                <Button className="min-w-100" onClick={handleNextStep}>
                                    Дальше
                                </Button>
                            )}
                        </div>
                    </Col>

                    <Col span={8}>
                        <h1 className="text-2xl font-bold mb-4">Развитие персонажа</h1>
                        <Card className="card-form biography-card" style={{height: '500px'}}>
                            <TextArea
                                value={developmentHeroText}
                                onChange={(e) => setDevelopmentHeroText(e.target.value)}
                                name='development-hero'
                                placeholder='Напишите информацию персонаже по мере развития развития истории'
                                style={{height: '100%'}} />
                        </Card>
                    </Col>

                    <Col>
                        <div className='additional-info-card'>
                            <h1 className="text-2xl font-bold mb-4">Дополнительная информация</h1>

                            <Card className="card-form ">
                                <TextArea
                                    value={additInfoText}
                                    onChange={(e) => setAdditInfoText(e.target.value)}
                                    rows={16} />
                            </Card>
                        </div>



                        <div className="justify-end flex mt-3">
                            <Button className="min-w-150" type="primary" onClick={handleSaveSettingHero}>
                                Сохранить настройки
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default CharacterData;
