import React from 'react';
import { useSelector } from 'react-redux';

import { Card } from '@components/Card/Card';
import { Button } from '@components/shared/Button/Button';
import { Icon } from '@components/shared/Icon/Icon';
import { AddCardForm } from '@components/AddCardForm/AddCardForm';

import { IAppState } from '@models/IAppState';
import { ICardsListState } from '@models/ICardsListState';
import { ICardData } from '@models/ICardData';

import style from  './Column.module.scss';

export interface IColumnProps {
  name: string;
  id: string;
  cards: ICardData[];
}

export const Column: React.FunctionComponent<IColumnProps> = ({
  name, id, cards
}) => {

  console.log(cards);

  return <div className={style.Column}>
    <h2 className={style.ColumnHeader}>{name}</h2>
    {cards.map((card: ICardData) => {
      return <Card
        {...card}
        key={card.id}
      />;
    })}

    <AddCardForm
      onAdd={() => console.log('add')}
    />
  </div>;
};