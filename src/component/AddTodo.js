import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
const axios = require("axios");


class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      duedate: null
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: Date().toLocaleString('en-US')
    });
  };

  handleDateChange = (event) => {
    let date = null;
    if (event != null) {
      date = new Date(event).toLocaleDateString();
    }
    this.setState({
      duedate: date
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.content.trim()) {
      axios.post('/api/todos', {
        content: this.state.content,
        date: this.state.date,
        duedate: this.state.duedate
      }).then(response => {
        this.props.addTodo(this.state);
        this.setState({
          content: "",
          date: "",
          duedate: null
        });
      }).catch(error => {
        console.error("There was an error adding the todo!", error);
      });
    }
  };

  render() {
    return (
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.duedate}
            onChange={this.handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;
