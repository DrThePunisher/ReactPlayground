import './App.css';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PlayerApiClient } from './apis/PlayerApi';
import { TeamApiClient } from './apis/TeamApi';
import { MainPage } from './pages/MainPage';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <div className="App-title">New Ultimate Site</div>
                </div>
                <div className="App-content">
                    <Switch>
                        <Route
                            path="/"
                            component={() =>
                                <MainPage
                                    playerApi={new PlayerApiClient()}
                                    teamApi={new TeamApiClient()}
                                />
                            }
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
