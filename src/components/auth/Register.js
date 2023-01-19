import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../../firebaseConfig";

export const Register = () => {
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const onRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        if (email === '' || password === '' || repeatPassword === '') {
            setErr('Please fill all fields!');
            return;
        }

        if (password !== repeatPassword) {
            setErr('Password and confirmation password dont match');
            return;
        }

        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((res) => {
                        setDoc(doc(database, 'users', res.user.uid), {
                            email,
                            uid: res.user.uid
                        });
                        navigate('/todos');
                    })
                    .catch((err) => {
                        setErr(err.message);
                    })
            })
    }

    return (
        <div className="auth absolute  left-56 translate-x-52 translate-y-28 ">
            <div className="auth__container border-teal-800 border-2 p-8  rounded-md">
                <h1 className="text-3xl mb-4">ToDo List</h1>
                <form className="auth__form  flex flex-col" onSubmit={onRegister}>
                    <label htmlFor="email" />
                    <input type="text" placeholder="Email" id="email" name="email" className="w-96 outline-none mb-5 py-3 pl-2 focus:pl-4 transition-all border-gray-200 border-2" />
                    <label htmlFor="password" />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        className="w-96 outline-none mb-5 py-3 pl-2 focus:pl-4 transition-all border-gray-200 border-2"
                    />
                    <label htmlFor="repeatPassword" />
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        id="repeatPassword"
                        name="repeatPassword"
                        className="w-96 outline-none mb-5 py-3 pl-2 focus:pl-4 transition-all border-gray-200 border-2"
                    />
                    <button type="submit" className="bg-emerald-700 p-2 text-white rounded-md mb-8">Register</button>
                    <p className="errors text-red-700 transition-all">{err}</p>
                </form>
            <div className="auth__action border-teal-800  text-center">
                <p>Have an account?</p>
                <Link to="/" className="hover:text-teal-600 active:text-teal-800">Log in</Link>
            </div>
            </div>
        </div>
    );
}