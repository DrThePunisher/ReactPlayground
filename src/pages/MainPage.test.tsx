import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

import { PlayerApi, stubPlayerApi } from '../apis/PlayerApi';
import { stubTeamApi, TeamApi } from '../apis/TeamApi';
import { AllPlayersContainer } from '../components/AllPlayersContainer/AllPlayersContainer';
import { AllTeamsContainer } from '../components/AllTeamsContainer/AllTeamsContainer';
import { PlayerCard } from '../components/PlayerCard/PlayerCard';
import { TeamCard } from '../components/TeamCard/TeamCard';
import { arbitraryPlayer } from '../entities/Player';
import { arbitraryTeam } from '../entities/Team';
import { MainPage } from './MainPage';


describe('MainPage', () => {
    describe('Players', () => {
        it('renders a header for all players', () => {
            const subject = shallowRender({});

            expect(subject.find('.MainPage-players-header').text()).to.equal('All Players');
        });

        it('renders a list of all players', () => {
            const subject = shallowRender({});

            expect(subject.find(AllPlayersContainer)).to.be.present();
        });

        it('renders a PlayerCard for each player', async () => {
            const getAllPlayersPromise = Promise.resolve([{
                ...arbitraryPlayer(),
                id: 21,
            },
            {
                ...arbitraryPlayer(),
                id: 26,
            }]);
            const playerApi = {
                ...stubPlayerApi(),
                getAllPlayers: () => getAllPlayersPromise,
            };
            const subject = mountRender({ playerApi });
            await getAllPlayersPromise;
            subject.update();

            const playerCards = subject.find(PlayerCard);
            expect(playerCards.length).to.equal(2);
            expect(playerCards.at(0).prop('player')).to.deep.equal({
                ...arbitraryPlayer(),
                id: 21,
            });
            expect(playerCards.at(1).prop('player')).to.deep.equal({
                ...arbitraryPlayer(),
                id: 26,
            });
        });
    });

    describe('Teams', () => {
        it('renders a header for all teams', () => {
            const subject = shallowRender({});

            expect(subject.find('.MainPage-teams-header').text()).to.equal('All Teams');
        });

        it('renders a list of all teams', () => {
            const subject = shallowRender({});

            expect(subject.find(AllTeamsContainer)).to.be.present();
        });

        it('renders a TeamCard for each team', async () => {
            const getAllTeamsPromise = Promise.resolve([{
                ...arbitraryTeam(),
                id: 44,
            },
            {
                ...arbitraryTeam(),
                id: 27,
            }]);
            const teamApi = {
                ...stubTeamApi(),
                getAllTeams: () => getAllTeamsPromise,
            };
            const subject = mountRender({ teamApi });
            await getAllTeamsPromise;
            subject.update();

            const teamCards = subject.find(TeamCard);
            expect(teamCards.length).to.equal(2);
            expect(teamCards.at(0).prop('team')).to.deep.equal({
                ...arbitraryTeam(),
                id: 44,
            });
            expect(teamCards.at(1).prop('team')).to.deep.equal({
                ...arbitraryTeam(),
                id: 27,
            });
        });
    });
});

interface OptionalProps {
    playerApi?: PlayerApi;
    teamApi?: TeamApi;
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <MainPage {...makeProps(props)} />
    );
}

function mountRender(props: OptionalProps) {
    return mount(
        <MainPage {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        playerApi: props.playerApi || stubPlayerApi(),
        teamApi: props.teamApi || stubTeamApi(),
    };
}