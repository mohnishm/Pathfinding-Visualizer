import React, { useRef } from 'react';
import "./drop-down.css";

export default function DropDown({ handleSubmit, handleReset }) {
    let algoType = useRef(null);

    return (
        <div className="drop-down">
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <label><span>Algorithm: </span> 
                    <select ref={(input) => algoType = input}>
                        <option value="Dijkstras">Dijkstra's</option>
                        <option value="BreadthFirst">Breadth First Search</option>
                        <option value="DepthFirst">Depth First Search</option>
                    </select>
                    <input type="submit" value="Submit" onClick={() => handleSubmit(algoType.value)} />
                    <input type="submit" value="Reset" onClick={() => handleReset()} />
                </label>
            </form>  
        </div>
        
    );
}