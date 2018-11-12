import './MainPage.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { PlayerApi } from '../apis/PlayerApi';
import { PlayerCard } from '../components/PlayerCard/PlayerCard';
import { PlayerContainer } from '../components/PlayerContainer/PlayerContainer';
import { Player } from '../entities/Player';

interface Props {
    playerApi: PlayerApi;
}

const MainPage: React.SFC<Props> = (props) => {
    return (
        <div className="MainPage">
            <div className="MainPage-players">
                <div className="MainPage-players-header">
                    All Players
                </div>
                <div className="MainPage-players-list">
                    <PlayerContainer
                        playerApi={props.playerApi}
                        render={
                            (players: Player[]) => {
                                return players.map((player: Player) => (
                                    <PlayerCard
                                        key={player.id}
                                        player={player}
                                    />
                                ));
                            }
                        }
                    />
                </div>
            </div>
        </div>
    );
};

MainPage.propTypes = {
    playerApi: PropTypes.object.isRequired,
};

export { MainPage };