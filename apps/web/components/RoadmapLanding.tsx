"use client";

import React, { useCallback, memo, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import SlidingTable from "./SlidingTable"; 

const CustomNode = memo(({ data }) => {
  const { onNodeClick } = data;
  return (
    <div
      className="px-4 py-2 shadow-md rounded-md bg-white dark:bg-[#020817] border-2 border-stone-400 cursor-pointer"
      onClick={() => onNodeClick(data.name)}
    >
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
});

const nodeTypes = { custom: CustomNode };

const initNodes = [
  {
    id: "1",
    type: "custom",
    data: { name: "Array and Hashing", job: "Start Here", emoji: "📚" },
    position: { x: 0, y: 50 },
    draggable: false,
  },
  {
    id: "2",
    type: "custom",
    data: { name: "Pointer", job: "Basic", emoji: "🔗" },
    position: { x: -200, y: 200 },
    draggable: false,
  },
  {
    id: "3",
    type: "custom",
    data: { name: "Stack", job: "Intermediate", emoji: "📦" },
    position: { x: 200, y: 200 },
    draggable: false,
  },
  {
    id: "4",
    type: "custom",
    data: { name: "Binary Search", job: "Advanced", emoji: "🔍" },
    position: { x: -300, y: 350 },
    draggable: false,
  },
  {
    id: "5",
    type: "custom",
    data: { name: "Sliding Window", job: "Advanced", emoji: "🌊" },
    position: { x: 0, y: 350 },
    draggable: false,
  },
  {
    id: "6",
    type: "custom",
    data: { name: "Linked List", job: "Advanced", emoji: "🔗" },
    position: { x: 300, y: 350 },
    draggable: false,
  },
  
];

const initEdges = [
  { id: "e1-2", source: "1", target: "2", style: { stroke: "#4A90E2", strokeWidth: 4 } },
  { id: "e1-3", source: "1", target: "3", style: { stroke: "#4A90E2", strokeWidth: 4 } },
  { id: "e2-4", source: "2", target: "4", style: { stroke: "#4A90E2", strokeWidth: 4 } },
  { id: "e2-5", source: "2", target: "5", style: { stroke: "#4A90E2", strokeWidth: 4 } },
  { id: "e2-6", source: "2", target: "6", style: { stroke: "#4A90E2", strokeWidth: 4 } },
];

export function RoadmapLanding({ problems }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [selectedNodeName, setSelectedNodeName] = useState("");

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const handleNodeClick = (nodeName) => {
    setSelectedNodeName(nodeName);
    setIsTableOpen(true);
  };

  const handleCloseTable = () => {
    setIsTableOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseTable();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen relative">
      <div style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              onNodeClick: handleNodeClick,
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          className="bg-white dark:bg-[#020817]"
          zoom={0.8}
          minZoom={0.5}
          maxZoom={1.5}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <SlidingTable isOpen={isTableOpen} onClose={handleCloseTable} problems={problems} /> 
    </div>
  );
}
