import {INIT_PLAYERS, MOVE_TO_NEXT_PLAYER} from '../../constants/actionTypes'
import {GAME_TYPES} from "../../constants/gameOptions"

const playersReducerDefaultState = {
    playerList: [],
    currentPlayer: 0,
    playersQueue: [],
    previousPlayer: 0
};

export default (state = playersReducerDefaultState, action) => {
    switch (action.type){
        case INIT_PLAYERS:
            console.log(action);
            let playerList = []
            if(action.gameType === GAME_TYPES.COMPUTER_NIM_GAME || action.gameType === GAME_TYPES.COMPUTER_RANDOM_GAME){
                playerList = ["Player 1", "Computer"];
                return {
                    ...state,
                    playerList: playerList,
                    currentPlayer: action.currentPlayer,
                    playersQueue: playerList.filter((player, index) => index !== action.currentPlayer)
                };
            }else{
                playerList = Array.from({length: action.players}).map((v,i) => `Player ${i+1}`)
                return {
                    ...state,
                    playerList: playerList,
                    currentPlayer: action.currentPlayer,
                    playersQueue: playerList.filter((player, index) => index !== action.currentPlayer)
                };
            }
            // return {
            //     ...state,
            //     playerList: action.players,
            //     currentPlayer: action.currentPlayer,
            //     playersQueue: action.players.filter((player, index) => index !== action.currentPlayer)
            // };
        case MOVE_TO_NEXT_PLAYER:
            let newCurrentPlayer = 0;
            if(action.gameType === GAME_TYPES.REGULAR_GAME || action.gameType === GAME_TYPES.COMPUTER_RANDOM_GAME || action.gameType === GAME_TYPES.COMPUTER_NIM_GAME){
                newCurrentPlayer = state.currentPlayer ===  state.playerList.length - 1 ? 0 : state.currentPlayer + 1;
                console.log(`From redux ${newCurrentPlayer}`);
                return {
                    ...state,
                    previousPlayer: state.currentPlayer,
                    currentPlayer: newCurrentPlayer,
                    playersQueue: [...state.playersQueue.slice(1), state.playerList[state.currentPlayer]]
                };
            }else if(action.gameType === GAME_TYPES.RANDOM_GAME){
                newCurrentPlayer = Math.floor((Math.random() * (state.playersQueue.length - 1)));
                if(newCurrentPlayer === state.currentPlayer){
                    return state;
                }
                console.log(newCurrentPlayer);
                let newPlayerList = state.playersQueue;
                newPlayerList.splice(newPlayerList.indexOf(`Player ${newCurrentPlayer + 1}`), 1);

                return {
                    ...state,
                    previousPlayer: state.currentPlayer,
                    currentPlayer: newCurrentPlayer ,
                    playersQueue: [...newPlayerList, state.playerList[state.currentPlayer]]
                }
            }else if(action.gameType === GAME_TYPES.COMPUTER_RANDOM_GAME){

            }

        default:
            return state;
    }
}
