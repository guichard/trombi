const apiUrl = "http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants";
const cardsContainer = document.getElementById("cards-container");

// Fonction pour créer une carte
const createCard = (apprenant) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Contenu des cartes
    card.innerHTML = `
        <img src="${apprenant.image || 'https://via.placeholder.com/150'}" alt="Photo de profil" class="card-img">
        <h2>${apprenant.prenom || 'Prénom inconnu'} ${apprenant.nom || 'Nom inconnu'}</h2>
        <h3>2024-2025</h3>
        <div class="card-links">
            <a href="${apprenant.portfolio || '#'}" class="btn" target="_blank">Portfolio</a>
            <a href="${apprenant.cv || '#'}" class="btn" target="_blank">CV</a>
            <a href="${apprenant.linkedin || '#'}" class="btn" target="_blank">LinkedIn</a>
        </div>
    `;

    return card;
};

// Charger les données de l'API et les afficher
const loadApprenants = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const apprenants = await response.json();

        // Vider le conteneur avant d'ajouter de nouvelles cartes
        cardsContainer.innerHTML = "";
        
        // Pour chaque apprenant, créer une carte et l'ajouter au conteneur
        apprenants.forEach((apprenant) => {
            const card = createCard(apprenant);
            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des apprenants :", error);
    }
};

// Au chargement de la page, charger les apprenants
document.addEventListener("DOMContentLoaded", () => {
    loadApprenants();
});