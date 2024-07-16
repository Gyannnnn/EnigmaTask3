document.addEventListener("DOMContentLoaded", () => {
  const agentsList = document.getElementById("agents-list");
  const agentsDetail = document.getElementById("agents-detail");

  fetch("https://valorant-api.com/v1/agents")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Agents list fetched:", data);
      displayAgentsList(data.data);
    })
    .catch((error) => {
      console.error("Error fetching agents list:", error);
    });

  function displayAgentsList(agents) {
    agents.forEach((agent) => {
      const agentDiv = document.createElement("div");
      agentDiv.classList.add("agent-div");

      const agentDetailsDiv = document.createElement("div");
      agentDetailsDiv.classList.add("agentDetailsDiv");

      const img = document.createElement("img");
      img.src = agent.displayIcon;
      img.alt = agent.displayName;

      const heading = document.createElement("h1");
      heading.classList.add("heading");
      heading.textContent = agent.displayName;

      const link = document.createElement("a");
      link.href = "#";
      link.textContent = "view";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        alert(`View clicked for agent: ${agent.displayName}`);
        showAgentsDetail(agent.uuid);
      });

      agentDetailsDiv.appendChild(heading);
      agentDetailsDiv.appendChild(link);
      agentDiv.appendChild(img);
      agentDiv.appendChild(agentDetailsDiv);
      agentsList.appendChild(agentDiv);
    });
  }

  function showAgentsDetail(agentId) {
    console.log("Fetching details for agent ID:", agentId);
    fetch(`https://valorant-api.com/v1/agents/${agentUuid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Agent details fetched:", data);
        displayAgentDetail(data.data);
      })
      .catch((error) => {
        console.error("Error fetching agent details:", error);
      });
  }

  function displayAgentDetail(agent) {
    agentsList.classList.add("hidden");
    agentsDetail.classList.remove("hidden");
    agentsDetail.innerHTML = `
        <div class="agent-details-main">
          <div class="agent-details-container">
            <div class="agent-image">
              <img src="${agent.displayIcon}" alt="${agent.displayName}" />
            </div>
            <div class="agent-details">
              <h1>${agent.displayName}</h1>
              <p>${agent.description}</p>
              <button id="back-button">Back</button>
            </div>
          </div>
        </div>
      `;

    // Add event listener to the back button
    document.getElementById("back-button").addEventListener("click", () => {
      console.log("Back button clicked");
      agentsDetail.classList.add("hidden");
      agentsList.classList.remove("hidden");
    });
  }
});
