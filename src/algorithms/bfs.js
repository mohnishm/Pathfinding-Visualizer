import { getUnvisitedNeighbors } from './helperFunctions'

export function bfs(grid, startNode, finishNode) {
    const unvisitedNodes = [];
    const visitedNodesInOrder = [];
    
    startNode.isVisited = true;
    unvisitedNodes.push(startNode);
    visitedNodesInOrder.push(startNode);

    while(!!unvisitedNodes.length){
        let currentNode = unvisitedNodes.shift()

        if(currentNode.isWall) continue;
        if(currentNode === finishNode) return visitedNodesInOrder;
        let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

        for(const neighbor of unvisitedNeighbors){
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            unvisitedNodes.push(neighbor);
            visitedNodesInOrder.push(neighbor);
        }
    }
    return visitedNodesInOrder;
}