import Axios, { AxiosInstance } from 'axios';

import { dummyPromise } from '../entities/dummyPromise';
import { Player } from '../entities/Player';

export interface PlayerApi {
    getPlayer(id: number): Promise<Player>;
    getAllPlayers(): Promise<Player[]>;
}

export class PlayerApiClient implements PlayerApi {
    axios: AxiosInstance;

    constructor() {
        this.axios = Axios.create();
    }

    async getPlayer(id: number): Promise<Player> {
        const payload = await this.axios.get('http://localhost:3004/Players/' + id);
        return (payload.data);
    }

    async getAllPlayers(): Promise<Player[]> {
        const payload = await this.axios.get('http://localhost:3004/Players');
        return (payload.data);
    }
}

export function stubPlayerApi(): PlayerApi {
    return {
        getPlayer: () => dummyPromise<Player>(),
        getAllPlayers: () => dummyPromise<Player[]>(),
    };
}