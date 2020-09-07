import React from 'react'
import '../style/taskWindow.sass'


function renderDate(date) {
    let dateNow = new Date(date);
    let string = dateNow.getDate() + "." + ((+dateNow.getMonth() + 1) > 10 ? (+dateNow.getMonth() + 1) : "0" + (+dateNow.getMonth() + 1));
    return string
}

function ChangeTitle(event){
   
        console.log('Oh, hello...');

}

function TaskWindow({ selectedTask, taskWindowHandler, moveTask }) {
    console.log(selectedTask)
    
    return (
        <>
            <div className="expand-task">
                <div className="wrapper">
                    <span className="closer" onClick={taskWindowHandler}>X</span>
                    <div className="title">
                        <h2 onDoubleClick={ChangeTitle}>{selectedTask.title}</h2>
                        <div className="status">
                            <p>Status:</p>
                            <select defaultValue={selectedTask.status} onChange={event => moveTask(selectedTask.id, event.target.value)} name="" id="">
                                <option value="inWork">В работе</option>
                                <option value="done">Выполнено</option>
                                <option value="canceled">Отменено</option>
                            </select>
                        </div>
                    </div>

                    <div className="description">
                        <p>{selectedTask.description}</p>
                        <div className="date">
                            <p>Дата создания: <span>{renderDate(selectedTask.date)}</span></p>
                            <p>Срок выполнения: <span>{renderDate(selectedTask.limitDate)}</span></p>
                        </div>
                    </div>

                    <div className="comments-field"></div>

                </div>

            </div>
        </>
    )
}

export default TaskWindow