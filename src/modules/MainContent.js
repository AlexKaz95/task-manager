import React, { useState } from 'react'
import TaskList from './TaskList'
import Filter from './Filter'
import Tabs from './Tabs'
import ShowFormButton from './ShowFormButton'


function MainContent({ taskList, moveTask, currentTab, setExpandTaskId, deleteTask, selectTab, showForm }) {
    const [searchString, setSearchString] = useState('')
        return (
            <>
            <Tabs selectTab={selectTab} currentTab={currentTab} />
            <div className="main-field">
                <div className="top-main-contant">
                    <ShowFormButton showForm={showForm}/>
                    <Filter getSearchParams={setSearchString} searchString={searchString}/>
                </div>
                <TaskList searchString={searchString} taskList={taskList} moveTask={moveTask}  currentTab={currentTab} setExpandTaskId={setExpandTaskId} deleteTask={deleteTask} />
            </div>
            </>
        )
}

export default MainContent