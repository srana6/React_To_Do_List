import React, { Component } from 'react';
import './App.css';

var todos = [
  {
    todoTitle: "My First Todo",
    todoResponsible: "Sumit",
    todoDescription: "My First todo description",
    todoPriority: "Low"
  },
  {
    todoTitle: "My Second Todo",
    todoResponsible: "Sumit",
    todoDescription: "My Second todo description",
    todoPriority: "medium"
  },
  {
    todoTitle: "My Third Todo",
    todoResponsible: "Sumit",
    todoDescription: "My Thrid todo description",
    todoPriority: "high"
  }
]

class App extends Component {
  // Setting intial Component State
  constructor(props) {
    super(props);

    this.state = {
      todos
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(todo) {
    this.setState({todo: [...this.state.todos, todo]});
  }

  handleRemoveTodo(index) {
    this.setState({
      todos: this.state.todos.filter(function(e, i) {
        return i !== index;
      })
    })
  }

  render() {
    return (
      <div className="container">
        <Toggle />
        <NameForm />
        <TodoInput onAddTodo={this.handleAddTodo}/>
        <h4>Todo Count: <span className="badge">{this.state.todos.length}</span></h4>
        <ul className="list-group">
          {this.state.todos.map((todo, index) =>
            <li className="list-group-item" key={index}>
              <h4 className="list-group-item-heading">{todo.todoTitle} <small><span className="label label-info">{todo.todoPriority}</span></small></h4>
              <p><span className="glyphicon glyphicon-user"> {todo.todoResponsible}</span></p>
              <p>{todo.todoDescription}</p>
              <button className="btn btn-danger btn-sm" onClick={this.handleRemoveTodo.bind(this, index)}><span className="glyphicon glyphicon-trash"></span> Delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: "",
      todoResponsible: "",
      todoDescription: "",
      todoPriority: "Lowest"
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  //event -> Synthetic Event
  handleSubmit(event) {
    //prevent default behaviour of the html form
    event.preventDefault();
    this.props.onAddTodo(this.state);
    this.setState({
      todoTitle: "",
      todoResponsible: "",
      todoDescription: "",
      todoPriority: "Lowest"
    });
  }

  render() {
    return (
      <div>
        <h4>Add New Todo</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputTodoTitle" className="col-sm-2 control-label">To Do</label>
            <div className="col-sm-10">
              <input  name="todoTitle"
                      type="text"
                      className="form-control"
                      id="inputTodoTitle"
                      value={this.state.todoTitle}
                      onChange={this.handleInputChange}
                      placeholder="Title"></input>
            </div>
            </div>

          <div className="form-group">
            <label htmlFor="inputTodoResponsible" className="col-sm-2 control-label">To Do Responsible</label>
            <div className="col-sm-10">
              <input  name="todoResponsible"
                      type="text"
                      className="form-control"
                      id="inputTodoResponsible"
                      value={this.state.todoResponsible}
                      onChange={this.handleInputChange}
                      placeholder="Responsible"></input>
            </div>
          </div>

          <div className="form-group">
              <label htmlFor="inputTodoDesc" className="col-sm-2 control-label">Description</label>
              <div className="col-sm-10">
                <textarea   name="todoDescription"
                            className="form-control"
                            rows="3"
                            id="inputTodoDesc"
                            value={this.state.todoDescription}
                            onChange={this.handleInputChange}></textarea>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inputTodoPriority" className="col-sm-2 control-label">Priority</label>
              <div className="col-sm-10">
                <select   name="todoPriority"
                          className="form-control"
                          id="inputTodoPriority"
                          value={this.state.todoPriority}
                          onChange={this.handleInputChange}>
                  <option>Lowest</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Highest</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-success">Add Todo</button>
              </div>
            </div>
        </form>
      </div>
    );
  }
}

class Clock extends Component{
  //assigns the initial state
  constructor(props){
    super(props);
    //initializes the state with an object including current time
    this.state = {date: new Date()};
  }

  //lifecycle hooks
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return(
      <div>
        <h1>Hello</h1>
        <h2><FormattedDate date={this.state.date}/></h2>
      </div>
    );
  }
}

class FormattedDate extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
  );
  }
}

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true,
                  showClock: false};

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
      showClock: true
    }));
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={this.handleToggleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
        {this.state.showClock ? <Clock/> : null}
      </button>
    );
  }
}

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleSubmitAction = this.handleSubmitAction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
        value: event.target.value
    });
  }

  handleSubmitAction(event) {
    alert('A name is submitted: '+this.state.value);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmitAction}>
        <label>Name: </label>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
