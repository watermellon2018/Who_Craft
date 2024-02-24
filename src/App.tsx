import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GenerationHeroPage from "./page/creation/hero/generation";

import { ConfigProvider } from 'antd';
import MainPage from "./page/main";
import LandingPage from "./page/logIn/start";
import RegistrationPage from "./page/logIn/register";
import LoginPage from "./page/logIn/login";
import ProfilePage from "./page/profile/user";
import ProjectCreatePage from "./page/creation/projects/newProjectPage";
import ProjectListPage from "./page/movie/library/own/list";

// https://ant.design/theme-editor#component-color настройка цветов
const theme = {
    "token": {
        "colorPrimary": "#fab005",
        "colorInfo": "#fab005",
        "colorBgBase": "#1b1d22",
        "colorTextBase": "#ffffff",
        "fontSize": 16,
        "sizeStep": 3,
        "sizeUnit": 3,
        "borderRadius": 3,
        "wireframe": false,
        "backgroundColor": '#1b1d22',
        "background": '#1b1d22',
        "algorithm": true,
    },
    "components": {
        "Button": {
            "defaultBorderColor": "rgb(250, 176, 5)",
            "colorPrimaryBorder": "rgb(27, 29, 34) !important",
            "colorPrimary": "rgb(250, 176, 5) !important",
            "colorError": "rgba(255, 77, 79, 0.57)",
            "colorTextLightSolid": "rgb(27, 29, 34)",
            "colorText": "rgb(250, 176, 5)",
            "defaultColor": "rgb(250, 176, 5)",
            "colorPrimaryHover": "rgb(252, 209, 95)",
            "primaryShadow": "0 0px 0"
        },
        "Input": {
            "colorTextPlaceholder": "rgba(250, 176, 5, 0.55)",
            "colorBorder": "rgb(250, 176, 5)",
            "colorBgContainer": "rgb(27, 29, 34)"
        },
        "Sidebar": {
            "textColor": "#fff",
        },
        "Switch": {
            "colorPrimary": "rgb(27, 29, 34)",
            "colorTextQuaternary": "rgb(27, 29, 34) !important",
            "colorPrimaryHover": "rgb(208, 154, 26)",
            "colorPrimaryBorder": "rgb(27, 29, 34)",
        },
        "InputNumber": {
            "colorTextPlaceholder": "rgb(250, 176, 5, 0.55)",
            "colorBorder": "rgb(250, 176, 5)",
        },
        "Select": {
            "colorTextPlaceholder": "rgb(27, 29, 34)",
            "colorText": "rgb(27, 29, 34)",
            "optionSelectedBg": "rgb(27, 29, 34)",
            "colorBorder": "rgb(27, 29, 34)",
            "colorBgContainer": "rgb(250, 176, 5)",
            "optionSelectedColor": "#fab005",
            "colorBgElevated": "#fab005",
        },
        "Card": {
            "colorBgContainer": "#fab005",
            "colorText": "rgb(27, 29, 34)",
            "colorTextHeading":  "rgb(27, 29, 34)",
        },
        "Tabs": {
            "itemSelectedColor":  "rgb(27, 29, 34)",
            "itemActiveColor":  "rgb(27, 29, 34)",
            "itemColor":  "rgb(27, 29, 34)",
            "itemHoverColor":  "rgba(27, 29, 34, 0.7)",
        },
        "Form": {
            "labelColor": "rgb(27, 29, 34)",
        },
    }
}
function App() {
  return (
      <ConfigProvider
          theme={theme}
      >
          <BrowserRouter>
              <Routes>
                  <Route caseSensitive path="/start" element={<LandingPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<MainPage />} />
                  <Route path="/generating" element={<GenerationHeroPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/create-project" element={<ProjectCreatePage />} />
                  <Route path="/project-list" element={<ProjectListPage />} />
              </Routes>
          </BrowserRouter>
      </ConfigProvider>
  );
}

export default App;
