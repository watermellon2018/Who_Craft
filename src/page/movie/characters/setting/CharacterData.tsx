import React, {useState} from 'react';
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

const CharacterData = () => {
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


    return (
        <>
            <HeaderComponent />



            <div className="p-4 bg-gray-800 min-h-screen text-white">
                <h1 className="text-3xl font-bold mb-4">Настройки информации о персонаже</h1>
                <Divider style={{ borderColor: 'rgba(250, 176, 5, 0.6)'}} />
                <Row gutter={[16, 16]}>
                    <Col style={{marginRight: '5px'}} span={7}>
                        <Image
                            style={{width: '100%'}}
                            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
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
                                        <PersonalCharacterData />
                                    )}
                                    {currentRequiredF === 1 && (
                                        <MotivationCharacterData />
                                    )}
                                    {currentRequiredF === 2 && (
                                        <InsideCharacterData />
                                    )}
                                </div>
                            </div>
                        </Card>

                        <div className="control-steps-div flex justify-end mt-3">
                            {currentStep > 0 && (
                                <Button className="min-w-100" style={{ marginRight: '8px' }} onClick={handlePrevStepRequiredF}>
                                    Назад
                                </Button>
                            )}
                            {currentStep < 2 && (
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
                                        <CompetionsCharacterData />
                                    )}
                                    {currentStep === 1 && (
                                        <IdentifyCharacterData />
                                    )}
                                    {currentStep === 2 && (
                                        <PsychologyCharacterData />
                                    )}
                                </div>
                            </div>

                        </Card>

                        <div className="control-steps-div flex justify-end mt-3">
                            {currentStep > 0 && (
                                <Button className="min-w-100" style={{ marginRight: '8px' }} onClick={handlePrevStep}>
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
                                name='development-hero'
                                placeholder='Напишите информацию персонаже по мере развития развития истории'
                                style={{height: '100%'}} />
                        </Card>
                    </Col>

                    <Col>
                        <div className='additional-info-card'>
                            <h1 className="text-2xl font-bold mb-4">Дополнительная информация</h1>

                            <Card className="card-form ">
                                <TextArea rows={16} />
                            </Card>
                        </div>



                        <div className="justify-end flex mt-3">
                            <Button className="min-w-150" type="primary" onClick={handleNextStep}>
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
