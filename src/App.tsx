import './App.css';

import * as React from 'react';

import { PlayerApiClient } from './apis/PlayerApi';
import { TeamApiClient } from './apis/TeamApi';
import { MainPage } from './pages/MainPage';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className="App-title">New Ultimate Site</h1>
                </div>
                <div className="App-content">
                    <MainPage 
                        playerApi={new PlayerApiClient()}
                        teamApi={new TeamApiClient()}
                    />
                </div>
            </div>
        );
    }
}

export default App;
