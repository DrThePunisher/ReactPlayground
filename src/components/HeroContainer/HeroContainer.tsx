import * as PropTypes from 'prop-types';
import * as React from 'react';

import { HeroApi } from '../../apis/HeroApi';
import { Hero } from '../HeroCard/HeroCard';

interface Props {
    heroApi: HeroApi;
    render: (heroes: Hero[]) => {};
}

interface State {
    loadingFailed: boolean;
    heroes?: Hero[];
}

export class HeroContainer extends React.Component<Props, State> {
    static propTypes = {
        heroApi: PropTypes.object.isRequired,
        render: PropTypes.func.isRequired
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            loadingFailed: false
        };
    }

    componentWillMount() {
        this.props.heroApi.getHeroes().then(
            (heroes) => {
                this.setState({ heroes });
            },
            (error) => {
                this.setState({ loadingFailed: true });
            }
        );
    }

    render() {
        if (this.state.heroes) {
            return this.props.render(this.state.heroes);
        }
        if (this.state.loadingFailed) {
            return <div>Loading failed.</div>;
        }
        return <div>Loading...</div>;
    }
}