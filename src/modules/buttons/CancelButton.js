import React from 'react'

function CancelButton ({ moveTask, taskId }) {
    return <div className="task__canceled" id={taskId} data-to="canceled" onClick={(event) => moveTask(event.target.id, event.target.dataset.to)} >X</div>
}

export default CancelButton