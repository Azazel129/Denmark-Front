document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8000/api/monarchs')
        .then(response => response.json())
        .then(data => {
            const monarchsContainer = document.getElementById('monarchs-container');
            data.forEach(monarch => {
                const monarchElement = document.createElement('div');
                monarchElement.classList.add('monarch', 'mb-4');
                monarchElement.innerHTML = `
                    <h2>${monarch.name}</h2>
                    <h4>${monarch.description}</h4>
                    <img src="http://localhost:8000${monarch.image}" alt="${monarch.name}">
                `;
                monarchsContainer.appendChild(monarchElement);
            });
        });
});