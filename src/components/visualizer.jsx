import React from 'react';
import Node from './node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstras'
import './visualizer.css';
import DropDown from './drop-down';

const rows = 15;
const columns = 30;
const startRow = 7;
const startCol = 7;
const finishRow = 7;
const finishCol = 20;

export default class Visualizer extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { grid : [], mouseIsPressed: false };
    }
    
    componentDidMount(){
        const initialGrid = getInitialGrid();
        this.setState({ grid: initialGrid });
    }

    handleMouseDown(row, col){
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col){
        if (!this.state.mouseIsPressed)
            return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true});
    }

    handleMouseUp(){
        this.setState({ mouseIsPressed: false});
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node isVisited';
            }, 10 * i);
        }
    }
    
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node shortest-path';
            }, 50 * i);
        }
    }
    
    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[startRow][startCol];
        const finishNode = grid[finishRow][finishCol];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    handleResetBoard() {
        const grid = getInitialGrid()
        for(const row of grid){
            for(const node of row){
                if(node.row === startRow && node.col === startCol){
                    node.isStart = true;
                }
                else if(node.row === finishRow && node.col === finishCol){
                    node.isFinish = true;
                    
                }
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            }
        }
        document.getElementById(`node-${startRow}-${startCol}`).className = 
        'node isStart';
        document.getElementById(`node-${finishRow}-${finishCol}`).className = 
        'node isFinish';
        this.setState({ grid: grid });
        console.log(this.props.algorithm)
    }

    render(){
        return(
            <>  
                <DropDown handleSubmit={() => this.visualizeDijkstra()} 
                handleReset={() => this.handleResetBoard()} />
                <div className="grid">
                    {this.state.grid.map((row, rowId) => 
                        <div key={rowId}>
                            {row.map((node, nodeId) => 
                                <Node key={nodeId} 
                                row={node.row} 
                                col={node.col} 
                                isStart={node.isStart} 
                                isFinish={node.isFinish} 
                                isWall={node.isWall}
                                mouseIsPressed={this.state.mouseIsPressed}
                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                onMouseUp={() => this.handleMouseUp()}></Node>
                            )}
                        </div>  
                    )}
                </div> 
            </>    
        );
    } 
}

function getInitialGrid() {
    const grid = [];
    for(let row = 0; row < rows; row++){
        const currentRow = [];
        for(let col = 0; col < columns ; col++){
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
}

function createNode(row, col) {
    return ({
        row: row,
        col: col,
        isStart: row === startRow && col === startCol,
        isFinish: row === finishRow && col === finishCol,
        isWall: false,
        isVisited: false,
        previousNode: null,
        distance: Infinity
    });
}

function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = grid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
}