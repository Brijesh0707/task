import React, { useState, useEffect } from "react";
import { auth, firestore } from "../Config/Firebaseconfig.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "../Componets/Allcss.css";

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCurrentUser = () => {
      auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (user) {
          fetchTasks(user);
        }
      });
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  const fetchTasks = async (user) => {
    try {
      const tasksQuery = query(
        collection(firestore, "user_tasks"),
        where("createdBy", "==", user.uid)
      );
      const tasksSnapshot = await getDocs(tasksQuery);
      const tasksData = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskCreation = async (e) => {
    e.preventDefault();

    if (title === "" || description === "" || dueDate === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const taskData = {
        title,
        description,
        dueDate,
        assignedTo: currentUser.uid,
        createdBy: currentUser.uid,
        creatorName: currentUser.displayName,
      };

      await addDoc(collection(firestore, "user_tasks"), taskData);

      setTitle("");
      setDescription("");
      setDueDate("");

      fetchTasks(currentUser);

      alert("Task created successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadMore = (taskId) => {
    
    const task = tasks.find((task) => task.id === taskId);
  
    if (task) {
            const updatedTasks = tasks.map((t) =>
        t.id === taskId ? { ...t, showFullDescription: true } : t
      );
  
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <section id="main-task">
        <div className="container-fluid justify-content-evenly">
          <div className="row">
            <div className="col-d-10">
              <h1 className="text-center">Task-Management App</h1>
              <div className="profile">
                <h3>PROFILE: {currentUser && currentUser.displayName}</h3>
                <NavLink to="/">
                  <button type="button" id="logout">Logout</button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10" id="task01">
              <form onSubmit={handleTaskCreation}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit">Create Task</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10" id="task03">
              <ul>
                <li>task-title</li>
                <li>task-description</li>
                <li>task-due-date</li>
                <li>task-assigned-to</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10" id="task02">
              <br />
              <ul>
                {tasks.map((task) => (
                  <li key={task.id}>
                    <h3>{task.title}</h3>
                    {task.description.length > 100 ? (
                      <p>
                        {task.description.substr(0, 100)}...
                        <span className="read-more" onClick={() => handleReadMore(task.id)}>
                          Read more
                        </span>
                      </p>
                    ) : (
                      <p>{task.description}</p>
                    )}
                    <p>Due Date: {task.dueDate}</p>
                    <p>Assigned To: {task.assignedTo}</p>
                    <p>Created By: {task.creatorName}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Task;
