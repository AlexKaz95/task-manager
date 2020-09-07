import React from 'react'
import '../style/form.sass'


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createTask: {
        title: 'Новая задача ' + this.props.lastId,
        description: 'Описание отсутствует.',
        date: Date.now(),
        limitDate: Date.now() + 604800000,
        id: this.props.lastId,
        status: 'inWork',
        marks: [],
        priority: 1
      },
      marksList: ['срочно', "домашние дела", "JS"],
      createMarks: ''
    }
  }

  setPropertyCurrentTask(key, value) {
    this.setState({
      createTask: {
        ...this.state.createTask,
        [key]: value,
        date: Date.now()
      }
    })
  }

  changeHandler = (event) => {
    this.setPropertyCurrentTask(event.target.name, event.target.value)
  }

  setMarks = (event) => {
    let index = Number(event.target.id)
    let copy = this.state.marksList
    let element = copy.splice(index, 1)
    this.setState(prevState => {
      return {
        createTask: { ...prevState.createTask, marks: [...prevState.createTask.marks, ...element] },
        marksList: copy
      }
    })
  }

  unsetMarks = (event) => {
    let index = Number(event.target.id)
    let copy = this.state.createTask.marks
    let element = copy.splice(index, 1)
    this.setState(prevState => {
      return {
        createTask: { ...prevState.createTask, marks: copy },
        marksList: [...prevState.marksList, element]
      }
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.formSubmit(this.state.createTask)
  }


  render() {
    let renderMarkList = this.state.marksList.map((item, index) => <span id={index} onClick={this.setMarks} className="mark">{item}</span>)
    let selectedMarkList = this.state.createTask.marks.map((item, index) => <span id={index} onClick={this.unsetMarks} className="mark">{item}</span>)
    return (
      <div className='create-new-task'>
      <div className="form-wrapper">
        <span className="closer" onClick={this.props.closeForm}>X</span>
        <form autoComplete="off" action="" className="add-task" onSubmit={this.submitHandler}>
          <div className="input-wrap">
            <label for="">Название задачи</label>
            <input name="title" type="text" placeholder={this.state.createTask.title} onChange={this.changeHandler} />
          </div>
          <div className="input-wrap">
            <label for="">Срок выполнения</label>
            <input name="limitDate" type="date" onChange={this.changeHandler} />
          </div>
          <div className="input-wrap">
            <label for="">Приоритет</label>
            <input name="priority" type="number" onChange={this.changeHandler} placeholder={this.state.createTask.priority}/>
          </div>
          <div className="input-wrap">
            <label for="">Метки задачи</label>
            <div className="marks-input">
              {selectedMarkList}
            </div>
            <div className="mark-field">
              {renderMarkList}
            </div>
            <div className="add-marks">Добавить метку</div>
          </div>
          <div className="input-wrap">
            <label for="">Описание задачи</label>
            <textarea name="description" type="text" placeholder={this.state.createTask.description} onChange={this.changeHandler}></textarea>
          </div>
          <input type="submit" value="Добавить" />
        </form>
      </div>
      </div>
    )
  }
}

export default Form