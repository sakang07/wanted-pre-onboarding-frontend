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
  const [modifyingDataList, setModifyingDataList] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    showLoading();
    todoService
      .getTodos()
      .then(response => {
        const todoList = response.data;
        setDataList(todoList);
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
        // getTodos();
        const newTodo = response.data;
        setDataList(prevState => [...prevState, newTodo]);
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
        const filterTodos = dataList.filter(todo => todo.id !== id);
        const newTodos = [...filterTodos, response.data].sort((a, b) => a.id - b.id);
        setDataList(newTodos);
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
        const filterTodos = dataList.filter(todo => todo.id !== id);
        setDataList(filterTodos);
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

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const todoItem = dataList.find(todo => todo.id === Number(name));
    if (todoItem) {
      const { todo } = todoItem;
      const newTodo = { todo, isCompleted: checked };
      updateTodo(Number(name), newTodo);
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = { [name]: value };
    setModifyingDataList(prevState => ({ ...prevState, ...newValue }));
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id: string = event.currentTarget.name;
    const todoItem = dataList.find(todo => todo.id === Number(id));
    if (todoItem) {
      const { isCompleted } = todoItem;
      const newTodo = { isCompleted, todo: modifyingDataList[id] };
      updateTodo(Number(id), newTodo);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    deleteTodo(Number(name));
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input type="text" id="newTodo" name="newTodo" ref={newTodoRef} data-testid="new-todo-input" />

        <Button type="submit" data-testid="new-todo-add-button">
          추가
        </Button>
      </form>

      <ul>
        {dataList?.map(item =>
          item?.isModifying ? (
            <li key={item.id}>
              <label>
                <input type="checkbox" name={String(item.id)} checked={item.isCompleted} onChange={handleChangeChecked} />
                <input type="text" name={String(item.id)} defaultValue={item.todo} onChange={handleChangeInput} />
              </label>
              <button name={String(item.id)} data-testid="submit-button" onClick={handleUpdate}>
                제출
              </button>
              <button name={String(item.id)} onClick={event => handleChangeMode(event, false)} data-testid="cancel-button">
                취소
              </button>
            </li>
          ) : (
            <li key={item.id}>
              <label>
                <input type="checkbox" name={String(item.id)} checked={item.isCompleted} onChange={handleChangeChecked} />
                <span>{item.todo}</span>
              </label>
              <button name={String(item.id)} onClick={event => handleChangeMode(event, true)} data-testid="modify-button">
                수정
              </button>
              <button name={String(item.id)} onClick={handleDelete} data-testid="delete-button">
                삭제
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Todo;
