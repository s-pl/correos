document.getElementById('trackingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const trackingNumber = document.getElementById('trackingNumber').value;
    if (!trackingNumber) {
        alert('Por favor, ingresa un código de seguimiento.');
        return;
    }

    fetch(`http://localhost:3000/${trackingNumber}`)
        .then(response => response.json())
        .then(data => {
            displayTrackingInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al obtener la información del envío.');
        });
});

function displayTrackingInfo(data) {
    const trackingInfoContainer = document.getElementById('trackingInfo');
    trackingInfoContainer.innerHTML = ''; // Limpiar contenido anterior

    if (data.shipment && data.shipment.length > 0) {
        const shipment = data.shipment[0];
        const events = shipment.events || [];

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');

            const dateTimeElement = document.createElement('div');
            dateTimeElement.classList.add('date-time');
            dateTimeElement.textContent = `${event.eventDate} ${event.eventTime}`;
            eventElement.appendChild(dateTimeElement);

            const statusElement = document.createElement('div');
            statusElement.classList.add('status');
            statusElement.textContent = event.desPhase || event.summaryText;
            eventElement.appendChild(statusElement);

            const extendedTextElement = document.createElement('div');
            extendedTextElement.classList.add('extended-text');
            extendedTextElement.textContent = event.extendedText;
            eventElement.appendChild(extendedTextElement);

            trackingInfoContainer.appendChild(eventElement);
        });
    } else {
        trackingInfoContainer.textContent = 'No se encontró información para el código de seguimiento proporcionado.';
    }
}
