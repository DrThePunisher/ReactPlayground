import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter, Redirect } from 'react-router';

import { PlayerApi, stubPlayerApi } from '../../apis/PlayerApi';
import { arbitraryPlayer } from '../../entities/Player';
import { PlayerPage } from './PlayerPage';

describe('PlayerPage', () => {
    it('renders the first name', async () => {
        const getPlayersByIdPromise = Promise.resolve([{
            ...arbitraryPlayer(),
            firstName: 'Scout',
        }]);
        const playerApi = {
            ...stubPlayerApi(),
            getPlayersById: () => getPlayersByIdPromise,
        };
        const subject = mountRender({ playerApi });
        await getPlayersByIdPromise;
        subject.update();

        expect(subject.find('.PlayerPage-name').text()).to.equal('Scout');
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
}

function mountRender(props: OptionalProps) {
    return mount(
        <MemoryRouter>
            <PlayerPage {...makeProps(props)} />
        </MemoryRouter>
    );
}

function makeProps(props: OptionalProps) {
    return {
        playerId: props.playerId || 0,
        playerApi: props.playerApi || stubPlayerApi(),
    };
}