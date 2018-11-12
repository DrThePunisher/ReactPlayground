import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

import { PlayerApi, stubPlayerApi } from '../apis/PlayerApi';
import { PlayerCard } from '../components/PlayerCard/PlayerCard';
import { PlayerContainer } from '../components/PlayerContainer/PlayerContainer';
import { arbitraryPlayer } from '../entities/Player';
import { MainPage } from './MainPage';

describe('MainPage', () => {
    describe('Players', () => {
        it('renders a header for all players', () => {
            const subject = shallowRender({});

            expect(subject.find('.MainPage-players-header').text()).to.equal('All Players');
        });

        it('renders a list of all players', () => {
            const subject = shallowRender({});

            expect(subject.find(PlayerContainer)).to.be.present();
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
});

interface OptionalProps {
    playerApi?: PlayerApi;
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
        playerApi: props.playerApi || stubPlayerApi()
    };
}