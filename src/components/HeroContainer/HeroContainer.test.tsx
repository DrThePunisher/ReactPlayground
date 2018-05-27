import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { dummyPromise, HeroApi, stubHeroApi } from '../../apis/HeroApi';
import { arbitraryHero, Hero } from '../HeroCard/HeroCard';
import { HeroContainer } from './HeroContainer';


describe('HeroContainer', () => {
    it('should should a loading message', () => {
        const subject = shallowRender({});
        expect(subject.text()).to.contain('Loading...');
    });

    it('should render a failure message after an api error', async () => {
        const getHeroes = () => Promise.reject('test');
        const heroApi = {
            ...stubHeroApi(),
            getHeroes
        };
        const subject = shallowRender({ heroApi });
        await getHeroes;
        subject.update();
        expect(subject.text()).to.contain('Loading failed.');
    });

    it('should use the render prop after successful api call', async () => {
        const getHeroesPromise = Promise.resolve([arbitraryHero()]);
        const heroApi = {
            ...stubHeroApi(),
            getHeroes: () => getHeroesPromise
        };
        const render = sinon.spy();
        const subject = shallowRender({ heroApi, render });
        await getHeroesPromise;
        subject.update();
        // tslint:disable-next-line:no-unused-expression
        expect(render).to.have.been.calledWithExactly([arbitraryHero()]);
    });

    it('should call the HeroApi upon load', () => {
        const getHeroes = sinon.stub().returns(dummyPromise());
        const heroApi = {
            ...stubHeroApi(),
            getHeroes
        };
        const subject = shallowRender({ heroApi });
        // tslint:disable-next-line:no-unused-expression
        expect(getHeroes).to.have.been.calledOnce;
    });
});

interface OptionalProps {
    heroApi?: HeroApi;
    render?: (heroes: Hero[]) => {};
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <HeroContainer {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        heroApi: props.heroApi || stubHeroApi(),
        render: props.render || ((heroes: Hero[]) => <div />)
    };
}