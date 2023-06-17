import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@/component/Button';
import todoService from '@/api/todoService';
import LoadingContext from '@/context/LoadingContext';
import AlertContext from '@/context/AlertContext';
import ListItem from '@/page/Todo/ListItem';

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
          children: error.response.data.message,
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
          children: error.response.data.message,
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
          children: error.response.data.message,
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
          children: error.response.data.message,
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
      <form onSubmit={handleCreate}>
        <input type="text" id="newTodo" name="newTodo" ref={newTodoRef} data-testid="new-todo-input" />

        <Button type="submit" data-testid="new-todo-add-button">
          추가
        </Button>
      </form>

      {!isLoading && !todoList.length ? (
        <div>투두리스트가 없습니다.</div>
      ) : (
        <ul>
          {todoList?.map(item => (
            <ListItem key={item.id} todoValues={item} updateTodo={updateTodo} deleteTodo={deleteTodo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
