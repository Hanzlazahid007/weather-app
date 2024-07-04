import React from "react";
import "./Search.css";

const Search = ({ handleSearchChange, handleSearchSubmit, search }) => {
  return (
    <div className="search">
      <form onSubmit={handleSearchSubmit}>
        <input
          className=""
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Enter the city name"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
