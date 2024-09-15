import React from 'react';

const SortingHeader = ({ sortingMethod, onSortingMethodChange, arraySize, onArraySizeChange, customArray, onCustomArrayChange }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <label style={{ color: "white", marginRight: "10px" }}>Sorting Method:</label>
      <select value={sortingMethod} onChange={onSortingMethodChange} style={{ marginRight: "20px" }}>
        <option value="bubble">Bubble Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="selection">Selection Sort</option>

      </select>

      <label style={{ color: "white", marginRight: "10px" }}>Array Size:</label>
      <input 
        type="range" 
        min="10" 
        max="100" 
        value={arraySize} 
        onChange={onArraySizeChange} 
        style={{ marginRight: "20px" }} 
      />
      <span style={{ color: "white" }}>{arraySize}</span>

      <div style={{ marginTop: "10px" }}>
        <label style={{ color: "white", marginRight: "10px" }}>Custom Array (comma-separated):</label>
        <input 
          type="text" 
          value={customArray} 
          onChange={onCustomArrayChange} 
          style={{ marginRight: "20px" }} 
        />
      </div>
    </div>
  );
};

export default SortingHeader;
