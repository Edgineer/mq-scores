<script>
    import Graph from "./Graph.svelte"; // Import the Graph component
    import S1 from "./States/S1.svelte";
    import S2 from "./States/S2.svelte";

    let currentComponent;

    // Define points in the data where each state component should be shown
    const stateComponents = [
        { start: 0, end: 5, component: S1 },   // Show State1 when windowStart is 0
        { start: 6, end: 15, component: S2 },  // Show State2 when windowStart is 20
        // Add more entries as needed for other components
    ];

    // Track windowStart from Graph component and update current component accordingly
    function updateComponent(windowStart) {
        const matchedState = stateComponents.find(state => windowStart >= state.start && windowStart <= state.end );
        currentComponent = matchedState ? matchedState.component : null;
    }

</script>
  
<div class="container">
    <div class="left">
        <Graph on:windowUpdate={e => updateComponent(e.detail.windowStart)} />
    </div>
    <div class="right">
        {#if currentComponent}
            <svelte:component this={currentComponent} />
        {:else}
            <p>This is where other content will go.</p>
        {/if}
    </div>
</div>

<style>
    /* Make sure the body and html take up the full viewport height */
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
  
    /* Set container to take up the full viewport */
    .container {
      display: flex;
      width: 100vw;
      height: 100vh;
    }
  
    /* Each side takes up 50% of the container */
    .right {
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .left {
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
    }
</style>