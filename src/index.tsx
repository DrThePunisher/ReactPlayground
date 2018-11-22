import './assets/styles/styles.css';

import Axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { PlayerApiClient } from './apis/PlayerApi';
import { TeamApiClient } from './apis/TeamApi';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App
            playerApi={new PlayerApiClient(Axios.create(), 'http://localhost:3004')}
            teamApi={new TeamApiClient(Axios.create(), 'http://localhost:3004')}
        />
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();