import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TodoContext } from '../../contexts/TodoContext';

import { CreateTodo } from "./CreateTodo";
import { DeleteTasks } from "./DeleteTasks";
import { EditTodo } from "./EditTodo";
import { Todo } from "./Todo";

export const Todos = () => {
    const { todos } = useContext(TodoContext);
    const { loggedUser } = useContext(AuthContext);
    const [create, setCreate] = useState(true);
    const [id, setId] = useState('');
    const currentTodos = todos.filter(todo => todo.uid === loggedUser?.uid)

    const onEditHandler = (todoId) => {
        setCreate(false);
        setId(todoId);
    }

    const successfulEdit = () => {
        setCreate(true);
    }

    return (
        <div className="todos absolute left-56 translate-x-52 translate-y-20 border-teal-800 border-2 p-8  rounded-md">
            
            {create ? <CreateTodo /> : <EditTodo todoId={id} successfulEdit={successfulEdit} />}
            <section className="todos__container overflow-y-auto h-56">
                <h1 className="bg-stone-100 text-xl mb-3">ToDo List</h1>
                {currentTodos.length > 0
                    ? currentTodos.map(todo => <Todo key={todo.id} todo={todo} onEditHandler={onEditHandler} />)
                    : <p>No todos here!</p>}
            </section>
            <DeleteTasks />
        </div>
    );
}