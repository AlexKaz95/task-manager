import React from 'react'
import '../../style/doneButton.sass'

function DoneButton ({ moveTask, taskId }) {
    return <div className="task__done" id={taskId} data-to="done" onClick={(event) => moveTask(event.currentTarget.id, event.currentTarget.dataset.to)} >&#9745;</div>
}

export default DoneButton