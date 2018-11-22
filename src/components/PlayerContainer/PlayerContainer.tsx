import * as PropTypes from 'prop-types';
import * as React from 'react';

import { PlayerApi, playerApiShape } from '../../apis/PlayerApi';
import { Player } from '../../entities/Player';

interface Props {
    playerIds: number[];
    playerApi: PlayerApi;
    render: (players: Player[]) => {};
}

interface State {
    loadingFailed: boolean;
    players?: Player[];
}

export class PlayerContainer extends React.Component<Props, State> {
    static propTypes = {
        playerIds: PropTypes.arrayOf(PropTypes.number).isRequired,
        playerApi: playerApiShape.isRequired,
        render: PropTypes.func.isRequired
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            loadingFailed: false
        };
    }

    componentDidMount() {
        this.props.playerApi.getPlayersById(this.props.playerIds).then(
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