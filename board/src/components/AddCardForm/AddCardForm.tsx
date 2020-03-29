import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

import { Column, IColumnProps } from '@components/Column/Column';
import { Button, ButtonGroup } from '@components/shared/Button/Button';


import { addCard } from '@redux/cards';
import {
  fetchCardsList
} from '@redux/cards';

import { IAppState } from '@models/IAppState';
import { ICardsListState } from '@models/ICardsListState';
import { ICardData } from '@models/ICardData';

import style from './AddCardForm.module.scss';

export interface IAddCardFormProps {
  column: string;
}

export const AddCardForm: React.FunctionComponent<IAddCardFormProps> = ({
  column
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();

  const handleAdd = function () {
    // onAdd(title);
    close();
    dispatch(addCard({ title, text: '', id: uuid(), column }));
  };

  const close = function () {
    setIsOpen(false);
    setTitle('');
  };

  // const handleAdd = function () {
  // };

  return <div>
    {isOpen ?
      <div>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={style.AddFromTextarea}
          placeholder="Введите текст карточки"
        >
        </textarea>
        <div>
          <ButtonGroup>
            <Button
              type="primary"
              onClick={() => handleAdd()}
              disabled={!title}
            >
              Добавить карточку
            </Button>
            <Button
              type="secondary"
              onClick={() => close()}
              icon="close"
            >
              Отмена
            </Button>
          </ButtonGroup>
        </div>
      </div>:
      <Button
        type="secondary"
        onClick={() => setIsOpen(true)}
        icon="add"
      >
        Добавить еще одну карточку
      </Button>
    }
    
  </div>;
};