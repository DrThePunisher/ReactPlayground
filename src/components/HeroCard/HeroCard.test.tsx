import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import { HeroCard } from './HeroCard';


describe('HeroCard', () => {
    it('should render a name', () => {
        const subject = shallowRender({ name: 'Dekar' });
        expect(subject.find('.HeroCard-name').text()).to.contain('Dekar');
    });

    it('should render a race', () => {
        const subject = shallowRender({ race: 'Human' });
        expect(subject.find('.HeroCard-race').text()).to.contain('Race: Human');
    });

    it('should render a class', () => {
        const subject = shallowRender({ class: 'Fighter' });
        expect(subject.find('.HeroCard-class').text()).to.contain('Class: Fighter');
    });

    it('should render a level', () => {
        const subject = shallowRender({ level: 6 });
        expect(subject.find('.HeroCard-level').text()).to.contain('Level: 6');
    });
});

interface OptionalProps {
    name?: string;
    race?: string;
    class?: string;
    level?: number;
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <HeroCard {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        name: props.name || '',
        race: props.race || '',
        class: props.class,
        level: props.level
    };
}