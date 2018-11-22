import { expect } from 'chai';
import * as sinon from 'sinon';

import { PlayerApiClient } from './PlayerApi';

describe('PlayerApi', () => {
    describe('getAllPlayers', () => {
        it('calls the service', () => {
            const axios = {
                get: sinon.stub().returns({data: {}}),
            };
            const subject = new PlayerApiClient(axios, 'http://tests.com');

            subject.getAllPlayers();

            expect(axios.get).to.have.been.calledWithExactly('http://tests.com/Players');
        });
    });

    describe('getPlayersById', () => {
        it('calls the service', () => {
            const axios = {
                get: sinon.stub().returns({data: {}}),
            };
            const subject = new PlayerApiClient(axios, 'http://tests.com');

            subject.getPlayersById([5, 8]);

            expect(axios.get).to.have.been.calledWithExactly(
                'http://tests.com/Players?id=5&id=8'
            );
        });
    });
});