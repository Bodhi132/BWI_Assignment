import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/UserContext'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setToken, setIsLoggedIn } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username,
                password
            });

            setToken(response.data.token);  // Store the token using setToken

            // Verify the token
            const authResponse = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                },
            });

            if (!authResponse.ok) {
                throw new Error('User not authenticated');
            }
            else {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true)
                navigate("/home");
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false)
        }
    }



    return (
        <div className='w-full h-screen flex justify-center items-center'>
            {
                loading ? (
                    <div>Loading....</div>
                ) : (
                    <form className="w-2/5" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="text" id="username" onChange={e => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" id="password" placeholder='password' onChange={e => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </form>
                )
            }
        </div>
    )
}

export default Login