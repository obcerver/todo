import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Connect to the Socket.IO server

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState({
        description: ""
    });
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/todos", {
                withCredentials: true, // Include cookies in the request
            });
            setTodos(response.data.todos);
            setUser(response.data.user);
        } catch (error) {
            navigate('/');
        }
    };

    useEffect(() => {
        fetchTodos();

        // Listen for real-time updates
        socket.on('todoAdded', (newTodo) => {
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        });

        return () => {
            socket.off('todoAdded'); // Cleanup listener
        };
    }, [navigate]);

    const handleDoubleClick = (todo) => {
        setEditingTodoId(todo.id);
        setEditValue(todo.description);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleBlur = async (todoId) => {
        setEditingTodoId(null);

        try {
            // Update the description on the server
            await axios.patch(`http://localhost:3000/api/todos/${todoId}`, {
                description: editValue,
            }, { withCredentials: true });

            // Update the local state
            setTodos((prevTodos) => prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, description: editValue } : todo
            ));
        } catch (error) {
            console.error("Failed to update todo", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/api/todos",
                formData,
                { withCredentials: true } // Include cookies
            );

            setFormData({
                description: ''
            });

            const update = await axios.get("http://localhost:3000/api/todos", {
                withCredentials: true, // Include cookies in the request
            });
            setTodos(update.data.todos);
            setUser(update.data.user);
        } catch (error) {
            console.error("Failed to add todo", error);
        }
    };

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const logout = () => {
        try {
            axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            navigate('/');
        }
    };

    return (
        <>
            <div className="flex items-start justify-center">
                <div className="w-[80vw] overflow-auto">
                    <section className="justify-center">
                        <div className="">
                            <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
                                <div className='justify-center'>
                                    <div className="w-full">
                                        <div className="relative group">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="col-start-1 col-end-3">
                                                    <div className="justify-start">Welcome, {user.name}</div>
                                                </div>
                                                <div className="col-end-7 col-span-2">
                                                    <button onClick={logout} className="justify-end">Log out</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
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
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                                        >
                                                            Add Task
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="pl-2 h-[50vh] overflow-y-auto">
                                            {todos.length > 0 ? (
                                                todos.map((todo) => (
                                                    <div className="relative py-6 group" key={todo.id}>
                                                        <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:h-full before:px-px before:bg-slate-300 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                                                            {editingTodoId === todo.id ? (
                                                                <textarea
                                                                    rows="4"
                                                                    className="border border-gray-200 mx-4 pl-2 p-2 w-screen px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 rounded-xl"
                                                                    required
                                                                    value={editValue}
                                                                    onChange={handleEditChange}
                                                                    onBlur={() => handleBlur(todo.id)}
                                                                    autoFocus
                                                                ></textarea>
                                                            ) : (
                                                                <div 
                                                                    className="text-md text-slate-200 text-left pl-4"
                                                                    onDoubleClick={() => handleDoubleClick(todo)}
                                                                >
                                                                    {todo.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-slate-400 text-left pl-4">
                                                            Posted on: {formatDate(todo.CreatedOn)}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-left">Please start adding your todos</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;
