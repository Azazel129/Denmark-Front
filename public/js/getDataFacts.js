document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:8000/api/facts')
        .then(response => response.json())
        .then(data => {
            const factsContainer = document.getElementById('facts-container');
            data.forEach(fact => {
                const factElement = document.createElement('div');
                factElement.classList.add('fact', 'mb-4');
                factElement.innerHTML = `
                    <p>${fact.name}</p>
                    <img src="http://localhost:8000${fact.image}" alt="Fact Image">
                `;
                factsContainer.appendChild(factElement);
            });
        });
});