import { MouseEvent, useState } from "react"

type NewTaskFormProps = {
    addTask: (newTaskData: { text: string, priority: number }) => void
}

export default function NewTaskForm({ addTask }: NewTaskFormProps) {
    const [textValue, setTextValue] = useState("")
    const [priorityValue, setPriorityValue] = useState("")

    const handleSubmit = (event: MouseEvent) => {
        // prevent the page from refreshing
        event.preventDefault() 

        // Call the function from App.tsx passed through props
        addTask({ 
            text: textValue, 
            priority: parseInt(priorityValue) 
        })

        // Clear the form
        setTextValue("")
        setPriorityValue("")
    }

    return (
        <form className="d-flex gap-2 my-3">
            <input
                value={textValue}
                onChange={(event) => setTextValue(event.target.value)}
                type="text"
                placeholder="Task"
                className="form-control"
            />
            <input
                value={priorityValue}
                onChange={(event) => setPriorityValue(event.target.value)}
                type="number"
                placeholder="Priority"
                className="form-control"
            />
            <button className="btn btn-success btn-sm" onClick={handleSubmit}>Add</button>
        </form>
    )
}