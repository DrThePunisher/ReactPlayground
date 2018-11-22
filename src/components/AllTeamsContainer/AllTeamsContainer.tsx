import * as PropTypes from 'prop-types';
import * as React from 'react';

import { TeamApi, teamApiShape } from '../../apis/TeamApi';
import { Team } from '../../entities/Team';

interface Props {
    teamApi: TeamApi;
    render: (teams: Team[]) => {};
}

interface State {
    loadingFailed: boolean;
    teams?: Team[];
}

export class AllTeamsContainer extends React.Component<Props, State> {
    static propTypes = {
        teamApi: teamApiShape.isRequired,
        render: PropTypes.func.isRequired
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            loadingFailed: false
        };
    }

    componentDidMount() {
        this.props.teamApi.getAllTeams().then(
            (teams) => {
                this.setState({ teams });
            },
            () => {
                this.setState({ loadingFailed: true });
            }
        );
    }

    render() {
        if (this.state.teams) {
            return this.props.render(this.state.teams);
        }
        if (this.state.loadingFailed) {
            return <div>Loading failed.</div>;
        }
        return <div>Loading...</div>;
    }
}