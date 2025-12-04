import React, {useState, useEffect} from "react";
import "./App.css";

const NavBar = () => {
  const [isOnDisplay, setisOnDisplay]= useState(false);
  const [titleValue, settitleValue] = useState("");
  const[aboutValue, setaboutValue] = useState("");
  const[date, setdate] = useState(() => {
    return new Date().toLocaleString()
  });
  const handleTaskTitle =(event) => {
    settitleValue(event.target.value)
}
  const handleAboutTask = (event) => {
    setaboutValue(event.target.value)
  }
  const [backgrndcolor, setbackgrndcolor] = useState("high");
  const addRateClass = (event) =>{
    if (event.target.value === "high") {
      setbackgrndcolor("high")
    } else if(event.target.value === "medium") {
      setbackgrndcolor("medium")
    } else{
      setbackgrndcolor("low")
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("Work/Professional");
  const [selectedCategoryClass, setSelectedCategoryClass] = useState("category-work");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    switch(value) {
      case "Work/Professional":
        setSelectedCategoryClass("category-work");
        break;
      case "Personal/Home":
        setSelectedCategoryClass("category-personal");
        break;
      case "Study/Learning":
        setSelectedCategoryClass("category-study");
        break;
      case "Hobbies/Recreational":
        setSelectedCategoryClass("category-hobbies");
        break;
      case "Health/Wellness":
        setSelectedCategoryClass("category-health");
        break;
      case "Social":
        setSelectedCategoryClass("category-social");
        break;
      case "Development":
        setSelectedCategoryClass("category-development");
        break;
      case "Finance":
        setSelectedCategoryClass("category-finance");
        break;
      default:
        setSelectedCategoryClass("");
    }
  };
const [limitValue, setlimitValue] = useState("");
   const handleLimitValue = (event) => {
     setlimitValue(event.target.value)
   }

  const [taskCards, settaskCards] = useState(JSON.parse(localStorage.getItem("task-cards") || "[]"));
  const [deletingTasks, setDeletingTasks] = useState([]); // New state to manage deleting tasks

  useEffect(
    () => {
      try {
      window.localStorage.setItem("task-cards", JSON.stringify(taskCards))
    } catch (error) {
        console.log("error"+ error)
      }
    }, [taskCards]
  );
  const handleCreateTask = () => {
    if (titleValue.trim() !== "")  {
      const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: titleValue,
      about: aboutValue,
      rate: backgrndcolor,
      category: selectedCategory,
      categoryClass: selectedCategoryClass,
      limit: limitValue,
    };
    settaskCards((prevTask) => [...prevTask, newTask]);
    settitleValue("");
    setaboutValue("");
    setlimitValue("");
    setisOnDisplay(false);}
    return ;
  };
  
  const handleDeleteTask = (id) => {
    setDeletingTasks((prev) => [...prev, id]); // Mark task as deleting
    setTimeout(() => {
      settaskCards((prevTask) => prevTask.filter((task) => task.id !== id));
      setDeletingTasks((prev) => prev.filter((taskId) => taskId !== id));
    }, 500);
  };
  
  return(
    <>
      <section className="create-task-section">
        <button className="create-btn" onClick={ () =>{setisOnDisplay(!isOnDisplay); settitleValue(""); setaboutValue("")}}>➕ Create new task</button>
        <section className="create-task-section-notification-login">
          <button className="notification-btn">🔔</button>
          <button className="user-btn" ><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"/></svg></button>
        </section>
      </section>
      <section className="task-popup-section" style={{display: isOnDisplay ? "flex" : "none"}}>
        <button onClick={() => {setisOnDisplay(false) }} id="popUpCloseBtn" className="popup-close-btn" >❌</button>
        <h1>Create Task</h1>
        <label className="Tlab" htmlFor="popupTitle">Title:</label>
        <input onChange={handleTaskTitle} value={titleValue} type="text" name="popupTitle" id= "popupTitle" />
        <label htmlFor="popupAbout">About:</label>
        <input type="text" value={aboutValue} onChange={handleAboutTask} name="popupAbout" id="popupAbout" />
        <label htmlFor="timeLimit">Time Limit:</label>
        <input type="text" value={limitValue} onChange={handleLimitValue} name="timeLimit" id="timeLimit" />
        
        <label htmlFor="rate">Rate-Task:</label>
        <select onChange={addRateClass} className={`rate ${backgrndcolor}`} name="rate" id="Rate">
          <option value="high"><span>High</span></option>
          <option  value="medium"><span>medium</span></option>
          <option value="low"><span>low</span></option>
        </select>
        
        <label htmlFor="category">Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange} className={`rate ${selectedCategoryClass}`} name="category" id="category">
          <option value="Work/Professional"><span>Work/Professional</span></option>
          <option  value="Personal/Home"><span>Personal/Home</span></option>
          <option value="Study/Learning"><span>Study/Learning</span></option>
          <option value="Hobbies/Recreational"><span>Hobbies/Recreational</span></option>
          <option value="Health/Wellness"><span>Health/Wellness</span></option>
          <option value="Social"><span>Social</span></option>
          <option value="Development"><span>Development</span></option>
          <option value="Finance"><span>Finance</span></option>
        </select>
        <button id="popupCreateTaskBtn" className={`popup-create-task-btn ${titleValue ? 'active' : ''}`}   disabled = {titleValue ? false : true} onClick={handleCreateTask}>Create</button>
      </section>
      {
        taskCards.map((task) =>(
           <section
             key={task.id}
             className={`card-list-background ${deletingTasks.includes(task.id) ? "deleting" : ""}`}
           >
        <section className="card-list">
          <div>
          <h2 id="cardTaskTitle">{task.title}</h2>      
            <button onClick={() => handleDeleteTask(task.id)} className="delete-btn"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
            
          </div>
          <p id="cardAboutTask">{task.about}</p>
          <p id="taskDate">Time Limit: {task.limit}</p>
          <p className="creation-date">{`Created on: 🗓️ ${date}`}</p>
          <div>
            <div className="mood">
              <p className={task.categoryClass}>{task.category}</p>
            </div>
            <p className={`rating ${task.rate}`}>{task.rate}</p>
            
          </div>
        </section>      
           </section>
        ))
      }
    </>
  )
}
export default NavBar;
