import './PlayerCard.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Player, PlayerShape } from '../../entities/Player';

interface Props {
    player: Player;
    onClick?: (playerId: number) => void;
}

const PlayerCard: React.SFC<Props> = (props) => {
    const onClick = () => {
        if (props.onClick) {
            props.onClick(props.player.id);
        }
    };

    return (
        <div
            className="PlayerCard"
            onClick={onClick}
        >
            <div className="PlayerCard-firstName">
                {props.player.firstName}
            </div>
        </div>
    );
};

PlayerCard.propTypes = {
    player: PlayerShape.isRequired,
    onClick: PropTypes.func,
};

export { PlayerCard };