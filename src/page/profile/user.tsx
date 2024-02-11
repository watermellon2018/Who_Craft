import React from 'react';
import {Avatar, Card, Col, Divider, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

import { Typography } from 'antd';
import ExitButton from "../main/exitButton";
import LogoButton from "../main/logo";
import './style.css'
import UserSettings from "./settingUser";
const { Title } = Typography;
const ProfilePage = () => {
    const friend_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']

    const movie_list = ['Куринный побег', "Смешные смайлики", "Тайна безумства", "Кромешная тьма унитаза"]


    return (
        <>
            <div className="mx-auto p-8 shadow-lg bg-[#1B1D22]">

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center w-full">
                        <div className="flex w-full justify-between items-center">
                            <div className="flex items-end">

                                <Avatar className="mr-4" shape="square" size={64} icon={<UserOutlined />} />
                                <div>
                                    <Title
                                        level={3}
                                        className="font-bold">
                                        James Cameron
                                    </Title>
                                </div>
                            </div><div>

                            <div className='flex space-x-3'>
                            <LogoButton />
                            <ExitButton />
                            </div>
                        </div>

                        </div>
                    </div>


                </div>

                <Divider className="custom-divider" orientation='right'>Мои друзья</Divider>

                <Row className="avatar-list" gutter={16} wrap={false}>
                    <Col flex="auto">
                        <div className="avatar-scroll-container">
                            <Row gutter={16} wrap={false}>
                                <Col>
                                    <Avatar.Group className="space-x-3" shape="square">
                                        {friend_list.map((friend, index) => (
                                            <Avatar
                                                key={index}
                                                style={{ backgroundColor: '#fab005' }}>
                                                {friend}</Avatar>
                                        ))}
                                    </Avatar.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Divider style={{backgroundColor: "white", visibility: 'hidden'}} />

                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-5 p-6 w-full w-2/3 flex justify-center items-center"
                          style={{minHeight: "300px"}}
                    >
                        <div className="bg-[#FAB005] rounded-lg h-full w-full text-center
                        flex items-center justify-center text-[#1B1D22] font-bold text-2xl"
                             >Мои сообщения</div>
                        <div className="bg-[#FAB005] rounded-lg h-full w-full text-center
                         flex items-center justify-center text-[#1B1D22] font-bold text-2xl"
                             >Мои подписки</div>
                        {/*История просмотров*/}
                        <div className="bg-[#FAB005] rounded-lg h-full w-full text-center
                        flex items-center justify-center text-[#1B1D22] font-bold text-2xl"
                             >История просотров</div>
                        <div className="bg-[#FAB005] rounded-lg h-full w-full text-center
                        flex items-center justify-center text-[#1B1D22] font-bold text-2xl"
                             >Стастистика</div>
                        <div className="bg-[#FAB005] rounded-lg h-full w-full text-center
                        flex items-center justify-center text-[#1B1D22] font-bold text-2xl"
                             >Рекомендации</div>
                        <div className="bg-[#FAB005] rounded-lg h-full w-full text-center
                        flex items-center justify-center text-[#1B1D22] font-bold text-2xl"
                             >Уроки</div>
                        <div className="bg-[#FAB005] rounded-lg h-full w-full text-center
                        flex items-center justify-center text-[#1B1D22] font-bold text-2xl"
                             >Награды</div>
                    </div>

                <Divider style={{backgroundColor: "white"}} />
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <Card className="mb-6 p-4" style={{color: 'fab005 !important'}}>
                            <h2 className="text-xl font-semibold mb-2">О себе</h2>
                            <p>
                                КОКО- тут о себе, типа я супер крутой, че люблю и бла бла
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
                                pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.
                                Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,
                                in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                                per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut
                                vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.
                                Integer eu nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat
                                faucibus libero, at maximus nisl suscipit posuere. Morbi nec enim nunc.
                                Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis.
                                Cras pharetra mi tristique sapien vestibulum lobortis. Nam eget bibendum metus,
                                non dictum mauris. Nulla at tellus sagittis, viverra est a, bibendum metus.
                            </p>
                        </Card>

                        <Card className="mb-6 p-4">

                            <h2 className="text-xl font-semibold mb-2">Experience</h2>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">Senior Frontend Developer</h3>
                                <p>Company Name - Jan 2019 - Present</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
                                    pulvinar facilisis justo mollis, auctor consequat urna.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Frontend Developer</h3>
                                <p>Company Name - Jan 2015 - Dec 2018</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
                                    pulvinar facilisis justo mollis, auctor consequat urna.
                                </p>
                            </div>
                        </Card>
                    </div>
                    <div>
                        <Card style={{backgroundColor: 'fab005 !important'}} className="mb-6 p-4">
                            <h2 className="text-xl font-semibold mb-2">Любимые жанры</h2>
                            <ul className="list-disc pl-5">
                                {movie_list.map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>

                        </Card>
                        {/*Пользовательские настройки:*/}
                        {/*- данные пользователя и возможность редактирования*/}
                        {/*- настройка уведомлений*/}
                        {/*- язык*/}
                        {/*- настройка приватности (показывать фильм только друзьям и тд)*/}
                        {/*- настройки безопасности*/}
                        {/*- настройка интерфейса*/}

                        <Card style={{backgroundColor: 'fab005 !important'}} className="p-4">
                            <h2 className="text-xl font-semibold mb-2">Чето</h2>

                            <p>
                                B.S. in Computer Science<br/>
                                University Name<br/>
                                2011 - 2015
                            </p>
                        </Card>
                    </div>
                </div>
                <UserSettings />
            </div>
        </>
    );
};

export default ProfilePage;

