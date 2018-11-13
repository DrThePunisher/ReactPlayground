import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { arbitraryTeam, Team } from '../../entities/Team';
import { TeamCard } from './TeamCard';


describe('TeamCard', () => {
    it('should render a name', () => {
        const team = {
            ...arbitraryTeam(),
            name: 'Giant Bomb',
        };
        const subject = shallowRender({ team });
        expect(subject.find('.TeamCard-name').text()).to.contain('Giant Bomb');
    });

    it('calls an onClick function when provided', () => {
        const team = {
            ...arbitraryTeam(),
            id: 127,
        };
        const onClick = sinon.spy();
        const subject = shallowRender({ team, onClick });

        subject.simulate('click', { button: 0 });

        expect(onClick).to.have.been.calledWithExactly(127);
    });
});

interface OptionalProps {
    team?: Team;
    onClick?: (playerId: number) => void;
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <TeamCard {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        team: props.team || arbitraryTeam(),
        onClick: props.onClick,
    };
}