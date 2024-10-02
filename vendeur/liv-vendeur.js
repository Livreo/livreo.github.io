document.addEventListener('DOMContentLoaded', () => {
    const sellerDeliveryList = document.getElementById('sellerDeliveryList');
    const addDeliveryBtn = document.getElementById('addDeliveryBtn');

    const deliveries = [
        { id: 1, produit: "Smartphone", client: "Aldric ALAPINI", date: "30/09/2024", statut: "En attente" },
    ];

    const renderSellerDeliveries = () => {
        sellerDeliveryList.innerHTML = '';
        deliveries.forEach(delivery => {
            const row = `
                <tr>
                    <td>${delivery.id}</td>
                    <td>${delivery.produit}</td>
                    <td>${delivery.client}</td>
                    <td>${delivery.date}</td>
                    <td>${delivery.statut}</td>
                    <td>
                        <button class="edit-action-btn">✏</button>
                        <button class="del-action-btn">❌</button>
                    </td>
                </tr>
            `;
            sellerDeliveryList.innerHTML += row;
        });
    };

    addDeliveryBtn.addEventListener('click', () => {
        const newDelivery = { id: deliveries.length + 1, produit: "Nouveau produit", client: "Nouveau client", date: "29/09/2024", statut: "En attente" };
        deliveries.push(newDelivery);
        renderSellerDeliveries();
    });

    renderSellerDeliveries();
});
