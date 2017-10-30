import initialState from './initialState';
import {ADD_CHORD, REMOVE_CHORD} from '../Actions/actionTypes';

export default function chordGrid(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_CHORD:
      console.log('ADD_CHORD Action')
      return action;
    case REMOVE_CHORD:
      newState = action.chordGrid;
      console.log('REMOVE_CHORD Action')
      return newState;
    default:
      return state;
  }
}
