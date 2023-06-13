import { del, get, post, put } from '@/helper/apiHelper';
import { URL } from '@/constant';
import { CreateTodo, UpdateTodo } from '@/page/Todo';
import { AxiosResponse } from 'axios';

const createTodo = (data: CreateTodo): Promise<AxiosResponse> => post(URL.TODOS, data);
const getTodos = (): Promise<AxiosResponse> => get(URL.TODOS);
const updateTodo = (id: number, data: UpdateTodo): Promise<AxiosResponse> => put(URL.TODOS + '/' + id, data);
const deleteTodo = (id: number): Promise<AxiosResponse> => del(URL.TODOS + '/' + id);

const todoService = { createTodo, getTodos, updateTodo, deleteTodo };

export default todoService;
