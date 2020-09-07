import React from 'react'
import '../style/tabs.sass'

function Tabs({ selectTab, currentTab }) {
    return (
        <div className="tabs" onClick={selectTab}>
            <div className={currentTab==="inWork"?"active":""} id="inWork">В задачнике</div>
            <div className={currentTab==="done"?"active":""} id="done">Выполненые</div>
            <div className={currentTab==="canceled"?"active":""} id="canceled">Отмененные</div>
        </div>
    )
}

export default Tabs