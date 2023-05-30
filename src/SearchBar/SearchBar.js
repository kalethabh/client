import React from "react";
import { useState } from "react";
import './SearchBar.css'

const SearchBar = () => {
    
    const [name, setName] = useState('');
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    return ( 
        <div className="search" >
            <input type="text" placeholder="Buscar..." onChange={e => {handleInputChange(e)}} value={name} className="input" />
            <button type="submit" className="btn" onSubmit={e => {handleSubmit(e)}}>Buscar</button>   
        </div>
     );
}
 
export default SearchBar;