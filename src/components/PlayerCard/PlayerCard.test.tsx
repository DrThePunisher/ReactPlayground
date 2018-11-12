import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { arbitraryPlayer, Player, PlayerCard } from './PlayerCard';


describe('PlayerCard', () => {
    it('should render a first name', () => {
        const player = {
            ...arbitraryPlayer(),
            firstName: 'Dekar',
        };
        const subject = shallowRender({ player });
        expect(subject.find('.PlayerCard-firstName').text()).to.contain('Dekar');
    });

    it('calls an onClick function when provided', () => {
        const player = {
            ...arbitraryPlayer(),
            id: 123,
        };
        const onClick = sinon.spy();
        const subject = shallowRender({ player, onClick });

        subject.simulate('click', { button: 0 });

        expect(onClick).to.have.been.calledWithExactly(123);
    });
});

interface OptionalProps {
    player?: Player;
    onClick?: (playerId: number) => void;
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <PlayerCard {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        player: props.player || arbitraryPlayer(),
        onClick: props.onClick,
    };
}