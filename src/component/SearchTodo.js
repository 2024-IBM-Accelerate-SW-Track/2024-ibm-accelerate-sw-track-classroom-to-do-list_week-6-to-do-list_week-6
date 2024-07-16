import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
const axios = require("axios");




const SearchTodo = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/get/searchitem?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error searching items", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search for ToDo Item"
          variant="outlined"
          onChange={handleChange}
          value={query}
        />
        <Button
          style={{ marginLeft: "10px", marginTop: 10 }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </form>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.Task}</h3>
            <p>{result.Current_date} - {result.Due_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTodo;
