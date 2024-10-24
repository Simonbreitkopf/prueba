document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addForm');
    const nameInput = document.getElementById('name');
    const list = document.getElementById('list');
    const count = document.getElementById('count');

    let womenList = JSON.parse(localStorage.getItem('womenList')) || [];
    let womenCount = womenList.length;

    const updateCount = () => {
        count.textContent = `Número de mujeres en la lista: ${womenCount}`;
    };

    const renderList = () => {
        list.innerHTML = '';
        womenList.forEach((name, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = name;

            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                womenList.splice(index, 1);
                localStorage.setItem('womenList', JSON.stringify(womenList));
                womenCount--;
                renderList();
                updateCount();
            });

            listItem.appendChild(deleteBtn);
            list.appendChild(listItem);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        if (name) {
            womenList.push(name);
            localStorage.setItem('womenList', JSON.stringify(womenList));
            womenCount++;
            renderList();
            updateCount();
            nameInput.value = '';
        }
    });

    // Initial render
    renderList();
    updateCount();
});