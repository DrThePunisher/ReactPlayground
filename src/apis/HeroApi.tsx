import Axios, { AxiosInstance } from 'axios';

import { Hero } from '../components/HeroCard/HeroCard';

export interface HeroApi {
    getHero(id: number): Promise<Hero>;
    getHeroes(): Promise<Hero[]>;
}

export class HeroApiClient implements HeroApi {
    axios: AxiosInstance;

    constructor() {
        this.axios = Axios.create();
    }

    getHero(id: number): Promise<Hero> {
        return this.axios.get('http://localhost:3004/heroes/' + id).then((payload) => (payload.data));
    }

    getHeroes(): Promise<Hero[]> {
        return this.axios.get('http://localhost:3004/heroes').then((payload) => (payload.data));
    }
}

export function stubHeroApi(): HeroApi {
    return {
        getHero: () => dummyPromise(),
        getHeroes: () => dummyPromise()
    };
}

export function dummyPromise<T>(): Promise<T> {
    return new Promise(() => {});
}