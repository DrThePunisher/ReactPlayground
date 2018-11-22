import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import { stubPlayerApi } from './apis/PlayerApi';
import { stubTeamApi } from './apis/TeamApi';
import App from './App';
import { MainPage } from './pages/MainPage/MainPage';
import { PlayerPage } from './pages/PlayerPage/PlayerPage';

describe('App', () => {
    describe('Header', () => {
        it('renders header links', () => {
            const subject = mountRender();

            const navLinks = subject.find(NavLink);
            expect(navLinks.length).to.equal(1);
            expect(navLinks.at(0)).prop('to', '/');
            expect(navLinks.at(0)).to.have.className('active');
        });

        it('renders a header', () => {
            const subject = mountRender();
            expect(subject.find('.App-title').text()).to.equal('New Ultimate Site');
        });
    });

    describe('Routes', () => {
        it('should route to the main page', () => {
            const subject = mountRender();
            expect(subject.find(MainPage)).to.be.present();
        });

        it('should route to the player page', () => {
            const subject = mountRender('/player/123');
            expect(subject.find(PlayerPage)).to.be.present();
        });

        it('should render a page not found message when no route matches', () => {
            const subject = mountRender('/nope');
            expect(subject.text()).contain('Page not found');
        });
    });
});

function mountRender(route?: string) {
    const testRoute = [route ? route : '/'];
    return mount(
        <MemoryRouter initialEntries={testRoute}>
            <App
                playerApi={stubPlayerApi()}
                teamApi={stubTeamApi()}
            />
        </MemoryRouter>
    );
}