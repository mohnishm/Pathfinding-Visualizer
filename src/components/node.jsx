import React from 'react';
import "./node.css";

export default function Node({ row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, 
    onMouseUp }){
    const extraClass = isStart ? 'isStart' : isFinish ? 'isFinish' : isWall ? 'isWall' : '';
    return (
        <div id={`node-${row}-${col}`} className={`node ${extraClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        ></div>
    );
}