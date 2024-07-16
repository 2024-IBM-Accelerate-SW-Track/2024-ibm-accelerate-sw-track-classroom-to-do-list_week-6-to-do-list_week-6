import React, { Component } from "react";
import Todos from "../component/todos";
import AddTodo from "../component/AddTodo";
import "../pages/Home.css";
const axios = require("axios");


class Home extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: todos,
    });
  };

  addTodo = (todo) => {
    const exists = this.state.todos.find(t => t.content === todo.content);
    if (exists || todo.duedate == null || todo.duedate === "Invalid Date") { return }
    todo.id = Math.random();

    const jsonObject = {
      id: todo.id,
      task: todo.content,
      currentDate: todo.date,
      dueDate: todo.duedate
    };

    axios({
      method: "POST",
      url: "http://localhost:8080/add/item",
      data: { jsonObject },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
        console.log(res.data.message);
    });

    let new_list = [...this.state.todos, todo];
    this.setState({
      todos: new_list,
    });
  };

  render() {
    return (
      <div className="Home">
        <h1>Todo's </h1>
        <AddTodo addTodo={this.addTodo} />
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default Home;
