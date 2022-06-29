import { SEARCH } from "../../store/Task/types";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import "./style.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
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
            }, 1200);
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
