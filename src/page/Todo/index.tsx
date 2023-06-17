import React, { useContext, useEffect, useRef, useState } from 'react';
import { RoundButton } from '@/component/Button';
import todoService from '@/api/todoService';
import LoadingContext from '@/context/LoadingContext';
import AlertContext from '@/context/AlertContext';
import ListItem from '@/page/Todo/ListItem';
import Container from '@/component/Container';
import styled from 'styled-components';

export interface CreateTodo {
  todo: string;
}

export interface UpdateTodo extends CreateTodo {
  isCompleted: boolean;
}

export interface TodoValues extends UpdateTodo {
  id: number;
  userId: string | number;
  isModifying?: boolean;
}

const Form = styled.form`
  position: relative;
  max-width: 700px;
  width: 100%;
  display: flex;
  margin: 20px auto 20px;
  gap: 10px;

  input {
    flex: 1;
    height: 50px;
    padding: 8px 80px 8px 30px;
    border: 1px solid #ccc;
    border-radius: 100px;
    font-size: 15px;
    letter-spacing: -0.2px;
  }

  button {
    position: absolute;
    height: 40px;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const P = styled.p`
  text-align: center;
  line-height: 1.6;
`;

const Todo = () => {
  const { isLoading, showLoading, hideLoading } = useContext(LoadingContext);
  const { showAlert } = useContext(AlertContext);
  const [todoList, setTodoList] = useState<TodoValues[]>([]);
  const newTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    showLoading();
    todoService
      .getTodos()
      .then(response => {
        const todoList = response.data;
        setTodoList(todoList);
      })
      .catch(error => {
        console.log(error);
        showAlert({
          title: 'TODO 불러오기 실패',
          content: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
  };

  const createTodo = (data: CreateTodo) => {
    showLoading();
    todoService
      .createTodo(data)
      .then(response => {
        const newTodo = response.data;
        setTodoList(prevState => [...prevState, newTodo]);
      })
      .catch(error => {
        console.log(error);
        showAlert({
          title: 'TODO 추가 실패',
          content: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
  };

  const updateTodo = (id: number, data: UpdateTodo) => {
    showLoading();
    todoService
      .updateTodo(id, data)
      .then(response => {
        const filterTodos = todoList.filter(todo => todo.id !== id);
        const newTodos = [...filterTodos, response.data].sort((a, b) => a.id - b.id);
        setTodoList(newTodos);
      })
      .catch(error => {
        console.log(error);
        showAlert({
          title: 'TODO 수정 실패',
          content: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
  };

  const deleteTodo = (id: number) => {
    showLoading();
    todoService
      .deleteTodo(id)
      .then(() => {
        const filterTodos = todoList.filter(todo => todo.id !== id);
        setTodoList(filterTodos);
      })
      .catch(error => {
        console.log(error);
        showAlert({
          title: 'TODO 삭제 실패',
          content: error.response.data.message,
        });
      })
      .finally(() => hideLoading());
  };

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = newTodoRef.current?.value;
    if (newTodo?.trim()) {
      createTodo({ todo: newTodo });
    }
  };

  return (
    <div>
      <Form onSubmit={handleCreate}>
        <input
          type="text"
          id="newTodo"
          name="newTodo"
          ref={newTodoRef}
          placeholder="오늘의 할일을 입력해 보세요"
          data-testid="new-todo-input"
        />

        <RoundButton type="submit" data-testid="new-todo-add-button" $primary $color="#51414F">
          추가
        </RoundButton>
      </Form>

      <Container $width={700}>
        {!isLoading && !todoList.length ? (
          <P>
            투두리스트가 없습니다. <br />
            새로운 투두 항목을 추가해 보세요.
          </P>
        ) : (
          <Ul>
            {todoList?.map(item => (
              <ListItem key={item.id} todoValues={item} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            ))}
          </Ul>
        )}
      </Container>
    </div>
  );
};

export default Todo;
