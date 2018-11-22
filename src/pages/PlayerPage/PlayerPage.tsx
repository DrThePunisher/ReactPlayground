import './PlayerPage.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Redirect } from 'react-router';

import { PlayerApi, playerApiShape } from '../../apis/PlayerApi';
import { PlayerContainer } from '../../components/PlayerContainer/PlayerContainer';
import { Player } from '../../entities/Player';

interface Props {
    playerId: number;
    playerApi: PlayerApi;
}

const PlayerPage: React.SFC<Props> = (props) => {
    const playerName = (player: Player): string => {
        if (player.nickName) {
            return `${player.firstName} "${player.nickName}" ${player.lastName}`;
        }
        return `${player.firstName} ${player.lastName}`;
    };

    return (
        <PlayerContainer
            playerIds={[props.playerId]}
            playerApi={props.playerApi}
            render={
                (players: Player[]) => {
                    if (players.length === 1) {
                        const player = players[0];
                        return (
                            <div className="PlayerPage">
                                <div className="PlayerPage-name">
                                    {playerName(player)}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <Redirect to="/404" />
                    );
                }}
        />
    );
};

PlayerPage.propTypes = {
    playerId: PropTypes.number.isRequired,
    playerApi: playerApiShape.isRequired,
};

export { PlayerPage };