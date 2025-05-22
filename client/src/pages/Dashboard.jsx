import React,{useState,useEffect} from 'react';
import { NavLink, Outlet } from 'react-router';
import { RxHamburgerMenu } from "react-icons/rx";
import { getAllTasks} from '../services/supbase.service';
import { GoogleGenAI } from "@google/genai";




const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
const geminiAPI = import.meta.env.VITE_GEMINI_API_KEY


  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await getAllTasks();
      if (!error) setTasks(data);
    };
    fetchTasks();
  }, []);

  const summarizePendingTasks = async () => {
    const pending = tasks.filter(task => !task.completion);

    const pendingText = pending.map((task, index) => `${index + 1}. ${task.title}: ${task.description || "No details"}`).join('\n');

    setLoadingSummary(true);

    try {
      const genAI=new GoogleGenAI(geminiAPI);
      const response=await genAI.generateContent({
        model:"gemini-2.0-flash",
        text:`Summarize the following pending tasks:\n${pendingText}`
      })

      setSummary(response);
    } catch (error) {
      console.error("Error summarizing tasks:", error);
      setSummary("Failed to generate summary.");
    }

    setLoadingSummary(false);
  };

  return (
    <div className='w-full md:px-6 px-3 py-4 flex flex-col items-center'>
      <div className='flex md:flex-row flex-col w-full gap-x-3 md:gap-y-3 gap-y-5'>
        
        {/* Sidebar Section */}
        <div className='bg-card-bg rounded-2xl dark:bg-dark-card-bg lg:w-[20%] w-full py-5 px-3 text-center flex flex-col gap-y-5'>
          <div className='flex justify-between lg:text-xl md:text-lg text-[1.2rem] font-[400]'>
            <p className='text-heading1 dark:text-dark-heading1'>Menu</p>
            <RxHamburgerMenu />
          </div>
          <div className='w-full text-justify'>
            <p className='text-heading2 dark:text-dark-heading2 lg:text-lg md:text-[1rem] text-[0.9rem]'>Tasks</p>
            <div className="flex flex-col gap-2 mt-2">
              <NavLink 
                to="/add-task"
                className={({ isActive }) => 
                  `p-2 text-sm ${isActive ? 'bg-brand text-white' : 'text-gray-600'} rounded-md`
                }
              >
                Add New Task
              </NavLink>
              <button
                onClick={summarizePendingTasks}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 text-sm transition"
              >
                {loadingSummary ? 'Summarizing...' : 'Summarize Pending'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='lg:w-[75%] w-full'>
          {/* Navigation Tabs */}
          <div className="md:max-w-7xl w-full flex md:justify-evenly justify-between p-2 bg-brand-contrast rounded-lg">
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
              }
            >
              All Tasks
            </NavLink>
            <NavLink 
              to="/pending" 
              className={({ isActive }) => 
                isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
              }
            >
              Pending
            </NavLink>
            <NavLink 
              to="/completed" 
              className={({ isActive }) => 
                isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
              }
            >
              Completed
            </NavLink>
          </div>

          {/* Summary Output */}
          {summary && (
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 my-4 rounded-md">
              <h2 className="font-semibold mb-2">Summary of Pending Tasks:</h2>
              <p>{summary}</p>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;