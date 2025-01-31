document.addEventListener("DOMContentLoaded", function () {
    //henter elementer fra html
    const tabsContainer = document.getElementById("tabs");
    const contentContainer = document.getElementById("content");

    //generer tabs fra ressurser.js
    resources.forEach((resource, index) => {
        const tab = document.createElement("button");
        tab.classList.add("tab");
        tab.textContent = resource.category;
        if (index === 0) tab.classList.add("active"); //Setter html tab som aktiv først
        tabsContainer.appendChild(tab);
    });

    //Funksjon som viser innhold i den aktive tabben
    function renderContent(category) {
        const resource = resources.find(res => res.category === category);//finner den tilsvarende ressursen
        if (!resource) return;

        //innhold på tab med kategori, tekst og kilder
        contentContainer.innerHTML = `
            <div class="content">
                <h1>${resource.category}</h1>
                <p>${resource.text}</p>
                <ul>
                    ${resource.sources.map(source => `<li><a href="${source.url}" target="_blank">${source.title}</a></li>`).join("")}
                </ul>
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
