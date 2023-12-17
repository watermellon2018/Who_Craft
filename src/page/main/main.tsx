import React from 'react';

import './main.css'

export const MainPage = () => {
    return (
        <div className="min-h-screen flex bg-gray-900 text-white">
            <div className="flex-1 flex flex-col p-8 space-y-6">
                <div className="flex items-center space-x-4">
                    <img src="https://placehold.co/50x50" alt="Logo placeholder" className="w-12 h-12"/>
                    <span className="text-2xl font-bold">Ultra Modern UI</span>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-search text-yellow-500"></i>
                        <span>Search</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-home text-yellow-500"></i>
                        <span>Dashboard</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-envelope text-yellow-500"></i>
                        <span>Inbox</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-chart-pie text-yellow-500"></i>
                        <span>Analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-cog text-yellow-500"></i>
                        <span>Settings</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-folder text-yellow-500"></i>
                            <span>Projects</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-star text-yellow-500"></i>
                            <span>Favorites</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-sign-out-alt text-yellow-500"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col p-8 space-y-6 bg-black bg-opacity-25">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src="https://placehold.co/100x100" alt="Profile image placeholder" className="w-24 h-24 rounded-full"/>
                        <div>
                            <h1 className="text-3xl font-bold">Contact Detail Template Title</h1>
                            <p className="text-yellow-500">Subtitle goes here</p>
                        </div>
                    </div>
                    <i className="fas fa-ellipsis-h text-yellow-500 text-2xl"></i>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-map-marker-alt text-yellow-500"></i>
                                <span>Location</span>
                            </div>
                            <span className="text-yellow-500">Edit</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-phone-alt text-yellow-500"></i>
                                <span>Call</span>
                            </div>
                            <span className="text-yellow-500">Edit</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-envelope text-yellow-500"></i>
                                <span>Message</span>
                            </div>
                            <span className="text-yellow-500">Edit</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-globe text-yellow-500"></i>
                                <span>Website</span>
                            </div>
                            <span className="text-yellow-500">Edit</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">© 2021 All rights reserved</span>
                        <i className="fas fa-chevron-up text-yellow-500"></i>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col p-8 space-y-6 bg-yellow-500">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src="https://placehold.co/100x100" alt="Profile image placeholder" className="w-24 h-24 rounded-full"/>
                        <div>
                            <h1 className="text-3xl font-bold">Margaret Phelps</h1>
                            <p className="text-gray-900">6252 Preston Rd. Inglewood, Maine 98380</p>
                        </div>
                    </div>
                    <i className="fas fa-ellipsis-h text-gray-900 text-2xl"></i>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-black bg-opacity-25 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-map-marker-alt text-gray-900"></i>
                                <span>Location</span>
                            </div>
                            <span className="text-gray-900">Edit</span>
                        </div>
                        <div className="flex items-center justify-between bg-black bg-opacity-25 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-phone-alt text-gray-900"></i>
                                <span>Call</span>
                            </div>
                            <span className="text-gray-900">Edit</span>
                        </div>
                        <div className="flex items-center justify-between bg-black bg-opacity-25 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-envelope text-gray-900"></i>
                                <span>Message</span>
                            </div>
                            <span className="text-gray-900">Edit</span>
                        </div>
                        <div className="flex items-center justify-between bg-black bg-opacity-25 p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-globe text-gray-900"></i>
                                <span>Website</span>
                            </div>
                            <span className="text-gray-900">Edit</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">© 2021 All rights reserved</span>
                        <i className="fas fa-chevron-up text-gray-900"></i>
                    </div>
                </div>
            </div>
        </div>
);
}
export default MainPage;
// ReactDOM.render(<App />, document.getElementById('app'));
