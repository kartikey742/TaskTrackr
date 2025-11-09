import React, { useEffect } from "react";
import { MdDashboard, MdAdd } from "react-icons/md";
import { Task } from "../components/Task";
import { useState } from "react";
import { FormModal } from "../components/FormModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { setTasks, setLoading } from "../store/taskSlice";
export const Dashboard = ({setSearch,search}) => {
  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem("user"))
  
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const {tasks,loading} = useSelector((state) => state.tasks);
    
    useEffect(() => {
       const fetchTasks=async()=>{
        const token = localStorage.getItem("token");
        dispatch(setLoading(true));
        
        try {
       const res=await fetch("http://localhost:5000/api/tasks/get-all",{
           method: "GET",
           headers: {
               Authorization: `Bearer ${token}`
           }
       });
       
       if (!res.ok) {
         dispatch(setLoading(false));
         if (res.status === 401) {
           localStorage.removeItem("token");
           localStorage.removeItem("user");
           window.location.href = "/login";
         }
         return;
       }
       
       const data=await res.json();
         dispatch(setTasks(data.data || []));
         dispatch(setLoading(false));
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
          dispatch(setLoading(false));
        }
      
        };
        fetchTasks();
        
    }, []);
  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);
  const handleAddTask = () => {
   setOpenModal(true);
  };
if(loading){
  return   <div className="fixed inset-0 flex items-center justify-center bg-gray-800  z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
}
else{
  return (

    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6">
     <div className="flex items-center justify-between w-full max-w-xl mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <MdDashboard size={24} color="white" />
          <span>Task Dashboard</span>
        </h1>

      
        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          <MdAdd size={30} />
          Add Task
        </button>
      </div>
<br></br>
        <h1 className="text-2xl font-semibold text-yellow-400 mt-2 mb-6">
  Hey <span className="text-white">{user?.name}, let's start</span> managing your tasks
</h1>

      { filteredTasks?.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No tasks yet.</p>
      ) : (
        <div className="w-full max-w-xl space-y-3">
          {filteredTasks?.map((task) => (
            <Task key={task._id} task={task} setOpenModal={setOpenModal} setModalData={setModalData} />
          ))}
        </div>
      )}

      {openModal && <FormModal setOpenModal={setOpenModal} modalData={modalData} setModalData={setModalData} />}
    </div>
  );

};
}
