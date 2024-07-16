document.addEventListener("DOMContentLoaded", () => {
    const agentList = document.getElementById("agent-list");
    const agentDetail = document.getElementById("agent-detail");
  
    fetch("https://valorant-api.com/v1/agents")
      .then((response) => response.json())
      .then((data) => {
        displayAgentList(data.data);
      });
  
    function displayAgentList(agents) {
      agents.forEach((agent) => {
        const agentDiv = document.createElement("div");
        agentDiv.classList.add("agent-item");
  
        const agentDetailsDiv = document.createElement("div");
        agentDetailsDiv.classList.add("agentDetailsDiv");
  
        const img = document.createElement("img");
        img.src = agent.fullPortrait;
        img.alt = agent.displayName;
  
        const heading = document.createElement("h1");
        heading.classList.add("heading");
        heading.innerHTML = agent.displayName;
  
        const link = document.createElement("a");
        link.href = "#";
        link.innerHTML = "view";
        link.addEventListener("click", () => showAgentDetail(agent.uuid));
  
        agentDiv.appendChild(img);
        agentDetailsDiv.appendChild(heading);
        agentDetailsDiv.appendChild(link);
        agentDiv.appendChild(agentDetailsDiv);
        agentList.appendChild(agentDiv);
      });
    }
  
    function showAgentDetail(agentId) {
      fetch(`https://valorant-api.com/v1/agents/${agentId}`)
        .then((response) => response.json())
        .then((data) => {
          displayAgentDetail(data.data);
        });
    }
  
    function displayAgentDetail(agent) {
      agentList.classList.add("hidden");
      agentDetail.classList.remove("hidden");
      agentDetail.innerHTML = `
          <div class="agent-details-main">
          <div class="agent-details-container">
          <div class="agent-image" >
          <img src="${agent.displayIcon}" alt="${agent.displayName}" />
          </div>
          <div class="agent-details" >
           <h1>${agent.displayName}</h1>
          <p>${agent.description}</p>
          <button id="back-button">Back</button>
          </div>
          </div>
          </div>
        `;
  
      document.getElementById("back-button").addEventListener("click", () => {
        agentDetail.classList.add("hidden");
        agentList.classList.remove("hidden");
      });
    }
  });
  