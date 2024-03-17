interface PersonalDataI {
    type: 'main' | 'seconder' | 'episode';
    name: string;
    lastName: string;
    middleName: string;
    dob: string;
    town: string;
}

interface MotivateI {
    forWhat: string;
    goal: string;
    philosophy: string;
}

interface InsideI {
    'personalTraits': string;
    character: string;
    'strengthsWeaknesses': string;
}

interface CompetitionI {
    profession: string;
    hobby: string;
    talents: string;
    'mindInfo': string;
    'sportInfo': string;
}

interface IdentifyI {
    appearance: string;
    style: string;
    complexs: string;
    speech: string;
}

interface PsyhoI {
    character: string;
    insideConflict: string;
}

interface SettingHero {
    'image': string;
    'personal': PersonalDataI;
    'motivate': MotivateI;
    'insideHero': InsideI,
    'competition': CompetitionI;
    'identify': IdentifyI,
    'psyho': PsyhoI,
    'development': string;
    'additInfo': string;
    'bio': string;
    'relationship': string;
}

export type {SettingHero,
    PsyhoI,
    IdentifyI,
    InsideI,
    MotivateI,
    PersonalDataI,
    CompetitionI
}