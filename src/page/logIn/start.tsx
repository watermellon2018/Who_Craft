import React from 'react';
import { Button } from 'antd';
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="bg-[#1B1D22] flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="mb-24">
                        <Link to='/login' className="profile-button" style={{color: 'white'}}>
                            <Button type="primary" size="large" className="mr-12">Войти</Button>
                        </Link>
                        <Link to='/register' className='register-button'>
                            <Button type="default" size="large">Зарегистрироваться</Button>
                        </Link>

                </div>
            </div>
        </div>
    );
};

export default LandingPage;
