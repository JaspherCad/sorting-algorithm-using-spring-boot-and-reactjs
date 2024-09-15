import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Bar from "./Bar";
import { bubbleSortAPi, mergeSortAPi, selectionSortApi } from "../api/visualizeApiService";

const SortingVisualizer = forwardRef(({ sortingMethod, array }, ref) => {
  const [comparing, setComparing] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arrayState, setArray] = useState([...array]);
  const [sortingTime, setSortingTime] = useState(0);

  const startSorting = async () => {
    setIsSorting(true);
    const startTime = Date.now();
    try {
      let response;
      if (sortingMethod === 'bubble') {
        response = await bubbleSortAPi(arrayState);
      } else if (sortingMethod === 'merge') {
        response = await mergeSortAPi(arrayState);
      } else if (sortingMethod === 'selection') {
        response = await selectionSortApi(arrayState);
      }
      
      await runSortingSteps(response.data);
    } catch (error) {
      console.error('Sorting error:', error);






    } finally {
      const endTime = Date.now();
      setSortingTime((endTime - startTime) / 1000); // Convert milliseconds to seconds
      setIsSorting(false);
    }
  };

  const runSortingSteps = async (arrayOfSteps) => {
    for (let i = 0; i < arrayOfSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const step = arrayOfSteps[i];
      setArray(step.array);

      if (step.comparing !== undefined) {
        setComparing(step.comparing.map(index => [index]));
      } else if (step.leftIndices !== undefined && step.rightIndices !== undefined && step.mergedIndices !== undefined) {
        const combinedIndices = [
          ...step.leftIndices,
          ...step.rightIndices,
          ...step.mergedIndices
        ];
        setComparing(combinedIndices.map(index => [index]));
      } else {
        setComparing([]);
      }
    }
  };














  useEffect(() => {
    setArray([...array]);
  }, [array]);

  useImperativeHandle(ref, () => ({
    startSorting
  }));

  const barWidth = Math.max(10, Math.min(30, 800 / arrayState.length)); 

  return (
    <div style={{ flex: 1, backgroundColor: "black", minHeight: "500px", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: "100%" }}>
        {arrayState.map((value, index) => (
          <Bar
            key={index}
            value={value}
            height={value}
            width={barWidth}
            color={getColorForIndex(index, comparing)}
          />
        ))}
      </div>
      <button onClick={startSorting} disabled={isSorting} style={{ marginTop: "10px" }}>Start Sorting</button>
      {!isSorting && sortingTime > 0 && (
        <div style={{ color: "white", marginTop: "10px" }}>
          Sorting completed in {sortingTime} seconds.
        </div>
      )}
    </div>
  );









  
  function getColorForIndex(index, comparing) {
    const baseColors = ["#ff0000", "#00f6ff", "lime", "yellow", "purple", "cyan"];
    let color = "white";
    for (let i = 0; i < comparing.length; i++) {
      if (comparing[i].includes(index)) {
        color = baseColors[i % baseColors.length];
        break;
      }
    }
    return color;
  }
});

export default SortingVisualizer;
