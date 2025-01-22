import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState({
        description: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = axios.post("http://localhost:3000/api/todos",
                formData,
                { withCredentials: true } // Include cookies
            );
        } catch (error) {
        }

        console.log(formData);
    }

    const fetchProtectedData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/todos", {
                withCredentials: true, // Include cookies in the request
            });
            setUser(response.data.user)
        } catch (error) {
            navigate('/');
        }
    };

    useEffect(() => {

        fetchProtectedData();
    }, [navigate]);

    const logout = () => {
        try {
            const response = axios.post("http://localhost:3000/api/auth/logout", {
            }, { withCredentials: true });
            console.log('logged out');
            navigate('/');
        } catch (error) {
            navigate('/');
        }
    }


    return (
        <>

            <div className="flex items-center justify-center h-screen">
                <div className="w-[70vw] overflow-auto">
                    <section className="justify-center h-full">
                        <div className="h-full">
                            <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16 h-full">
                                <div className='justify-center'>
                                    <div className="w-full">

                                        <div className="relative py-6 group">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="col-start-1 col-end-3">
                                                    <div className="justify-start">Welcome, {user.name}</div>
                                                </div>
                                                <div className="col-end-7 col-span-2">
                                                    <button onClick={logout} className="justify-end">Log out</button>
                                                </div>
                                            </div>

                                            <form onSubmit={handleSubmit}>
                                                <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                        <textarea
                                                            name="description"
                                                            rows="4"
                                                            className="focus:outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                            placeholder="Write your to-do..."
                                                            required
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        ></textarea>
                                                    </div>
                                                    <div className="flex items-center justify-end p-3 border-t dark:border-gray-600">
                                                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                            Add Task
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className='pl-2'>
                                            <div className="relative py-6 group">
                                                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:h-full before:px-px before:bg-slate-300 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                                                    <div className="text-md text-slate-200 text-left pl-4">Acme was founded in Milan, Italy</div>
                                                </div>
                                                <div className="text-slate-400 text-left pl-4">Posted on: 20/5/2029</div>
                                            </div>


                                            <div className="relative py-6 group">

                                                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:h-full before:px-px before:bg-slate-300 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                                                    <div className="text-md text-slate-200 text-left pl-4">Reached 5K customers</div>
                                                </div>
                                                <div className="text-slate-400 text-left pl-4">Posted on: 20/5/2029</div>

                                            </div>


                                            <div className="relative py-6 group">

                                                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:h-full before:px-px before:bg-slate-300 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                                                    <div className="text-md text-slate-200 text-left pl-4">Acquired various companies, inluding Technology Inc.</div>
                                                </div>
                                                <div className="text-slate-400 text-left pl-4">Posted on: 20/5/2029</div>

                                            </div>


                                            <div className="relative py-6 group">

                                                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:h-full before:px-px before:bg-slate-300 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                                                    <div className="text-md text-slate-200 text-left pl-4">Acme went public at the New York Stock Exchange</div>
                                                </div>
                                                <div className="text-slate-400 text-left pl-4">Posted on: 20/5/2029</div>

                                            </div>

                                            <div className="relative py-6 group">


                                                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:h-full before:px-px before:bg-slate-300 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                                                    <div className="text-md text-slate-200 text-left pl-4">Acme went public at the New York Stock Exchange</div>
                                                </div>
                                                <div className="text-slate-400 text-left pl-4">Posted on: 20/5/2029</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>




        </>

    )
}

export default Home