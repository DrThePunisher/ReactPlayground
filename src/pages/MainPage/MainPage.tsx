import './MainPage.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { PlayerApi } from '../../apis/PlayerApi';
import { TeamApi } from '../../apis/TeamApi';
import { AllPlayersContainer } from '../../components/AllPlayersContainer/AllPlayersContainer';
import { AllTeamsContainer } from '../../components/AllTeamsContainer/AllTeamsContainer';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { TeamCard } from '../../components/TeamCard/TeamCard';
import { Player } from '../../entities/Player';
import { Team } from '../../entities/Team';

interface Props {
    playerApi: PlayerApi;
    teamApi: TeamApi;
}

const MainPage: React.SFC<Props> = (props) => {
    return (
        <div className="MainPage">
            <div className="MainPage-players">
                <div className="MainPage-players-header">
                    All Players
                </div>
                <div className="MainPage-players-list">
                    <AllPlayersContainer
                        playerApi={props.playerApi}
                        render={
                            (players: Player[]) => {
                                return players.map((player: Player) => (
                                    <Link
                                        key={'player-' + player.id}
                                        to={'/player/' + player.id}
                                    >
                                        <PlayerCard
                                            player={player}
                                        />
                                    </Link>
                                ));
                            }
                        }
                    />
                </div>
            </div>
            <div className="MainPage-teams">
                <div className="MainPage-teams-header">
                    All Teams
                </div>
                <div className="MainPage-teams-list">
                    <AllTeamsContainer
                        teamApi={props.teamApi}
                        render={
                            (teams: Team[]) => {
                                return teams.map((team: Team) => (
                                    <Link
                                        key={'team-' + team.id}
                                        to={'/team/' + team.id}
                                    >
                                        <TeamCard
                                            team={team}
                                        />
                                    </Link>
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
    teamApi: PropTypes.object.isRequired,
};

export { MainPage };

