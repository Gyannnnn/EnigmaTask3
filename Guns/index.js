document.addEventListener("DOMContentLoaded", () => {
  const gunList = document.getElementById("gun-list");
  const gunDetail = document.getElementById("gun-detail");

  fetch("https://valorant-api.com/v1/weapons")
    .then((response) => response.json())
    .then((data) => {
      displayGunList(data.data);
    });

  function displayGunList(guns) {
    guns.forEach((gun) => {
      const gunDiv = document.createElement("div");
      gunDiv.classList.add("gun-item");

      const gunDetailsDiv = document.createElement("div")
      gunDetailsDiv.classList.add("gunDetailsDiv")

      const img = document.createElement("img");
      img.src = gun.displayIcon;
      img.alt = gun.displayName;

      const heading = document.createElement('h1')
      heading.classList.add("heading")
      heading.innerHTML = gun.displayName;

      const link = document.createElement("a");
      link.href = "#";
      link.innerHTML = 'view';
      link.addEventListener("click", () => showGunDetail(gun.uuid));

      gunDiv.appendChild(img);
      gunDetailsDiv.appendChild(heading);
      gunDetailsDiv.appendChild(link);
      gunDiv.appendChild(gunDetailsDiv)
      gunList.appendChild(gunDiv);
    });
  }

  function showGunDetail(gunId) {
    fetch(`https://valorant-api.com/v1/weapons/${gunId}`)
      .then((response) => response.json())
      .then((data) => {
        displayGunDetail(data.data);
      });
  }

  function displayGunDetail(gun) {
    gunList.classList.add("hidden");
    gunDetail.classList.remove("hidden");
    gunDetail.innerHTML = `
        <h1>${gun.displayName}</h1>
        <img src="${gun.displayIcon}" alt="${gun.displayName}" />
        <p>${gun.description}</p>
        <button id="back-button">Back</button>
      `;

    document.getElementById("back-button").addEventListener("click", () => {
      gunDetail.classList.add("hidden");
      gunList.classList.remove("hidden");
    });
  }
});
