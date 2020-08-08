import {SET_GAME, SET_SETUP, UPDATE_GAME_LOG} from '../../constants/actionTypes';
import {GAME_TYPES} from '../../constants/gameOptions';
const gameReducerDefaultState = {
    game: false,
    setup: true,
    gameType: GAME_TYPES.REGULAR_GAME,
    gameLog: []
};

export default (state = gameReducerDefaultState, action) => {
    switch (action.type){
        case SET_GAME:
            return {...state, game: true, setup: false, gameType: action.gameType};
        case SET_SETUP:
            return {...state, game: false, setup: true, gameLog: []};
        case UPDATE_GAME_LOG:
            //return {...state, gameLog: state.gameLog.concat(`Player ${action.name} take from pile ${action.pileIndex} - ${action.count}`)}
            state.gameLog.unshift({name: action.name, pileIndex: action.pileIndex, count: action.count});
            return state;
        default:
            return state;
    }
}