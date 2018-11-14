import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { stubTeamApi, TeamApi } from '../../apis/TeamApi';
import { dummyPromise } from '../../entities/dummyPromise';
import { arbitraryTeam, Team } from '../../entities/Team';
import { AllTeamsContainer } from './AllTeamsContainer';

describe('AllTeamsContainer', () => {
    it('should render a loading message', () => {
        const subject = shallowRender({});
        expect(subject.text()).to.contain('Loading...');
    });

    xit('should render a failure message after an api error', async () => {
        const getAllTeamsPromise = Promise.reject('test');
        const teamApi = {
            ...stubTeamApi(),
            getAllTeams: () => getAllTeamsPromise
        };
        const subject = shallowRender({ teamApi });
        await getAllTeamsPromise;
        subject.update();
        expect(subject.text()).to.contain('Loading failed.');
    });

    it('should use the render prop after successful api call', async () => {
        const getAllTeamsPromise = Promise.resolve([arbitraryTeam()]);
        const teamApi = {
            ...stubTeamApi(),
            getAllTeams: () => getAllTeamsPromise
        };
        const render = sinon.spy();
        const subject = shallowRender({ teamApi, render });
        await getAllTeamsPromise;
        subject.update();
        expect(render).to.have.been.calledWithExactly([arbitraryTeam()]);
    });

    it('should call the playerApi upon load', () => {
        const getAllTeams = sinon.stub().returns(dummyPromise<Team[]>());
        const teamApi = {
            ...stubTeamApi(),
            getAllTeams
        };
        shallowRender({ teamApi });
        // tslint:disable-next-line:no-unused-expression
        expect(getAllTeams).to.have.been.calledOnce;
    });
});

interface OptionalProps {
    teamApi?: TeamApi;
    render?: (teams: Team[]) => {};
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <AllTeamsContainer {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        teamApi: props.teamApi || stubTeamApi(),
        render: props.render || ((teams: Team[]) => <div />)
    };
}