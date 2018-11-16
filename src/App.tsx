import './App.css';

import * as React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import { PlayerApiClient } from './apis/PlayerApi';
import { TeamApiClient } from './apis/TeamApi';
import { MainPage } from './pages/MainPage/MainPage';
import { PlayerPage } from './pages/PlayerPage/PlayerPage';

class App extends React.Component {
    playerApiClient = new PlayerApiClient();
    teamApiClient = new TeamApiClient();
    
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
                                    playerApi={this.playerApiClient}
                                    teamApi={this.teamApiClient}
                                />
                            }
                        />
                        <Route 
                            path="/player/:id"
                            component={({ match }: any) => 
                                <PlayerPage
                                    playerId={parseInt(match.params.id, 10)}
                                    playerApi={this.playerApiClient}
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
