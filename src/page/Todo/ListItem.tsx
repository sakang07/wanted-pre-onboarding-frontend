import React, { useState } from 'react';
import { TodoValues, UpdateTodo } from '@/page/Todo/index';

interface ListItemProps {
  todoValues: TodoValues;
  updateTodo: (id: number, data: UpdateTodo) => void;
  deleteTodo: (id: number) => void;
}

const ListItem = (props: ListItemProps) => {
  const { todoValues, updateTodo, deleteTodo } = props;
  const [isModifying, setIsModifying] = useState(false);
  const [modifiedTodo, setModifiedTodo] = useState('');

  const handleChangeMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModifying(prevState => !prevState);
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newTodo = { ...todoValues, isCompleted: event.target.checked };
    updateTodo(todoValues.id, newTodo);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setModifiedTodo(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newTodo = { ...todoValues, todo: modifiedTodo };
    updateTodo(todoValues.id, newTodo);
    handleChangeMode(event);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTodo(todoValues.id);
  };

  return isModifying ? (
    <li>
      <label>
        <input type="checkbox" checked={todoValues.isCompleted} onChange={handleChangeChecked} />
        <input type="text" defaultValue={todoValues.todo} onChange={handleChangeInput} />
      </label>
      <button data-testid="submit-button" onClick={handleSubmit}>
        제출
      </button>
      <button data-testid="cancel-button" onClick={handleChangeMode}>
        취소
      </button>
    </li>
  ) : (
    <li>
      <label>
        <input type="checkbox" checked={todoValues.isCompleted} onChange={handleChangeChecked} />
        <span>{todoValues.todo}</span>
      </label>
      <button data-testid="modify-button" onClick={handleChangeMode}>
        수정
      </button>
      <button data-testid="delete-button" onClick={handleDelete}>
        삭제
      </button>
    </li>
  );
};

export default ListItem;
