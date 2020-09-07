import React from 'react';
import './style/App.sass';
import MainContent from './modules/MainContent'
import Form from './modules/Form'
import TaskWindow from './modules/TaskWindow'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inWork: {},
      done: {},
      canceled: {},
      currentTab: 'inWork',
      formIsOpen: false,
      selectedTask: null,
      taskWindowIsOpen: false,
      lastId: 0
    }
  }

  componentDidMount() {
    this.setState({
      inWork: JSON.parse(localStorage.getItem('inWork')) || {},
      done: JSON.parse(localStorage.getItem('done')) || {},
      canceled: JSON.parse(localStorage.getItem('canceled')) || {},
      lastId: JSON.parse(localStorage.getItem('lastId')) || 0,
    })
  }

  selectTab = event => this.setState({ currentTab: event.target.id })

  changeVisibilityForm = () => { this.setState((prevStat) => { return { formIsOpen: !prevStat.formIsOpen } }) }

  updateLocalStorage = (key, value) => localStorage.setItem(key, value)

  addTask = task => {
    this.setState((prevStat) => {
      return { inWork: { ...prevStat.inWork, [prevStat.lastId]: task }, lastId: prevStat.lastId + 1 }
    })
    this.setState(state => this.updateLocalStorage("inWork", JSON.stringify(state.inWork)))
  }

  moveTask = (taskId, to) => {
    this.setState((prevStat) => {
      const { [taskId]: value, ...updatedCurrentTab } = prevStat[prevStat.currentTab];
      value.status = to
      return {
        [to]: { ...prevStat[to], [taskId]: value },
        [prevStat.currentTab]: updatedCurrentTab
      }
    })
    this.setState(state => {
      this.updateLocalStorage(state.currentTab, JSON.stringify(state[state.currentTab]))
      this.updateLocalStorage(to, JSON.stringify(state[to]))
    })
  }

  deleteTask = (taskId) => {
    this.setState(prevState => {
      const { [taskId]: value, ...updatedCurrentTab } = prevState.done
      return {
        done: updatedCurrentTab
      }
    })
  }

  formSubmit = createdTask => {
    this.addTask(createdTask)
    this.changeVisibilityForm()
    this.setState(state => this.updateLocalStorage("lastId", state.lastId))
  }

  taskWindowHandler = () => {
    this.setState(prevState => {
      return { taskWindowIsOpen: !prevState.taskWindowIsOpen }
    })
  }

  setExpandTaskId = (selectedTaskId) => {
    this.setState(prevState => {
      return {
        selectedTask: Object.assign({}, prevState[prevState.currentTab][selectedTaskId],)
      }
    });
    this.taskWindowHandler()
  }

  render() {
    if (this.state.formIsOpen) {
      return (
        <div className="main">
          <Form formSubmit={this.formSubmit} lastId={this.state.lastId} closeForm={this.changeVisibilityForm} />
          <MainContent showForm={this.changeVisibilityForm} selectTab={this.selectTab} taskList={this.state[this.state.currentTab]} moveTask={this.moveTask} currentTab={this.state.currentTab} setExpandTaskId={this.setExpandTaskId} />
        </div>
      )
    } else if (this.state.taskWindowIsOpen) {
      return (<>
        <div className="main">
          <TaskWindow selectedTask={this.state.selectedTask} taskWindowHandler={this.taskWindowHandler} moveTask={this.moveTask} />
          <MainContent showForm={this.changeVisibilityForm} selectTab={this.selectTab} taskList={this.state[this.state.currentTab]} moveTask={this.moveTask} currentTab={this.state.currentTab} setExpandTaskId={this.setExpandTaskId} />
        </div>
      </>)
    }
    return (
      <div className="main">
        <MainContent showForm={this.changeVisibilityForm} selectTab={this.selectTab} taskList={this.state[this.state.currentTab]} moveTask={this.moveTask} deleteTask={this.deleteTask} currentTab={this.state.currentTab} setExpandTaskId={this.setExpandTaskId} />
      </div>
    );
  }
}

export default App;
