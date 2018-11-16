import './PlayerPage.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Redirect } from 'react-router';

import { PlayerApi } from '../../apis/PlayerApi';
import { PlayerContainer } from '../../components/PlayerContainer/PlayerContainer';
import { Player } from '../../entities/Player';

interface Props {
    playerId: number;
    playerApi: PlayerApi;
}

const PlayerPage: React.SFC<Props> = (props) => {
    return (
        <PlayerContainer
            playerIds={[props.playerId]}
            playerApi={props.playerApi}
            render={
                (players: Player[]) => {
                    if (players.length === 1) {
                        return (
                            <div className="PlayerPage">
                                <div className="PlayerPage-name">{players[0].firstName}</div>
                            </div>
                        );
                    }
                    return (
                        <Redirect to="/404"/>
                    );
                }}
        />
    );
};

PlayerPage.propTypes = {
    playerId: PropTypes.number.isRequired,
    playerApi: PropTypes.object.isRequired,
};

export { PlayerPage };