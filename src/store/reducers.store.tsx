import * as actionTypes from  './action.store';
import { updateObject } from './utility';
import { act } from 'react-dom/test-utils';

let initialState ={
    listOfFavorites:''
}
export {
    storeListOfFavorites
} from './action.store';

let SampleReducers = ( state = initialState, action: any ) => {
    switch ( action.type ) {
        case actionTypes.LISTOFFAVORITES: return {...state, listOfFavorites:action.listOfFavorites};
    default:
    	return state;
    }
}

export default SampleReducers;