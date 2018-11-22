import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { stubTeamApi, TeamApi } from '../../apis/TeamApi';
import { dummyPromise } from '../../entities/dummyPromise';
import { arbitraryTeam, Team } from '../../entities/Team';
import { TeamContainer } from '../TeamContainer/TeamContainer';

describe('TeamContainer', () => {
    it('should render a loading message', () => {
        const subject = shallowRender({});
        expect(subject.text()).to.contain('Loading...');
    });

    it('should render a failure message after an api error', async () => {
        const getTeamsByIdPromise = () => Promise.reject('test');
        const teamApi = {
            ...stubTeamApi(),
            getTeamsById: getTeamsByIdPromise
        };
        const subject = shallowRender({ teamApi });
        await getTeamsByIdPromise;
        subject.update();
        expect(subject.text()).to.contain('Loading failed.');
    });

    it('should use the render prop after successful api call', async () => {
        const getTeamsByIdPromise = Promise.resolve([arbitraryTeam()]);
        const teamApi = {
            ...stubTeamApi(),
            getTeamsById: () => getTeamsByIdPromise
        };
        const render = sinon.spy();
        const subject = shallowRender({ teamApi, render });
        await getTeamsByIdPromise;
        subject.update();
        expect(render).to.have.been.calledWithExactly([arbitraryTeam()]);
    });

    it('should call the playerApi upon load', () => {
        const teamIds = [56, 98];
        const getTeamsById = sinon.stub().returns(dummyPromise<Team[]>());
        const teamApi = {
            ...stubTeamApi(),
            getTeamsById
        };
        shallowRender({ teamIds, teamApi });
        expect(getTeamsById).to.have.been.calledWithExactly(teamIds);
    });
});

interface OptionalProps {
    teamIds?: number[];
    teamApi?: TeamApi;
    render?: (teams: Team[]) => {};
}

function shallowRender(props: OptionalProps) {
    return shallow(
        <TeamContainer {...makeProps(props)} />
    );
}

function makeProps(props: OptionalProps) {
    return {
        teamIds: props.teamIds || [],
        teamApi: props.teamApi || stubTeamApi(),
        render: props.render || ((teams: Team[]) => <div />)
    };
}