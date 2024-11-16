const { API_URL } = require("@/constants");


async function updateSells(sells) {
    for (const sell of sells) {
        try {
            const response = await fetch(`${API_URL}/sells/${sell.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sell)
            });

            if (!response.ok) {
                throw new Error(`Failed to update sell with id ${sell.id}`);
            }
        } catch (error) {
            console.error(error);
            alert(`Error updating sell with id ${sell.id}`);
            return;
        }
    }
    alert('La actualización se realizó de manera correcta');
}

export default updateSells;