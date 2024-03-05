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


const { Step } = Steps;

const CharacterData = (is_edit=false) => {
    // Значения, которыми мы инициализируем формы при загрузке,
    // подтягивая данные с сервера
    // Затем используется для сохранения предыдущего состояния формы,
    // чтобы отправлять данные той формы, которую обновили и не обращаться ко многим БД
    const [formDataPersonalInit, setFormPersonalInit] = useState<any>({});
    const [formDataMotivateInit, setFormMotivateInit] = useState<any>({});
    const [formDataInsideHeroInit, setFormInsideHeroInit] = useState<any>({});
    const [formDataCompetitionInit, setFormCompetitionInit] = useState<any>({});
    const [formDataIdentifyInit, setFormIdentifyInit] = useState<any>({});
    const [formDataPsychologyInit, setFormPsychologyInit] = useState<any>({});

    const [developmentHeroTextInit, setDevelopmentHeroTextInit] = useState('');
    const [additInfoTextInit, setAdditInfoTextInit] = useState('');
    const [biographyTextInit, setBiographyTextInit] = useState('');


    const [formDataPersonal, setFormPersonal] = useState<any>({});
    const [formDataMotivate, setFormMotivate] = useState<any>({});
    const [formDataInsideHero, setFormInsideHero] = useState<any>({});
    const [formDataCompetition, setFormCompetition] = useState<any>({});
    const [formDataIdentify, setFormIdentify] = useState<any>({});
    const [formDataPsychology, setFormPsychology] = useState<any>({});

    const [developmentHeroText, setDevelopmentHeroText] = useState<string>('');
    const [additInfoText, setAdditInfoText] = useState<string>('');
    const [biographyText, setBiographyText] = useState<string>('');

    const [imgUrl, setImgUrl] = useState<string>('');
    const [imgUrlInit, setImgUrlInit] = useState<string>('');


    // При загрузке страницы выгружаем данные с сервера
    useEffect(() => {
        const url = "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        setImgUrl(url);
        setImgUrlInit(url);

        const initialValues = {
            name: '',
            lastName: '',
            middleName: '',
            dob: '',
            town: '',
        };
        setFormPersonalInit(initialValues);

        setFormMotivateInit({
            'for-what': '',
            goal: '',
            philosophy: '',
        })

        setFormInsideHeroInit({
            'personal-traits': '',
            character: '',
            'strengths-weaknesses': '',
        });

        setFormCompetitionInit({
            profession: '',
            hobby: '',
            talents: '',
            'mind-info': '',
            'sport-info': '',
        });

        setFormIdentifyInit({
            appearance: '',
            style: '',
            complexs: '',
            speech: ''
        });

        setFormPsychologyInit({
            character: '',
            'inside-conflict': ''
        });

        setDevelopmentHeroTextInit('');
        setAdditInfoTextInit('');
        setBiographyTextInit('')


        // Так как выше это инициализация начального (прошлого состояния), которое
        // применяется лишь при сравнении сохранения, а не заполнении форму
        // необходимо заполнить значения, которые отвечают за форму
        setFormPersonal(formDataPersonalInit);
        setFormMotivate(formDataMotivateInit);
        setFormInsideHero(formDataInsideHeroInit);
        setFormCompetition(formDataCompetitionInit);
        setFormIdentify(formDataIdentifyInit);
        setFormPsychology(formDataPsychologyInit);

        setDevelopmentHeroText(developmentHeroTextInit);
        setAdditInfoText(additInfoTextInit);
        setBiographyText(biographyTextInit);

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

    const isEqual = (obj1: Record<string, any>, obj2: Record<string, any>): boolean => {
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

    const handleSaveSettingHero = () => {
        // if (!is_edit) {
        //
        // }
        console.log('Save');
        if (imgUrl !== imgUrlInit){
            // send data
            setImgUrlInit(imgUrl);
        }
        console.log(formDataPersonal);
        if (!isEqual(formDataPersonal, formDataPersonalInit)) {
            // saveFormData(formData1);
            setFormPersonalInit(formDataPersonal);
        }
        console.log(formDataMotivate);
        if (!isEqual(formDataMotivate, formDataMotivateInit)) {
            // saveFormData(formData1);
            setFormMotivateInit(formDataMotivate);
        }
        console.log(formDataInsideHero);
        if (!isEqual(formDataInsideHero, formDataInsideHeroInit)) {
            // saveFormData(formData1);
            setFormInsideHeroInit(formDataInsideHero);
        }
        console.log(formDataCompetition);
        if (!isEqual(formDataCompetition, formDataCompetitionInit)) {
            // saveFormData(formData1);
            setFormCompetitionInit(formDataCompetition);
        }
        console.log(formDataIdentify);
        if (!isEqual(formDataIdentify, formDataIdentifyInit)) {
            // saveFormData(formData1);
            setFormIdentifyInit(formDataIdentify);
        }
        console.log(formDataPsychology);
        if (!isEqual(formDataPsychology, formDataPsychologyInit)) {
            // saveFormData(formData1);
            setFormPsychologyInit(formDataPsychology);
        }
        console.log(developmentHeroText);
        if (developmentHeroText !== developmentHeroTextInit) {
            // saveFormData(formData1);
            setDevelopmentHeroTextInit(developmentHeroText);
        }
        console.log(additInfoText);
        if (additInfoText !== additInfoTextInit) {
            // saveFormData(formData1);
            setAdditInfoTextInit(additInfoText);
        }
        console.log(biographyText);
        if (biographyText !== biographyTextInit) {
            // saveFormData(formData1);
            setBiographyTextInit(biographyText);
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
                                        <PersonalCharacterData formData={formDataPersonal} setFormData={setFormPersonal} />
                                    )}
                                    {currentRequiredF === 1 && (
                                        <MotivationCharacterData formData={formDataMotivate} setFormData={setFormMotivate} />
                                    )}
                                    {currentRequiredF === 2 && (
                                        <InsideCharacterData formData={formDataInsideHero} setFormData={setFormInsideHero} />
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
                                <TextArea rows={6} />
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
