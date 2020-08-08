import {INIT_PLAYERS, MOVE_TO_NEXT_PLAYER} from '../../constants/actionTypes'

export const initPlayers = (players, currentPlayer, gameType) => ({
    type: INIT_PLAYERS,
    players,
    currentPlayer,
    gameType
})

export const moveToTheNextPlayer = (gameType) => ({
    type: MOVE_TO_NEXT_PLAYER,
    gameType
})