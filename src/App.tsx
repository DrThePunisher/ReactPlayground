import './App.css';

import * as React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import { PlayerApi, playerApiShape } from './apis/PlayerApi';
import { TeamApi, teamApiShape } from './apis/TeamApi';
import { MainPage } from './pages/MainPage/MainPage';
import { PlayerPage } from './pages/PlayerPage/PlayerPage';

interface Props {
    playerApi: PlayerApi;
    teamApi: TeamApi;
}

class App extends React.Component<Props> {
    static propTypes = {
        playerApi: playerApiShape.isRequired,
        teamApi: teamApiShape.isRequired,
    };
    
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <NavLink className="App-link" to="/" exact={true}>Home</NavLink>
                    <div className="App-title">New Ultimate Site</div>
                </div>
                <div className="App-content">
                    <Switch>
                        <Route
                            path="/"
                            exact={true}
                            component={() =>
                                <MainPage
                                    playerApi={this.props.playerApi}
                                    teamApi={this.props.teamApi}
                                />
                            }
                        />
                        <Route 
                            path="/player/:id"
                            component={({ match }: any) => 
                                <PlayerPage
                                    playerId={parseInt(match.params.id, 10)}
                                    playerApi={this.props.playerApi}
                                />
                            }
                        />
                        <Route 
                            component={() => 
                                <div>Page not found</div>
                            }
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
