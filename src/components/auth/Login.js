import { Link, useNavigate } from "react-router-dom";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useState } from "react";

export const Login = () => {
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');

        if (email === '' || password === '') {
            setErr('Please fill all the fields!');
            return;
        }

        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        navigate('/todos');
                    })
                    .catch((err) => {
                        setErr(err.message);
                    })
            })
    }

    return (
        <div className="auth   absolute  left-56 translate-x-52 translate-y-28">
            <div className="auth__container border-teal-800 border-2 p-8  rounded-md">
                <h1 className="text-3xl mb-4">ToDo List</h1>
                <form className="auth__form flex flex-col" onSubmit={onLogin}>
                    <label htmlFor="email" />
                    <input type="text" placeholder="Email" id="email" name="email" className="w-96 outline-none mb-5 py-3 pl-2 focus:pl-4 transition-all border-gray-200 border-2"/>
                    <label htmlFor="password" />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        className="w-96 outline-none mb-5 py-3 pl-2 focus:pl-4 transition-all border-gray-200 border-2"
                    />
                    <button type="submit" className="bg-emerald-700 p-2 text-white rounded-md mb-8">Log In</button>
                    <p className="errors text-red-700 transition-all">{err}</p>
                </form>
            <div className="auth__action border-teal-800  text-center">
                <p>Don't have an account?</p>
                <Link to="/register" className="hover:text-teal-600 active:text-teal-800">Sign up</Link>
            </div>
            </div>
        </div>
    );
}