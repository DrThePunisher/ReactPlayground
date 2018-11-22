import * as PropTypes from 'prop-types';

import { dummyPromise } from '../entities/dummyPromise';
import { Team } from '../entities/Team';

export interface TeamApi {
    getAllTeams(): Promise<Team[]>;
    getTeamsById(ids: number[]): Promise<Team[]>;
}

export class TeamApiClient implements TeamApi {
    axios: any;
    baseUrl: string;

    constructor(axios: any, baseUrl: string) {
        this.axios = axios;
        this.baseUrl = baseUrl;
    }

    async getAllTeams(): Promise<Team[]> {
        const payload = await this.axios.get(this.baseUrl + '/Teams');
        return (payload.data);
    }

    async getTeamsById(ids: number[]): Promise<Team[]> {
        let requestUrl = this.baseUrl + '/Teams?';
        requestUrl += ids.map(id => 'id=' + id).join('&');
        const payload = await this.axios.get(requestUrl);
        return (payload.data);
    }
}

export function stubTeamApi(): TeamApi {
    return {
        getAllTeams: () => dummyPromise<Team[]>(),
        getTeamsById: () => dummyPromise<Team[]>(),
    };
}

export const teamApiShape = PropTypes.shape({
    getAllTeams: PropTypes.func.isRequired,
    getTeamsById: PropTypes.func.isRequired,
});