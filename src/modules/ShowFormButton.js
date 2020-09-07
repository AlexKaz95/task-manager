import React from 'react'

function ShowFormButton ({showForm}) {
    return (
        <div className="add-task" onClick={showForm}>
            Новая задача
          </div>
    )
}

export default ShowFormButton