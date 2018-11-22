import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { Redirect, StaticRouter } from 'react-router';
import { Link } from 'react-router-dom';
import * as sinon from 'sinon';

import { PlayerApi, stubPlayerApi } from '../../apis/PlayerApi';
import { stubTeamApi, TeamApi } from '../../apis/TeamApi';
import { arbitraryPlayer } from '../../entities/Player';
import { arbitraryTeam } from '../../entities/Team';
import { PlayerPage } from './PlayerPage';

describe('PlayerPage', () => {
    describe('Player name', () => {
        it('renders the first and last name', async () => {
            const getPlayersByIdPromise = Promise.resolve([{
                ...arbitraryPlayer(),
                firstName: 'Scout',
                lastName: 'Cat',
            }]);
            const playerApi = {
                ...stubPlayerApi(),
                getPlayersById: () => getPlayersByIdPromise,
            };
            const subject = mountRender({ playerApi });
            await getPlayersByIdPromise;
            subject.update();

            expect(subject.find('.PlayerPage-name').text()).to.equal('Scout Cat');
        });

        it('renders a nickname if present', async () => {
            const getPlayersByIdPromise = Promise.resolve([{
                ...arbitraryPlayer(),
                firstName: 'Scout',
                lastName: 'Cat',
                nickName: 'Baby',
            }]);
            const playerApi = {
                ...stubPlayerApi(),
                getPlayersById: () => getPlayersByIdPromise,
            };
            const subject = mountRender({ playerApi });
            await getPlayersByIdPromise;
            subject.update();

            expect(subject.find('.PlayerPage-name').text()).to.equal('Scout "Baby" Cat');
        });
    });

    describe('Team List', () => {
        it('renders a list of teams', async () => {
            const getPlayersByIdPromise = Promise.resolve([{
                ...arbitraryPlayer(),
                teamIds: [45, 33]
            }]);
            const playerApi = {
                ...stubPlayerApi(),
                getPlayersById: () => getPlayersByIdPromise,
            };
            const getTeamsByIdPromise = Promise.resolve([{
                ...arbitraryTeam(),
                id: 45,
                name: 'Specter'
            },
            {
                ...arbitraryTeam(),
                id: 33,
                name: 'C-Sec'
            }]);
            const teamApi = {
                ...stubTeamApi(),
                getTeamsById: sinon.stub().returns(getTeamsByIdPromise),
            };
            const subject = mountRender({ playerApi, teamApi });
            await getPlayersByIdPromise;
            await getTeamsByIdPromise;
            subject.update();

            expect(teamApi.getTeamsById).to.have.been.calledWithExactly([45, 33]);

            const teamList = subject.find('.PlayerPage-teams');
            expect(teamList).to.be.present();
            expect(teamList.find('li').length).to.equal(2);
            expect(teamList.find('li').at(0).text()).to.equal('Specter');
            expect(teamList.find('li').at(0).find(Link)).to.be.present();
            expect(teamList.find('li').at(0).find(Link)).prop('to', '/Teams/45');
            expect(teamList.find('li').at(1).text()).to.equal('C-Sec');
            expect(teamList.find('li').at(1).find(Link)).to.be.present();
            expect(teamList.find('li').at(1).find(Link)).prop('to', '/Teams/33');
        });
    });

    it('redirects the user when no player is found', async () => {
        const getPlayersByIdPromise = Promise.resolve([]);
        const playerApi = {
            ...stubPlayerApi(),
            getPlayersById: () => getPlayersByIdPromise,
        };
        const subject = mountRender({ playerApi });
        await getPlayersByIdPromise;
        subject.update();

        expect(subject.find(Redirect)).to.be.present();
        expect(subject.find(Redirect)).prop('to', '/404');
    });
});

interface OptionalProps {
    playerId?: number;
    playerApi?: PlayerApi;
    teamApi?: TeamApi;
}

function mountRender(props: OptionalProps) {
    return mount(
        <StaticRouter basename={'/players'} context={{}}>
            <PlayerPage {...makeProps(props)} />
        </StaticRouter>
    );
}

function makeProps(props: OptionalProps) {
    return {
        playerId: props.playerId || 0,
        playerApi: props.playerApi || stubPlayerApi(),
        teamApi: props.teamApi || stubTeamApi(),
    };
}