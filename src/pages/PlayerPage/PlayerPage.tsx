import './PlayerPage.css';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { PlayerApi, playerApiShape } from '../../apis/PlayerApi';
import { TeamApi, teamApiShape } from '../../apis/TeamApi';
import { PlayerContainer } from '../../components/PlayerContainer/PlayerContainer';
import { TeamContainer } from '../../components/TeamContainer/TeamContainer';
import { Player } from '../../entities/Player';
import { Team } from '../../entities/Team';

interface Props {
    playerId: number;
    playerApi: PlayerApi;
    teamApi: TeamApi;
}

const PlayerPage: React.SFC<Props> = (props) => {
    const playerName = (player: Player): string => {
        if (player.nickName) {
            return `${player.firstName} "${player.nickName}" ${player.lastName}`;
        }
        return `${player.firstName} ${player.lastName}`;
    };

    const maybeRenderTeamList = (player: Player) => {
        if (player.teamIds.length > 0) {
            return (
                <TeamContainer
                    teamIds={player.teamIds}
                    teamApi={props.teamApi}
                    render={
                        (teams: Team[]) =>
                            <div className="PlayerPage-teams">
                                <div className="PlayerPage-teams-title">
                                    Teams
                                </div>
                                <ul>
                                    {teams.map(team =>
                                        <li
                                            key={'teams' + team.id}
                                        >
                                            <Link to={'/Teams/' + team.id} >
                                                {team.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>

                    }
                />
            );
        }
        return undefined;
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
                                {maybeRenderTeamList(player)}
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
    teamApi: teamApiShape.isRequired,
};

export { PlayerPage };