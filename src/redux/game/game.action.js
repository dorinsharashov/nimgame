import {SET_GAME, SET_SETUP, UPDATE_GAME_LOG} from '../../constants/actionTypes';

export const setGame = (gameType) => ({
    type: SET_GAME,
    gameType
})

export const setSetup = () => ({
    type: SET_SETUP,
})

export const updateGameLog = (name, pileIndex, count) => ({
    type: UPDATE_GAME_LOG,
    name,
    pileIndex,
    count
})