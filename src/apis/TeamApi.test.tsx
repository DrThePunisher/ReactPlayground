import { expect } from 'chai';
import * as sinon from 'sinon';

import { TeamApiClient } from './TeamApi';

describe('TeamApi', () => {
    describe('getAllTeams', () => {
        it('calls the service', () => {
            const axios = {
                get: sinon.stub().returns({data: {}}),
            };
            const subject = new TeamApiClient(axios, 'http://tests.com');

            subject.getAllTeams();

            expect(axios.get).to.have.been.calledWithExactly('http://tests.com/Teams');
        });
    });

    describe('getTeamsById', () => {
        it('calls the service', () => {
            const axios = {
                get: sinon.stub().returns({data: {}}),
            };
            const subject = new TeamApiClient(axios, 'http://tests.com');

            subject.getTeamsById([5, 8]);

            expect(axios.get).to.have.been.calledWithExactly(
                'http://tests.com/Teams?id=5&id=8'
            );
        });
    });
});