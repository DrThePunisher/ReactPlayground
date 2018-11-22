import Axios, { AxiosInstance } from 'axios';

import { dummyPromise } from '../entities/dummyPromise';
import { Player } from '../entities/Player';

export interface PlayerApi {
    getAllPlayers(): Promise<Player[]>;
    getPlayersById(ids: number[]): Promise<Player[]>;
}

export class PlayerApiClient implements PlayerApi {
    axios: any;
    baseUrl: string;

    constructor(axios: any, baseUrl: string) {
        this.axios = axios;
        this.baseUrl = baseUrl;
    }

    async getAllPlayers(): Promise<Player[]> {
        const payload = await this.axios.get(this.baseUrl + '/Players');
        return (payload.data);
    }

    async getPlayersById(ids: number[]): Promise<Player[]> {
        let requestUrl = this.baseUrl + '/Players?';
        requestUrl += ids.map(id => 'id=' + id).join('&');
        const payload = await this.axios.get(requestUrl);
        return (payload.data);
    }
}

export function stubPlayerApi(): PlayerApi {
    return {
        getAllPlayers: () => dummyPromise<Player[]>(),
        getPlayersById: () => dummyPromise<Player[]>(),
    };
}