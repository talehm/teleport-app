import {
    test
} from '../actions/type';
import merge from 'lodash/merge';

const initialState = {
    garagesList: {},
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'Default':
            return {
                ...state,
                actionStatus: action.payload
            };
        default:
            return state
    }
}