const Task=require('../models/Task');
const mongoose=require('mongoose');
const createTask=async(req,res)=>{
    try{
        const{title,description}=req.body;
        const newTask=await Task.create({
            userId: new mongoose.Types.ObjectId(req.user.id),
            title,
            description
        });
        await newTask.populate('userId')
        res.status(201).json({success:true,data:newTask});
    }catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};
const getAllTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({userId:req.user.id}).populate('userId');
        
        res.status(200).json({success:true,data:tasks});
    }catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};
const updateStatus=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const{status}=req.body;
        const task=await Task.findById(taskId);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        await Task.findByIdAndUpdate(taskId,{status});  
        res.status(200).json({success:true,message:"Status updated successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};
const updateTask=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const{title,description}=req.body;
        const task=await Task.findById(taskId);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        const newTask=await Task.findByIdAndUpdate(taskId,{title,description},{new:true}).populate('userId');  
        res.status(200).json({data:newTask,success:true,message:"Task updated successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};
const deleteTask=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const task=await Task.findById(taskId);
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({success:true,message:"Task deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
};
module.exports={createTask,getAllTasks,updateStatus,updateTask,deleteTask};
