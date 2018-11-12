import * as PropTypes from 'prop-types';
import * as React from 'react';

import { PlayerApi } from '../../apis/PlayerApi';
import { Player } from "../../entities/Player";

interface Props {
    playerApi: PlayerApi;
    render: (players: Player[]) => {};
}

interface State {
    loadingFailed: boolean;
    players?: Player[];
}

export class PlayerContainer extends React.Component<Props, State> {
    static propTypes = {
        playerApi: PropTypes.object.isRequired,
        render: PropTypes.func.isRequired
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            loadingFailed: false
        };
    }

    componentWillMount() {
        this.props.playerApi.getAllPlayers().then(
            (players) => {
                this.setState({ players });
            },
            () => {
                this.setState({ loadingFailed: true });
            }
        );
    }

    render() {
        if (this.state.players) {
            return this.props.render(this.state.players);
        }
        if (this.state.loadingFailed) {
            return <div>Loading failed.</div>;
        }
        return <div>Loading...</div>;
    }
}