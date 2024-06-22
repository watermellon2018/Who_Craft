import React from "react";
import {notification} from "antd";

/**
 * Открывает уведомление с указанной иконкой и сообщением.
 * @param {React.ReactNode} desc - Описание уведомления. Это может быть строка или React-элемент.
 * @param {React.ReactNode} [mes="Ошибка в заполнении"] - Сообщение, которое отображается в уведомлении.
 * Это может быть строка или React-элемент. По умолчанию равно "Ошибка в заполнении".
 * @param {'success' | 'info' | 'error' | 'warning'} [type='error'] - Тип уведомления для отображения.
 * Может быть одним из следующих значений: 'success', 'info', 'error' или 'warning'. По умолчанию равно 'error'."
 */

const openNotificationWithIcon = (desc: React.ReactNode,
                                  mes: React.ReactNode = "Ошибка в заполнении",
                                  type: 'success' | 'info' | 'error' | 'warning' ='error') => {
    notification[type]({
        message: mes,
        description: desc,
    });
};

export {
    openNotificationWithIcon
};