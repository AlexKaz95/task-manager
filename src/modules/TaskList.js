import React from 'react'
import '../style/taskList.sass'
import DoneButton from './buttons/DoneButton'
import DeleteButton from './buttons/DeleteButton';
import CancelButton from './buttons/CancelButton'

function renderDate(date) {
    let dateNow = new Date(date);
    let string = dateNow.getDate() + "." + ((+dateNow.getMonth() + 1) > 10 ? (+dateNow.getMonth() + 1) : "0" + (+dateNow.getMonth() + 1));
    return string
}

function diffDate(date) {
    let dateNow = Date.now();
    let diff = Math.round((date - dateNow) / 86400000);
    return diff
}

function TaskList({ taskList, moveTask, currentTab, setExpandTaskId, deleteTask, searchString }) {
    let array = [];
    for (let key in taskList) {
        if (taskList[key].title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
            let arrayMarks = taskList[key].marks.map((item, index) => <span id={index} className="mark">{item}</span>);
            array.push(
                <div className="task__item" id={key} key={key}>
                    <CancelButton taskId={key} moveTask={moveTask} />
                    {/* <DeleteButton taskId={key} deleteTask={deleteTask}/> */}
                    <div className="task__title" id={key} onClick={() => setExpandTaskId(taskList[key].id)}>{taskList[key].title}</div>
                    <div className="task__description">{taskList[key].description}</div>
                    <table className="task__dates">
                        <tr>
                            <td>От</td>
                            <td>{renderDate(taskList[key].date)}</td>
                            <td>До</td>
                            <td>{renderDate(taskList[key].limitDate)}</td>
                        </tr>
                    </table>
                    
                    {currentTab==="inWork"?<DoneButton moveTask={moveTask} taskId={key} />:<></>}
                    <div className="task__marks">{arrayMarks}</div>
                    <div className="clear"></div>
                </div >
            )
        }
    }
    return (
        <div className="task">
            {array}
        </div>
    );
}

export default TaskList