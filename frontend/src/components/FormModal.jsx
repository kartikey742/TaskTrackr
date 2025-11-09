
import React, { useState } from "react";
import { setTasks, setLoading } from "../store/taskSlice";
import { useDispatch,useSelector } from "react-redux";
export const FormModal = ({setOpenModal, modalData,setModalData}) => {
  const {tasks} = useSelector((state) => state.tasks);
  const [title, setTitle] = useState(modalData?.title || "");
  const [description, setDescription] = useState(modalData?.description || "");
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a task title.");
    if (!description.trim()) return alert("Please enter a task description.");
    
    dispatch(setLoading(true));
    try{
      let res;
      if(!modalData){
     res=await fetch("http://localhost:5000/api/tasks/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({title,description})
    });}
    else{
      res=await fetch(`http://localhost:5000/api/tasks/update/${modalData.id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({title,description})
      });
    }
    
    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.message || "Failed to save task");
      dispatch(setLoading(false));
      return;
    }
    
    const data=await res.json();
    if(data.success){
      if(modalData){
        const updatedTasks = tasks.map((task)=>(task._id===data.data._id ? data.data : task));
       dispatch(setTasks(updatedTasks));
      }
      else{
        const updatedTasks=[...tasks,data.data];
       dispatch(setTasks(updatedTasks));
    }

    }
}catch(error){
  alert("Network error. Please try again.");
  console.error("Error adding task:",error);
}   
finally{
    setOpenModal(false);
    setTitle("");
    setDescription("");
    dispatch(setLoading(false));
    setModalData(null);
  }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setOpenModal(false);
    setModalData(null);
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
     <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-center mb-2">{modalData ? "Edit Task" : "Add New Task"}</h2>

      <div className="flex flex-col gap-1 items-start ">
        <label className="text-sm text-gray-300">Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      <div className="flex flex-col gap-1 items-start ">
        <label className="text-sm text-gray-300">Description</label>
        <textarea
          placeholder="Enter task details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        ></textarea>
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          {modalData ? "Edit Task" : "Add Task"}
        </button>
      </div>
      </form>
      </div>
      
      </div>
  );
};
