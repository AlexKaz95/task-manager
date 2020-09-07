import React from 'react'

function DeleteButton ({ taskId, deleteTask }) {
    return <div className="task__delete" id={taskId} onClick={(event) => deleteTask(event.target.id)} >&#9746;</div>
}

export default DeleteButton