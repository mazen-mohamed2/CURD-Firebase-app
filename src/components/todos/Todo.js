import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../firebaseConfig";
import { DeleteTodo } from "./DeleteTodo";

export const Todo = ({ todo, onEditHandler }) => {
    const [isChecked, setIsCkecked] = useState(todo.checked);

    const onChangeCheck = async () => {
        try {
            await updateDoc(doc(database, 'todos', todo.id), {
                checked: !todo.checked
            });
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="todo  ">
            <div className="todo__title  flex justify-between bg-slate-700 mb-2 p-3 rounded-sm transition-all">
                <p style={isChecked ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
                 className="text-slate-200 ">{todo.title}</p>
            <div className="todos__btns">
                <label htmlFor="check"></label>
                <input type="checkbox"
                    name="check" id="check"
                    checked={isChecked}
                    onChange={() => setIsCkecked(!todo.checked)}
                    onClick={onChangeCheck}
                    className="mx-2 text-xl cursor-pointer  indeterminate:bg-red-300"
                />
                <i className="fa fa-pencil-square-o mx-2 text-xl cursor-pointer active:text-2xl active:text-slate-800 text-emerald-500" aria-hidden="true" onClick={() => onEditHandler(todo.id)} ></i>
                <DeleteTodo todoId={todo.id}/>
            </div>
            </div>
        </div>
    );
}