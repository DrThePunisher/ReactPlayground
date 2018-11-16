import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router';

import App from './App';
import { MainPage } from './pages/MainPage';

describe('App', () => {
    it('renders a header', () => {
        const subject = mountRender();
        expect(subject.find('.App-title').text()).to.equal('New Ultimate Site');
    });
    
    describe('Routes', () => {
        it('should route to the main page', () => {
            const subject = mountRender();
            expect(subject.find(MainPage)).to.be.present();
        });
    });
});

function mountRender() {
    return mount(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
}