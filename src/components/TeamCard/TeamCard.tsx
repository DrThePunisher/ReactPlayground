import './TeamCard.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Team, TeamShape } from '../../entities/Team';


interface Props {
    team: Team;
    onClick?: (teamId: number) => void;
}

const TeamCard: React.SFC<Props> = (props) => {
    const onClick = () => {
        if (props.onClick) {
            props.onClick(props.team.id);
        }
    };

    return (
        <div
            className="TeamCard"
            onClick={onClick}
        >
            <div className="TeamCard-name">
                {props.team.name}
            </div>
        </div>
    );
};

TeamCard.propTypes = {
    team: TeamShape.isRequired,
    onClick: PropTypes.func,
};

export { TeamCard };
