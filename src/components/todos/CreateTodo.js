import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../firebaseConfig';
import { Logout } from '../auth/Logout';

export const CreateTodo = () => {
    const [err, setErr] = useState('');
    const [input, setInput] = useState('');
    const { loggedUser } = useContext(AuthContext);

    const onCreateTodo = (e) => {
        e.preventDefault();

        if (input === '') {
            setErr('Please add valid todo!');
            return;
        }

        if (input.length > 25) {
            setErr('Todo must be less then 25 characters!');
            return;
        }

        addDoc(collection(database, 'todos'), {
            title: input,
            uid: loggedUser.uid,
            checked: false,
            timestamp: serverTimestamp()
        })
            .then(() => {
                setInput('');
            })
            .catch((err) => {
                setErr(err.message);
            })
    }

    return (
        <section className="add__todo">
        <div className='flex justify-between'>

            <h1 className="text-3xl mb-4">ToDo App</h1>
            <Logout />
        </div>
            <form className="add__todo__form" onSubmit={onCreateTodo}>
                <label htmlFor="todo"></label>
                <input type="text"
                    id="todo"
                    name="todo"
                    placeholder='Add todo'
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                    className="w-96 outline-none mb-5 py-3 pl-2 focus:pl-4 transition-all border-gray-200 border-2"
                    />
                <button className="add__todo__btn bg-emerald-700 p-3 text-white rounded-r-lg">Add New Task</button>
                <p className="errors">{err}</p>
            </form>
        </section>
    );
}