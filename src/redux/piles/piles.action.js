import {INIT_PILE_LIST, REMOVE_FROM_PILE} from '../../constants/actionTypes';

export const initPiles = (piles) => ({
    type: INIT_PILE_LIST,
    piles
})

export const removeFromPile = (count, index) => ({
    type: REMOVE_FROM_PILE,
    count,
    index
})