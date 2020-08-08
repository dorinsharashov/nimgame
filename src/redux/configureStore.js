import {createStore, combineReducers} from 'redux';
import pilesReducer from './piles/piles.reducer';
import playersReducer from './players/players.reducer';
import gameReducer from './game/game.reducer'

export default () => {
    const store = createStore(
        combineReducers({
            piles: pilesReducer,
            players: playersReducer,
            game: gameReducer
        })
    )

    return store;
}