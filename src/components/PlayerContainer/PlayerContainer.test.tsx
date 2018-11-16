import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { PlayerApi, stubPlayerApi } from '../../apis/PlayerApi';
import { dummyPromise } from '../../entities/dummyPromise';
import { arbitraryPlayer, Player } from '../../entities/Player';
import { PlayerContainer } from '../PlayerContainer/PlayerContainer';

describe('PlayerContainer', () => {
    it('should render a loading message', () => {
        const subject = shallowRender({});
        expect(subject.text()).to.contain('Loading...');
    });

    xit('should render a failure message after an api error', async () => {
        const getPlayersByIdPromise = Promise.reject('test');
        const playerApi = {
            ...stubPlayerApi(),
            getPlayersById: () => getPlayersByIdPromise
        };
        const subject = shallowRender({ playerApi });
        await getPlayersByIdPromise;
        subject.update();
        expect(subject.text()).to.contain('Loading failed.');
    });

    it('should use the render prop after successful api call', async () => {
        const getPlayersByIdPromise = Promise.resolve([arbitraryPlayer()]);
        const playerApi = {
            ...stubPlayerApi(),
            getPlayersById: () => getPlayersByIdPromise
        };
        const render = sinon.spy();
        const subject = shallowRender({ playerApi, render });
        await getPlayersByIdPromise;
        subject.update();
        expect(render).to.have.been.calledWithExactly([arbitraryPlayer()]);
    });

    it('should call the playerApi upon load', () => {
        const playerIds = [56, 98];
        const getPlayersById = sinon.stub().returns(dummyPromise<Player[]>());
        const playerApi = {
            ...stubPlayerApi(),
            getPlayersById
        };
        shallowRender({ playerIds, playerApi });
        expect(getPlayersById).to.have.been.calledWithExactly(playerIds);
    });
});

interface OptionalProps {
    playerIds?: number[];
    playerApi?: PlayerApi;
    render?: (players: Player[]) => {};
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <PlayerContainer {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        playerIds: props.playerIds || [],
        playerApi: props.playerApi || stubPlayerApi(),
        render: props.render || ((players: Player[]) => <div />)
    };
}