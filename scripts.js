const cardsContainer = document.getElementById("cards-container");
//URL API de base
var apiURL = 'http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants?per_page=100';

// Fonction pour créer une carte
const createCard = (apprenant, competences, promotions) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Récupérer la promotion de l'apprenant
    const promotion = promotions.find(promo => apprenant.promotions.includes(promo.id)) || { name: 'Promotion inconnue' };

    // Récupérer les compétences de l'apprenant
    const apprenantCompetences = competences.filter(comp => apprenant.competences.includes(comp.id)).map(comp => comp.name).join(", ") || 'Aucune compétence';

    // Contenu des cartes
    card.innerHTML = `
        <img src="${apprenant.image}" alt="Photo de profil" class="card-img">
        <h2>${apprenant.prenom || 'Prénom inconnu'} ${apprenant.nom || 'Nom inconnu'}</h2>
        <h3>${promotion.name}</h3>
        <p><strong>Compétences :</strong> ${apprenantCompetences}</p>
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
        // Charger les données apprenants
        const responseApprenants = await fetch(apiURL, {
            method: "GET",
        });
        if (!responseApprenants.ok) {
            throw new Error(`Erreur HTTP lors des apprenants : ${responseApprenants.status}`);
        }
        const apprenants = await responseApprenants.json();

        // Charger les données de compétences
        const responseCompetences = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/competences');
        if (!responseCompetences.ok) {
            throw new Error(`Erreur HTTP lors des compétences : ${responseCompetences.status}`);
        }
        const competences = await responseCompetences.json();

        // Charger les données de promotions
        const responsePromotions = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/promotions');
        if (!responsePromotions.ok) {
            throw new Error(`Erreur HTTP lors des promotions : ${responsePromotions.status}`);
        }
        const promotions = await responsePromotions.json();

        // Vider le conteneur avant d'ajouter de nouvelles cartes
        cardsContainer.innerHTML = "";

        // Pour chaque apprenant, créer une carte
        apprenants.forEach((apprenant) => {
            const card = createCard(apprenant, competences, promotions);
            cardsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
    }
};

// chargement des apprenants au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    loadApprenants();
});

//filtre : promotion
document.getElementById("yearSelect").addEventListener("change", function() {
    let selectedValue = this.value;
    console.log(selectedValue);
    if(selectedValue === "2025") {
        apiURL = 'http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants?per_page=100&promotions=2';
    }
    if(selectedValue === "2024") {
        apiURL = 'http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants?per_page=100&promotions=7';
    }
    if(selectedValue === "2023") {
        apiURL = 'http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants?per_page=100&promotions=8';
    }
    console.log(apiURL);
    loadApprenants();
});
