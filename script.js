const addCardBtn = document.getElementById('addCardBtn');
const cardsContainer = document.getElementById('cardsContainer');

function addCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = `Carte ${cardsContainer.children.length + 1}`;
    
    const cardContent = document.createElement('p');
    cardContent.textContent = `Contenu de la carte ${cardsContainer.children.length + 1}`;
    
    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    
    cardsContainer.appendChild(card);
}

addCardBtn.addEventListener('click', addCard);

const searchBar = document.getElementById('searchBar');
const yearSelect = document.getElementById('yearSelect');
const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');

function getFormValues() {
    console.log('Recherche:', searchBar.value);
    console.log('Année sélectionnée:', yearSelect.value);
    console.log('Option 1:', checkbox1.checked);
    console.log('Option 2:', checkbox2.checked);
}

searchBar.addEventListener('input', getFormValues);
yearSelect.addEventListener('change', getFormValues);
checkbox1.addEventListener('change', getFormValues);
checkbox2.addEventListener('change', getFormValues);
