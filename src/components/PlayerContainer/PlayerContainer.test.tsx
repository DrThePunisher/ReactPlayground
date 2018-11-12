import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { dummyPromise, PlayerApi, stubPlayerApi } from '../../apis/PlayerApi';
import { arbitraryPlayer, Player } from '../PlayerCard/PlayerCard';
import { PlayerContainer } from './PlayerContainer';


describe('PlayerContainer', () => {
    it('should should a loading message', () => {
        const subject = shallowRender({});
        expect(subject.text()).to.contain('Loading...');
    });

    xit('should render a failure message after an api error', async () => {
        const getAllPlayersPromise = Promise.reject('test');
        const playerApi = {
            ...stubPlayerApi(),
            getAllPlayers: () => getAllPlayersPromise
        };
        const subject = shallowRender({ playerApi });
        await getAllPlayersPromise;
        subject.update();
        expect(subject.text()).to.contain('Loading failed.');
    });

    it('should use the render prop after successful api call', async () => {
        const getAllPlayersPromise = Promise.resolve([arbitraryPlayer()]);
        const playerApi = {
            ...stubPlayerApi(),
            getAllPlayers: () => getAllPlayersPromise
        };
        const render = sinon.spy();
        const subject = shallowRender({ playerApi, render });
        await getAllPlayersPromise;
        subject.update();
        expect(render).to.have.been.calledWithExactly([arbitraryPlayer()]);
    });

    it('should call the playerApi upon load', () => {
        const getAllPlayers = sinon.stub().returns(dummyPromise());
        const playerApi = {
            ...stubPlayerApi(),
            getAllPlayers
        };
        shallowRender({ playerApi });
        // tslint:disable-next-line:no-unused-expression
        expect(getAllPlayers).to.have.been.calledOnce;
    });
});

interface OptionalProps {
    playerApi?: PlayerApi;
    render?: (Playeres: Player[]) => {};
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <PlayerContainer {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        playerApi: props.playerApi || stubPlayerApi(),
        render: props.render || ((Playeres: Player[]) => <div />)
    };
}