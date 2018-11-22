import * as PropTypes from 'prop-types';

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    nickName?: string;
    gender: string;
    teamIds: number[];
}
export const PlayerShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    nickName: PropTypes.string,
    gender: PropTypes.string.isRequired,
    teamIds: PropTypes.arrayOf(PropTypes.number).isRequired,
});

export function arbitraryPlayer(): Player {
    return {
        id: 0,
        firstName: '',
        lastName: '',
        gender: '',
        teamIds: []
    };
}