import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SEARCH } from "../../store/Task/types";
import "./style.scss";

const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let searchTimeOut: any = 0;
  return (
    <form
      className="searchForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        onChange={(e) => {
          if (searchTimeOut) {
            clearTimeout(searchTimeOut);
            searchTimeOut = 0;
          } else {
            searchTimeOut = setTimeout(() => {
              dispatch({ search: e.target.value, type: SEARCH });
            }, 1500);
          }
          setSearch(e.target.value);
        }}
        value={search}
        placeholder="Search"
        type="search"
        className="search"
      />
    </form>
  );
};

export default Search;
