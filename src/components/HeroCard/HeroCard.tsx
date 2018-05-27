import './HeroCard.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface Hero {
    id: number;
    name: string;
    race: string;
    class: string;
    level: number;
}

export function arbitraryHero(): Hero {
    return {
        id: 0,
        name: '',
        race: '',
        class: '',
        level: 0
    };
}

interface Props {
    name: string;
    race: string;
    class?: string;
    level?: number;
}

const HeroCard: React.SFC<Props> = (props) => {
    return (
        <div className="HeroCard">
            <div className="HeroCard-name">
                {props.name}
            </div>
            <div className="HeroCard-race">
                Race: {props.race}
            </div>
            <div className="HeroCard-class">
                Class: {props.class}
            </div>
            <div className="HeroCard-level">
                Level: {props.level}
            </div>
        </div>
    );
};

HeroCard.propTypes = {
    name: PropTypes.string.isRequired,
    race: PropTypes.string.isRequired,
    class: PropTypes.string,
    level: PropTypes.number
};

export { HeroCard };