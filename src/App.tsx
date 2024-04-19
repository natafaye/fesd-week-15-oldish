import { useEffect, useState } from "react"
import NewTaskForm from "./NewTaskForm"

const URL = "https://6621c5cb27fcd16fa6c7e701.mockapi.io/tasks"

type Task = { 
  id: string, 
  text: string, 
  priority: number 
}

function App() {
  // State starts out empty, then is loaded in from the backend
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // Wrap the nasty async code in another function
    const fetchTasks = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      setTasks(data)
    }
    // Immediately call that function and do NOT wait for it
    fetchTasks()
  }, []) // run ONCE when the app component first loads in
  // DISCLAIMER: it will actually run twice in dev mode

  const deleteTask = async (taskId: string) => {
    // update the backend
    await fetch(URL + "/" + taskId, {
      method: "DELETE"
    })

    // update the frontend
    setTasks(tasks.filter(
      task => task.id !== taskId
    ))
  }

  const addTask = async (newTaskData: { text: string, priority: number }) => {
    // update the backend
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskData)
    })
    // The newly created task will have the new id on it, which is very important
    const newlyCreatedTask = await response.json()

    // update the frontend
    setTasks([ ...tasks, newlyCreatedTask ])
  }

  return (
    <div className="m-3">
      <h3>Tasks</h3>
      <NewTaskForm addTask={addTask} />
      {tasks.map(task => (
        <div key={task.id}>
          <input type="checkbox" onChange={() => deleteTask(task.id)} />
          {" "}{task.text} ({task.priority})
        </div>
      ))}
    </div>
  )
}

export default App
