import React, { useRef } from 'react';
import "./drop-down.css";

export default function DropDown({ handleSubmit, handleReset }) {
    const algoType = useRef(null);

    return (
        <div className="drop-down">
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <label><span>Algorithm: </span> 
                    <select ref={algoType}>
                        <option value="Dijkstras">Dijkstra's</option>
                        <option value="DepthFirst">Depth First Search</option>
                        <option value="BreadthFirst">Breadth First Search</option>
                    </select>
                    <input type="submit" value="Submit" onClick={() => handleSubmit()} />
                    <input type="submit" value="Reset" onClick={() => handleReset()} />
                </label>
            </form>  
        </div>
        
    );
}