import React from "react";
import { useState } from "react";
import { MdModeEditOutline, MdOutlineDeleteForever } from "react-icons/md";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { setTasks, setLoading } from "../store/taskSlice";
import { useDispatch,useSelector } from "react-redux";
export const Task = ({ task,setOpenModal,setModalData }) => {
  const dispatch=useDispatch();
  const {tasks} = useSelector((state) => state.tasks);
  const token=localStorage.getItem("token");
  const [value,setValue]=useState(task.status);
  
  const handleUpdate=async(id)=>{
    dispatch(setLoading(true));
    try{
      const res=await fetch(`http://localhost:5000/api/tasks/statusUpdate/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({status: !value})
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update status");
        dispatch(setLoading(false));
        return;
      }
      
      const data=await res.json();
      
      if(data.success){
        setValue(!value);
        const updatedTasks = tasks.map((t) =>
          t._id === id ? { ...t, status: !value } : t
        );
        dispatch(setTasks(updatedTasks));
      }
    }catch(error){
      alert("Network error. Could not update status.");
      console.error("Error updating task:",error);
    } 
    finally{
      dispatch(setLoading(false));
    }
  };
  const deleteTask=async(id)=>{
    dispatch(setLoading(true));
    try{
      const res=await fetch(`http://localhost:5000/api/tasks/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete task");
        dispatch(setLoading(false));
        return;
      }
      
      const data=await res.json();
      if(data.success){
        const updatedTasks = tasks.filter((task)=>task._id!==id);
        dispatch(setTasks(updatedTasks));
      }
    }catch(error){
      alert("Network error. Could not delete task.");
      console.error("Error deleting task:",error);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div
      className={`flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md border border-gray-700 gap-6 ${
        task.status ? "opacity-80" : ""
      }`}
    >
      <div className="flex w-[80%] gap-8 items-center">

        <input
          type="checkbox"
          checked={value}
          className="w-[1rem] h-[1rem] accent-blue-500 cursor-pointer"
          onClick={()=>{handleUpdate(task._id)}}
        />
        <div className="flex flex-col gap-2 items-start">

        <div
          className={`text-xl font-bold ${
            value ? "line-through text-gray-400" : "text-white"
            }`}
            >
          {task.title}
        </div>
        <div
          className={` text-left ${
            value ? "line-through text-gray-400" : "text-white"
            }`}
            >
          {task.description}
              </div>
          </div>
        </div>
  
      <span
        className={`text-sm px-3 py-1 rounded-full ${
          value ? "bg-green-600" : "bg-yellow-500 text-black"
        }`}
      >
        {value ? "Completed" : "Pending"}
      </span>

      <div className="flex items-center">
        <button className="text-blue-500 hover:text-blue-700 mr-4" onClick={() => {setModalData({title:task.title,description:task.description,id:task._id}); setOpenModal(true);}}>
          <MdModeEditOutline size={20} className="text-blue-500 hover:text-blue-700  cursor-pointer" />
        </button>
        <button className="text-red-500 hover:text-red-700" onClick={() => {deleteTask(task._id)}}>
          <BsTrash size={20} className="text-red-500 hover:text-red-700 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};
