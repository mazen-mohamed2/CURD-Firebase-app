import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { database } from "../../firebaseConfig";

export const EditTodo = ({ todoId, successfulEdit }) => {
    const [err, setErr] = useState('');
    const { todos } = useContext(TodoContext);
    const currentTodo = todos.find(todo => todo.id === todoId);
    const [input, setInput] = useState(currentTodo.title);

    useEffect(() => {
        setInput(currentTodo.title)
    }, [currentTodo.title]);

    const onEditTodo = (e) => {
        e.preventDefault();

        if (input === '') {
            setErr('Please add valid todo!');
            return;
        }

        if (input.length > 25) {
            setErr('Todo must be less then 25 characters!');
            return;
        }

        updateDoc(doc(database, 'todos', todoId), {
            title: input
        })
            .then(() => {
                successfulEdit();
            })
            .catch((err) => {
                setErr(err.message);
            })
    }

    return (
        <section className="add__todo ">
            <h1 className="text-xl mb-4 bg-stone-100 ">ToDo App</h1>
            <form className="add__todo__form " onSubmit={onEditTodo}>
                <label htmlFor="todo"></label>
                <input type="text"
                    id="todo"
                    name="todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-96 outline-none mb-5 py-3 pl-2 focus:pl-4 transition-all border-gray-200 border-2"
                     />
                <button className="add__todo__btn add__todo__btn bg-emerald-700 p-3 text-white rounded-r-lg">Edit Task</button>
                <p className="errors">{err}</p>
            </form>
        </section>
    );
}