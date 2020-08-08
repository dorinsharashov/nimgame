import {INIT_PILE_LIST, REMOVE_FROM_PILE} from '../../constants/actionTypes';
import {calculateZeroNimSum} from '../../helpers/calculateNimSum';

const pilesReducerDefaultState = {
    pileList: [],
    isDone: false,
    nimZeroSum: false
};

export default (state = pilesReducerDefaultState, action) => {
    switch (action.type){
        case INIT_PILE_LIST:
            return {...state, pileList: action.piles, isDone: false, nimZeroSum: calculateZeroNimSum(action.piles)};
        case REMOVE_FROM_PILE:
            let sum = 0;
            const newPileList = state.pileList.map((item, index) => {
                if(index === action.index && item - action.count >= 0){
                    sum += item - action.count;
                    return item - action.count;
                }
                sum += item;
                return item;
            });

            return {...state, pileList: newPileList, isDone: !sum, nimZeroSum: calculateZeroNimSum(newPileList)};
        default:
            return state;
    }
}