import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@/component/Button';
import todoService from '@/api/todoService';
import LoadingContext from '@/context/LoadingContext';
import AlertContext from '@/context/AlertContext';

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
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const { showAlert } = useContext(AlertContext);

  const [dataList, setDataList] = useState<TodoValues[]>([]);
  const newTodoRef = useRef<HTMLInputElement | null>(null);
  const modifyTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    showLoading();
    todoService
      .getTodos()
      .then(response => {
        console.log(response);
        const todoList = response.data;
        setDataList(todoList);
        console.log(todoList, response);
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
        console.log(response);
        // getTodos();
        const newTodo = response.data;
        setDataList(prevState => [newTodo, ...prevState]);
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
        console.log(response);
        // getTodos();
        const newTodo = response.data;
        const filterTodo = dataList.filter(todo => todo.id !== id);
        setDataList([newTodo, ...filterTodo]);
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

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = newTodoRef.current?.value;
    if (newTodo?.trim()) {
      createTodo({ todo: newTodo! });
    }
  };

  const handleChangeMode = (event: React.MouseEvent<HTMLButtonElement>, isModifying: boolean) => {
    event.preventDefault();
    const newTodos = dataList.map(todo => {
      if (todo.id === Number(event.currentTarget.name)) {
        todo.isModifying = isModifying;
      }
      return todo;
    });
    setDataList(newTodos);
  };

  // const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input type="text" id="newTodo" name="newTodo" ref={newTodoRef} data-testid="new-todo-input" />

        <Button type="submit" data-testid="new-todo-add-button">
          추가
        </Button>
      </form>

      <ul>
        {dataList?.map(item => (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.isCompleted} />
              {item?.isModifying ? <input type="text" value={item.todo} ref={modifyTodoRef} /> : <span>{item.todo}</span>}
            </label>
            {item?.isModifying ? (
              <button name={String(item.id)} data-testid="submit-button">
                제출
              </button>
            ) : (
              <button name={String(item.id)} onClick={event => handleChangeMode(event, true)} data-testid="modify-button">
                수정
              </button>
            )}
            {item?.isModifying ? (
              <button name={String(item.id)} onClick={event => handleChangeMode(event, false)} data-testid="cancel-button">
                취소
              </button>
            ) : (
              <button name={String(item.id)} data-testid="delete-button">
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
