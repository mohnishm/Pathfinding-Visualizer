import { getUnvisitedNeighbors } from "./helperFunctions";

export function dfs(grid, startNode, finishNode){
    const unvisitedNodes = [];
    const visitedNodesInOrder = [];
    
    startNode.isVisited = true;
    
    unvisitedNodes.push(startNode)
    visitedNodesInOrder.push(startNode)

    while(!!unvisitedNodes.length){
        let currentNode = unvisitedNodes.pop();
        
        if(currentNode === finishNode) return visitedNodesInOrder;
        if(currentNode.isWall) continue;
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

        for (const neighbor of unvisitedNeighbors){
            neighbor.previousNode = currentNode;
            unvisitedNodes.push(neighbor);
        }
    }
    return visitedNodesInOrder;
}