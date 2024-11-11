<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { csv } from "d3-fetch";
    import * as d3 from "d3";
  
    let data = [];
    let windowStart = 0; // Start index for the 10-year window
    const dispatch = createEventDispatcher();
    let svg, x, y, linePath, xAxisGroup;
  
    onMount(async () => {
      try {
        // Load data from CSV
        data = await csv("mq_data.csv", d => ({
          year: d.Year,
          value: +d.med
        }));
        console.log("Loaded data:", data);
        initializeGraph();
        updateGraph(); // Draw initial 10-year window

        // Add event listener for arrow key controls
        window.addEventListener("keydown", handleArrowKey);

        // Dispatch the initial window start position
        dispatch("windowUpdate", { windowStart });

        } catch (error) {
        console.error("Error loading data:", error);
        }

        // Remove event listener when component is destroyed
        return () => {
        window.removeEventListener("keydown", handleArrowKey);
        };
    });

    function initializeGraph() {
    // Set dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    // Set up SVG container and scales
    svg = d3.select("#chart")
      .attr("width", width)
      .attr("height", height);

    x = d3.scalePoint()
      .range([margin.left, width - margin.right]);

    y = d3.scaleLinear()
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Append x-axis and y-axis groups
    xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`);

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Append initial line path
    linePath = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5);
    }


    function updateGraph() {
    const windowData = data.slice(windowStart, windowStart + 10);
    x.domain(windowData.map(d => d.year));

    // Update x-axis with transition
    xAxisGroup.transition()
      .duration(750)
      .call(d3.axisBottom(x));

    // Define the line generator with the updated x domain
    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.value));

    // Update line path with smooth transition
    linePath.datum(windowData)
      .transition()
      .duration(750)
      .attr("d", line);

    // Dispatch event to update window position for +page.svelte
    dispatch("windowUpdate", { windowStart });
  }


// Function to handle arrow key presses
function handleArrowKey(event) {
    if (event.key === "ArrowLeft" && windowStart > 0) {
      windowStart -= 1;
      updateGraph();
    } else if (event.key === "ArrowRight" && windowStart + 10 < data.length) {
      windowStart += 1;
      updateGraph();
    }
  }

  </script>
  
  
  <svg id="chart" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet"></svg>

  <style>
    svg {
      width: 100%;
      height: 100%;
    }
  
    .controls {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  
    button {
      margin: 0 5px;
    }
  </style>