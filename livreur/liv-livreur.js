document.addEventListener('DOMContentLoaded', () => {
    const courierDeliveryList = document.getElementById('courierDeliveryList');

    const deliveries = [
        { id: 1, produit: "Vélo", client: "Aldric Alapini", date: "26/09/2024", statut: "En cours" },
        { id: 2, produit: "TV", client: "Roméo leBoss", date: "24/09/2024", statut: "En attente" },
    ];

    const renderCourierDeliveries = () => {
        courierDeliveryList.innerHTML = '';
        deliveries.forEach(delivery => {
            const row = `
                <tr>
                    <td>${delivery.id}</td>
                    <td>${delivery.produit}</td>
                    <td>${delivery.client}</td>
                    <td>${delivery.date}</td>
                    <td>${delivery.statut}</td>
                    <td>
                        ${delivery.statut === 'En attente' ? `<button class="action-btn">Prendre en charge</button>` : ''}
                    </td>
                </tr>
            `;
            courierDeliveryList.innerHTML += row;
        });
    };

    courierDeliveryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            const row = e.target.closest('tr');
            const id = row.querySelector('td').textContent;
            const delivery = deliveries.find(d => d.id == id);
            if (delivery) {
                delivery.statut = 'En cours';
                renderCourierDeliveries();
            }
        }
    });

    renderCourierDeliveries();
});
