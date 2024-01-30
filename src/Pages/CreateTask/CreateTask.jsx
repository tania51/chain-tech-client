import Title from "../../Components/Title/Title";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Home from "../Home/Home";
import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const CreateTask = () => {
    const axiosPublic = useAxiosPublic();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;
        const select = form.select.value;

        const taskData = {
            title: title,
            description: description,
            incomplete: 'Incomplete',
            date: date,
            select: select
        }
        axiosPublic.post('/create-task', taskData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Task Created Successfully!!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            })
            .then(err => {
                if (err) {
                    toast.error('Task not Created.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            })

        form.title.value = '';
        form.description.value = '';
        form.date.value = '';
        form.select.value = '';
    }

    return (
        <div>
            <Home>
                <Title>Create Task</Title>
                <div className="card shrink-0 w-full max-w-sm lg:max-w-lg shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body bg-[#040813] rounded shadow shadow-amber-500">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white text-base">Title</span>
                            </label>
                            <input name="title" type="text" placeholder="Title" className="input input-bordered text-gray-950" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white text-base">Description</span>
                            </label>
                            <textarea name="description" className="textarea textarea-bordered text-gray-950" placeholder="Description"></textarea>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white text-base">Due Date</span>
                            </label>
                            <input name="date" type="date" className="input input-bordered text-gray-950" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white text-base">Due Date</span>
                            </label>
                            <select className="select select-bordered text-gray-950" name="select">
                                <option disabled selected>Select</option>
                                <option value="group-a">Group A</option>
                                <option value="group-b">Group B</option>
                            </select>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#020611] hover:bg-amber-500 text-white hover:text-white border-t-0 border-l border-r border-b border-amber-500 hover:border-black">Create Task</button>
                        </div>
                    </form>
                </div>
            </Home>
            <ToastContainer />
        </div>
    );
};

export default CreateTask;