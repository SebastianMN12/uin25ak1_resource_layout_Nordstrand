document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.getElementById("tabs");
    const contentContainer = document.getElementById("content");

    //generer tabs fra ressurser.js
    resources.forEach((resource, index) => {
        const tab = document.createElement("button");
        tab.classList.add("tab");
        tab.textContent = resource.category;
        if (index === 0) tab.classList.add("active"); //Set den første tab som aktiv
        tabsContainer.appendChild(tab);
    });

    //Funksjon som viser innhold i den aktive tab
    function renderContent(category) {
        const resource = resources.find(res => res.category === category);
        if (!resource) return;

        //Viser kun lenker på HTML tab
        const links = category === "HTML" 
            ? `<ul>${resource.sources.map(source => `<li><a href="${source.url}" target="_blank">${source.title}</a></li>`).join("")}</ul>`
            : null; //Ingen lenker på andre tabs

            contentContainer.innerHTML = `
            <div class="content">
                <h1>${resource.category}</h1>
                <p>${resource.text}</p>
                ${links || ""}
            </div>
        `;
    }

    //Sett inhoudet til den første ressursen
    renderContent(resources[0].category);

    //Eventlistener som bytter aktiv tab og viser innholdet til den aktive tab
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            //fjern active class fra tab
            tabs.forEach(t => t.classList.remove("active"));

            //setter den klikked tab som aktiv
            tab.classList.add("active");

            //viser innholdet til aktiv tab
            renderContent(tab.textContent);
        });
    });
});
