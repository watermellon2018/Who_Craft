import React, {useState} from "react";
import {Tag} from "antd";

const audienceOptions = ['Дети', 'Подростки', 'Молодежь', 'Взрослые', 'Пожилые люди'];
const allAudienceOption = 'Все';

interface AudienceI {
    selectedAudience: string[];
    setSelectedAudience: React.Dispatch<React.SetStateAction<string[]>>;
}
const AudienceSelect: React.FC<AudienceI> = ({ selectedAudience, setSelectedAudience }) => {


    const handleAudienceClick = (audience: string) => {
        if (audience === allAudienceOption) {
            setSelectedAudience(selectedAudience.length === audienceOptions.length ? [] : audienceOptions);
        } else {
            setSelectedAudience((prevSelectedAudience) => {
                if (prevSelectedAudience.includes(audience)) {
                    return prevSelectedAudience.filter((item) => item !== audience);
                } else {
                    return [...prevSelectedAudience, audience];
                }
            });
        }
    };



    return (
        <div>
            <Tag.CheckableTag
                checked={selectedAudience.length === audienceOptions.length}
                onChange={() => handleAudienceClick(allAudienceOption)}
            >
                {allAudienceOption}
            </Tag.CheckableTag>
            {audienceOptions.map((audience) => (

                <Tag.CheckableTag
                    key={audience}
                    checked={selectedAudience.includes(audience)}
                    onChange={() => handleAudienceClick(audience)}
                >
                    {audience}
                </Tag.CheckableTag>
            ))}
        </div>
    );
};

export default AudienceSelect;