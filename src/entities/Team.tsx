import * as PropTypes from 'prop-types';

export interface Team {
    id: number;
    name: string;
    captainIds: number[];
    playerIds: number[];
}

export const TeamShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    captainIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    ncaptainIdsame: PropTypes.arrayOf(PropTypes.number).isRequired,
});

export function arbitraryTeam(): Team {
    return {
        id: 0,
        name: '',
        captainIds: [],
        playerIds: [],
    };
}