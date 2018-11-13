import Axios, { AxiosInstance } from 'axios';

import { dummyPromise } from '../entities/dummyPromise';
import { Team } from '../entities/Team';

export interface TeamApi {
    getAllTeams(): Promise<Team[]>;
}

export class TeamApiClient implements TeamApi {
    axios: AxiosInstance;

    constructor() {
        this.axios = Axios.create();
    }

    async getAllTeams(): Promise<Team[]> {
        const payload = await this.axios.get('http://localhost:3004/Teams');
        return (payload.data);
    }
}

export function stubTeamApi(): TeamApi {
    return {
        getAllTeams: () => dummyPromise<Team[]>(),
    };
}