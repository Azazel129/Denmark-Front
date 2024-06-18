document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8000/api/histories')
        .then(response => response.json())
        .then(data => {
            const historyContainer = document.getElementById('history-container');
            data.forEach(history => {
                const historyElement = document.createElement('div');
                historyElement.classList.add('history-block', 'mb-4');
                historyElement.innerHTML = `
                    <h2>${history.Title}</h2>
                    <p>${history.Description}</p>
                    <img src="http://localhost:8000/storage/${history.Images}" alt="">
                `;
                historyContainer.appendChild(historyElement);
            });
        });
});