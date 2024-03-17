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
import ProjectPage from "./page/movie/projectPage/projectPage";
import CharacterData from "./page/movie/characters/setting/CharacterData";
import PathConstants from "./routes/pathConstant";

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
            "primaryShadow": "0 0px 0",
            "transition": "transform 0.3s ease",
            "&:active": {
                "transform": "scale(0.95)",
            },
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
        "Empty": {
            "colorText": "#fab005",
            "colorTextDisabled": "#fab005",
        }
    }
}

function App() {
  return (
      <ConfigProvider
          theme={theme}
      >
          <BrowserRouter>
              <Routes>
                  <Route caseSensitive path={PathConstants.AUTH} element={<LandingPage />} />
                  <Route path={PathConstants.REGISTER}  element={<RegistrationPage />} />
                  <Route path={PathConstants.LOGIN} element={<LoginPage />} />
                  <Route path={PathConstants.HOME} element={<MainPage />} />
                  <Route path={PathConstants.GENERATING}  element={<GenerationHeroPage />} />
                  <Route path={PathConstants.SETTING_HERO}  element={<CharacterData />} />
                  <Route path={PathConstants.PROFILE}  element={<ProfilePage />} />
                  <Route path={PathConstants.CREATE_PROJECT}  element={<ProjectCreatePage />} />
                  <Route path={PathConstants.PROJECTS}  element={<ProjectListPage />} />
                  <Route path={PathConstants.PROJECT_PAGE}  element={<ProjectPage />} />
              </Routes>
          </BrowserRouter>
      </ConfigProvider>
  );
}

export default App;
