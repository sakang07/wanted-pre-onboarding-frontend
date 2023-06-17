import React, { useState } from 'react';
import { TodoValues, UpdateTodo } from '@/page/Todo/index';
import styled from 'styled-components';
import { RoundButton } from '@/component/Button';
import { Input } from '@/component/TextField';

interface ListItemProps {
  todoValues: TodoValues;
  updateTodo: (id: number, data: UpdateTodo) => void;
  deleteTodo: (id: number) => void;
}

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const Label = styled.label`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  & input:checked + span {
    text-decoration: line-through;
    color: #d3d3d3;
  }
`;

const Checkbox = styled.input`
  -webkit-appearance: none;
  flex: none;
  width: 16px;
  height: 16px;
  padding: 0;
  margin: 0;
  margin-top: 8px;
  outline: 1px solid #36454f;
  border: 3px solid #fff;
  border-radius: 100px;
  cursor: pointer;

  &:checked {
    background-color: #d8bfd8;
  }
`;

const Span = styled.span`
  min-width: 100px;
  min-height: 34px;
  margin-left: 12px;
  padding-top: 6px;
  padding-right: 20px;
  font-size: inherit;
  font-weight: 500;
  line-height: 1.4;
  word-break: break-word;
  letter-spacing: -0.2px;
`;

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
    if (modifiedTodo) {
      const newTodo = { ...todoValues, todo: modifiedTodo };
      updateTodo(todoValues.id, newTodo);
    }
    handleChangeMode(event);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTodo(todoValues.id);
  };

  return isModifying ? (
    <Li>
      <Label>
        <Checkbox type="checkbox" checked={todoValues.isCompleted} onChange={handleChangeChecked} />
        <Input type="text" data-testid="modify-input" defaultValue={todoValues.todo} onChange={handleChangeInput} />
      </Label>
      <RoundButton type="button" data-testid="submit-button" onClick={handleSubmit} $primary $color="#E37383">
        제출
      </RoundButton>
      <RoundButton type="button" data-testid="cancel-button" onClick={handleChangeMode} $color="#71797E">
        취소
      </RoundButton>
    </Li>
  ) : (
    <Li>
      <Label>
        <Checkbox type="checkbox" checked={todoValues.isCompleted} onChange={handleChangeChecked} />
        <Span>{todoValues.todo}</Span>
      </Label>
      <RoundButton type="button" data-testid="modify-button" onClick={handleChangeMode} $primary>
        수정
      </RoundButton>
      <RoundButton type="button" data-testid="delete-button" onClick={handleDelete} $color="#71797E">
        삭제
      </RoundButton>
    </Li>
  );
};

export default ListItem;
