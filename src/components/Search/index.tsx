import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { SEARCH } from "../../store/Task/types";
import "./style.scss";

const Search:React.FC = () => {
    const [search,setSearch] = useState("")
    const dispatch = useDispatch()
    return (
        <form
            className="searchForm" 
            onSubmit={(e)=>{
            e.preventDefault()
            dispatch({search,type:SEARCH})
        }}>
        <input 
            onChange={(e)=>{setSearch(e.target.value)}}
            value = {search}
            placeholder="Search" 
            type="search" 
            className="search"/>
        </form>
    )
}

export default Search