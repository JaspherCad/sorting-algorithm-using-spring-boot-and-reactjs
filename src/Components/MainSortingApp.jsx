import React, { useState, useCallback, useRef, useEffect } from "react";
import SortingVisualizer from "./SortingVisualizer";
import SortingHeader from "./SortingHeader";

export default function MainSortingApp() {
  const [sortingVisualizers, setSortingVisualizers] = useState([
    { id: 1, method: 'bubble', array: []  }, //class 1.. blank array is for setting new array as shared using map() 
    { id: 2, method: 'merge', array: [] }, //class 2
    { id: 3, method: 'selection', array: [] }
  ]); //the class visualizer, can be added and deleted. think like spring boot bro









  const [arraySize, setArraySize] = useState(10);
  const [customArray, setCustomArray] = useState("");
  const [sharedArray, setSharedArray] = useState([]); 

  //store forda SortingVisualizer instances
  const visualizerRefs = useRef([]);




  const updateArray = useCallback(() => {
    
    let newArray;
    if (customArray) {
      newArray = customArray.split(" ").map(Number).filter(num => !isNaN(num));
    } else {
      newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
    }

    setSharedArray(newArray);
    setSortingVisualizers(prevVisualizers =>
      prevVisualizers.map(visualizer => ({
        ...visualizer,
        array: [...newArray] // Initialize each visualizer with the same shared array
      }))
    );
    
  }, [arraySize, customArray]);











  const handleSortingMethodChange = (id, method) => {
    setSortingVisualizers((prevVisualizers) =>
      prevVisualizers.map((visualizer) =>
        visualizer.id === id ? { ...visualizer, method } : visualizer
      )
    );
  };


  
  const handleArraySizeChange = (event) => {
    setArraySize(Number(event.target.value));
    setCustomArray(""); // Clear custom array input when changing size
    
    updateArray();
    
  };

  const handleCustomArrayChange = (event) => {
    setCustomArray(event.target.value);
    updateArray();
  };

  const addSortingVisualizer = () => {
    const newId = sortingVisualizers.length + 1;
    setSortingVisualizers([...sortingVisualizers, 
      { id: newId, method: 'bubble', array: [...sharedArray] }]);
  };

  const removeSortingVisualizer = (id) => {
    setSortingVisualizers(sortingVisualizers.filter((visualizer) => visualizer.id !== id));
  };

  const getVisualizerPairs = () => {
    const pairs = [];
    for (let i = 0; i < sortingVisualizers.length; i += 2) {
      pairs.push(sortingVisualizers.slice(i, i + 2));
    }
    return pairs;
  };

  // start functuin sorting on all visualizers
  const startAllSorting = () => {
    visualizerRefs.current.forEach(ref => ref?.startSorting()); //if (ref){startSorting}
  };

  useEffect(() => {
    
      alert("HELLO! this is beta update, if your array size exceeds 50, the UI is gonna mess up. IF happened, reload the page and start again. \n PS: you can reach 100 size without UI messing up if you just have 1 sorting visualizer \n--developer");

      alert("Speed setting and explanation of code is to be followed. More sorting will come!");
    
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "black", minHeight: "100vh" }}>
      <button onClick={addSortingVisualizer} style={{ margin: "20px 0" }}>+ Add Sorting Visualizer</button>
      <button onClick={startAllSorting} style={{ marginBottom: "20px" }}>Start All Sorting</button>

      {getVisualizerPairs().map((pair, pairIndex) => (
        <div key={pairIndex} style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "20px" }}>
          {pair.map((visualizer, index) => (
            <div key={visualizer.id} style={{ flex: 1, margin: "0 10px" }}>
              <SortingHeader
                sortingMethod={visualizer.method}

                onSortingMethodChange={(e) => handleSortingMethodChange(visualizer.id, e.target.value)}

                arraySize={arraySize}

                onArraySizeChange={handleArraySizeChange}

                customArray={customArray}
                onCustomArrayChange={handleCustomArrayChange}

              />
              <SortingVisualizer
                ref={el => visualizerRefs.current[visualizer.id] = el} // put ref to each SortingVisualizer
                sortingMethod={visualizer.method}
                array={visualizer.array} // Pass the array to each visualizer because of MAP() fiction.
              />
              <button onClick={() => removeSortingVisualizer(visualizer.id)} style={{ marginTop: "10px" }}>Remove</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
