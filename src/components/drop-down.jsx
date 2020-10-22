import React, { useRef } from 'react';
import "../../node_modules/bulma/bulma.sass";

export default function DropDown({ handleSubmit, handleReset }) {
    let algoType = useRef(null);

    return (
        <nav style={{display:"flex", }} className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="navbar-brand"><span className="icon"><i className="fab fa-centercode"></i></span></div>
            <div className="navbar-menu">
                <div className="navbar-item">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                            <select className="navbar-link has-dropdown" ref={(input) => algoType = input}> Algorithm
                                <option className="navbar-item" value="Dijkstras">Dijkstra's</option>
                                <option className="navbar-item" value="BreadthFirst">Breadth First Search</option>
                                <option className="navbar-item" value="DepthFirst">Depth First Search</option>
                            </select>
                    </form>  
                </div>
                <div className="navbar-item">
                    <input className="button" type="submit" value="Submit" onClick={() => handleSubmit(algoType.value)} />
                </div>
                <div className="navbar-item">
                    <input className="button" type="submit" value="Reset" onClick={() => handleReset()} />
                </div>
            </div>
        </nav>
        
    );
}