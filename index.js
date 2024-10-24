const renderList = async () => {
    list.innerHTML = '';
    const response = await fetch('https://<your-vercel-app-name>.vercel.app/women');
    const womenList = await response.json();
    womenList.forEach((woman) => {
        const listItem = document.createElement('li');
        listItem.textContent = woman.name;

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', async () => {
            await fetch(`https://<your-vercel-app-name>.vercel.app/women/${woman._id}`, { method: 'DELETE' });
            renderList();
            updateCount();
        });

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
    updateCount();
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
        await fetch('https://<your-vercel-app-name>.vercel.app/women', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        nameInput.value = '';
        renderList();
    }
});

// Initial render
renderList();
updateCount();