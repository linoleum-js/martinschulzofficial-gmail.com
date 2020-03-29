import { Reducer, Action } from 'redux';
import { findIndex } from 'lodash';
import { v4 as uuid } from 'uuid';

import { ICardData } from '@models/ICardData';
import { ICardsListState } from '@models/ICardsListState';

const list: ICardData[] = [{
  title: 'Пример текста карточки',
  text: 'Some text',
  id: uuid(),
  column: 'in_progress'
}, {
  title: 'Пример длинного текста карточки, да такого чтобы он вообще не пример длинного текста карточки, да такого чтобы он вообще не',
  text: 'Some text',
  id: uuid(),
  column: 'in_progress'
}];

export enum CardsActionTypes {
  RequestCardsList = 'REQUEST_CARDS_LIST',
  ReceiveCardsList = 'RECEIVE_CARDS_LIST',
  UpdateCard = 'UPDATE_CARD',
  AddCard = 'ADD_CARD'
}

export interface RequestCardsListAction {
  type: CardsActionTypes.RequestCardsList;
}

export interface ReceiveCardsListAction {
  type: CardsActionTypes.ReceiveCardsList;
  payload: ICardData[];
}

export interface UpdateCardAction {
  type: CardsActionTypes.UpdateCard;
  payload: ICardData;
}

export interface AddCardAction {
  type: CardsActionTypes.AddCard;
  payload: ICardData;
}

export type CardsAction =
  RequestCardsListAction |
  ReceiveCardsListAction |
  UpdateCardAction |
  AddCardAction;

export const updateCard = (data: ICardData) => (dispatch: Function) => {
  dispatch({
    type: CardsActionTypes.UpdateCard,
    payload: data
  });
};

export const addCard = (data: ICardData) => (dispatch: Function) => {
  dispatch({
    type: CardsActionTypes.AddCard,
    payload: data
  });
};

export const fetchCardsList = () => async (dispatch: Function) => {
  // Show preloader, request data
  // ...
  // When loaded:
  dispatch({
    type: CardsActionTypes.ReceiveCardsList,
    payload: list
  });
};

const initialState: ICardsListState = {
  list: [],
  isLoading: false
};

const CardsListReducer: Reducer<ICardsListState> = (
  state: ICardsListState = initialState,
  action: Action
): ICardsListState => {
  const { type } = action as CardsAction;

  switch (type) {
    case CardsActionTypes.RequestCardsList:
      return {
        isLoading: true,
        list: []
      };

    case CardsActionTypes.ReceiveCardsList:
      const { payload: cardsList } = action as ReceiveCardsListAction;
      return {
        isLoading: false,
        list: cardsList
      };

    case CardsActionTypes.UpdateCard: {
      const { payload: card } = action as UpdateCardAction;
      const { list } = state;
      const index: number = findIndex(list, { id: card.id });
      const newList = [...list];
      newList[index] = card;

      return {
        isLoading: false,
        list: newList
      };
    }

    case CardsActionTypes.AddCard: {
      const { payload: card } = action as AddCardAction;
      const { list } = state;
      return {
        isLoading: false,
        list: [...list, { ...card, id: uuid() }]
      };
    }

    default:
      return state;
  }

};

export default CardsListReducer;