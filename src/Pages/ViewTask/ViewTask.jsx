import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Home from "../Home/Home";
import { Bounce, ToastContainer, toast } from "react-toastify";


const ViewTask = () => {
    const axiosPublic = useAxiosPublic();
    const [allTask, setAllTask] = useState([])
    const [editTask, setEditTask] = useState([])
    const [taskEditedId, setTaskEditedId] = useState(null)

    useEffect(() => {
        axiosPublic.get('/all-task')
            .then(res => {
                setAllTask(res.data)
            })
    }, [axiosPublic])

    // delete handeler
    const handleDelete = id => {
        axiosPublic.delete(`/single-task/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    toast.success('Task Deleted Successfully!!', {
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
                const filteredTask = allTask && allTask.filter(aTask => aTask._id !== id)
                setAllTask(filteredTask)
            })
    }

    // incomplete to complete btn handeler
    const handleIncomplete = id => {
        const filteredComplete = allTask && allTask.find(aTask => aTask._id === id);
        console.log(filteredComplete.incomplete);
        if (filteredComplete.incomplete === 'Completed') {
            toast.error('Task Already Completed', {
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

        const completed = {
            incomplete: 'Completed'
        }
        axiosPublic.patch(`/completed-task/${id}`, completed)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Task Completed Successfully!!', {
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
    }

    // edit handler
    const handleEdit = id => {
        setTaskEditedId(id)
        const filteredEditedTask = allTask && allTask.filter(aTask => aTask._id === id);
        setEditTask(filteredEditedTask)
    }

    const editHandeler = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;
        const select = form.select.value;

        const editedInfo = {
            title: title,
            description: description,
            date: date,
            select: select
        }
        axiosPublic.patch(`/edit-task/${taskEditedId}`, editedInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Task Updated Successfully!!', {
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
    }


    return (
        <div>
            <Home>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="text-white text-2xl">
                                    <th></th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Selected</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allTask && allTask.map((singleTask, index) => <tr key={singleTask?._id}>
                                        <th>{index + 1}</th>
                                        <td>{singleTask?.title}</td>
                                        <td>{singleTask?.description}</td>
                                        <td>{singleTask?.date}</td>
                                        <td>{singleTask?.select}</td>
                                        <td className="space-x-2">
                                            {/* incomplete btn */}
                                            <button onClick={() => handleIncomplete(singleTask?._id)} className={
                                                (singleTask.incomplete === 'Incomplete') ?
                                                    `btn btn-active bg-rose-800 hover:bg-rose-900 text-white border-none` : `btn btn-active bg-amber-600 text-white border-none hover:bg-amber-700`}>{singleTask?.incomplete}</button>

                                            {/* edit btn */}
                                            {/* edit modal starts */}
                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                            <button className="btn btn-active btn-accent px-7" onClick={() => document.getElementById('my_modal_5').showModal()}><span onClick={() => handleEdit(singleTask?._id)} >Edit</span></button>

                                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box bg-[#040813]">
                                                    <h3 className="font-bold text-lg">Edit Task</h3>
                                                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                                        {
                                                            editTask && editTask.map(aTask => <form onSubmit={editHandeler} key={aTask?._id} className="card-body bg-[#040813] rounded shadow shadow-amber-500">
                                                                <div className="form-control">
                                                                    <label className="label">
                                                                        <span className="label-text text-white text-lg">Title</span>
                                                                    </label>
                                                                    <input name="title" type="text" placeholder="Title" defaultValue={aTask?.title} className="input input-bordered text-gray-950" required />
                                                                </div>
                                                                <div className="form-control">
                                                                    <label className="label">
                                                                        <span className="label-text text-white text-lg">Description</span>
                                                                    </label>
                                                                    <textarea name="description" defaultValue={aTask?.description} className="textarea textarea-bordered text-gray-950" placeholder="Description"></textarea>
                                                                </div>

                                                                <div className="form-control">
                                                                    <label className="label">
                                                                        <span className="label-text text-white text-lg">Due Date</span>
                                                                    </label>
                                                                    <input name="date" type="date" className="input input-bordered text-gray-950" defaultValue={singleTask?.date} required />
                                                                </div>
                                                                <div className="form-control">
                                                                    <label className="label">
                                                                        <span className="label-text text-white text-lg">Due Date</span>
                                                                    </label>
                                                                    <select className="select select-bordered text-gray-950" name="select" defaultValue={singleTask?.select}>
                                                                        <option disabled selected>Select</option>
                                                                        <option value="group-a">Group A</option>
                                                                        <option value="group-b">Group B</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-control mt-6">
                                                                    <button className="btn bg-[#020611] hover:bg-amber-500 text-white hover:text-white border-t-0 border-l border-r border-b border-amber-500 hover:border-black">Update Task</button>
                                                                </div>
                                                            </form>)
                                                        }
                                                    </div>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-active bg-amber-600 px-7 text-white hover:bg-amber-700 border-none">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                            {/* edit modal ends */}


                                            {/* delete btn */}
                                            <button onClick={() => handleDelete(singleTask?._id)} className="btn btn-active bg-[#a60001] text-white hover:bg-[#a60000ee] border-none">Delete</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Home>
            <ToastContainer />
        </div>
    );
};

export default ViewTask;