document.getElementById('helloBtn').addEventListener('click', function() {
    document.getElementById('output').textContent = 'Дякую, що натиснув кнопку!';
});

let data = [];

fetch('my-filter-site/table_data.json')
    .then(response => response.json())
    .then(json => {
        // Видаляємо порожні або некоректні об'єкти
        data = json.filter(item => item && item.title && item.category && item.region);
        fillFilters();
        renderTable();
    });

function fillFilters() {
    const categorySet = new Set();
    const regionSet = new Set();
    data.forEach(item => {
        categorySet.add(item.category);
        regionSet.add(item.region);
    });

    const categoryFilter = document.getElementById('categoryFilter');
    categorySet.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });

    const regionFilter = document.getElementById('regionFilter');
    regionSet.forEach(reg => {
        const opt = document.createElement('option');
        opt.value = reg;
        opt.textContent = reg;
        regionFilter.appendChild(opt);
    });

    categoryFilter.addEventListener('change', renderTable);
    regionFilter.addEventListener('change', renderTable);
}

function renderTable() {
    const category = document.getElementById('categoryFilter').value;
    const region = document.getElementById('regionFilter').value;
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = '';

    let filtered = data;
    if (category) filtered = filtered.filter(item => item.category === category);
    if (region) filtered = filtered.filter(item => item.region === region);

    filtered.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.title}</td>
            <td>${item.category}</td>
            <td>${item.region}</td>
            <td>${item.innovation_link ? `<a href="${item.innovation_link}" target="_blank">Деталі</a>` : ''}</td>
            <td>${item.booth_link ? `<a href="${item.booth_link}" target="_blank">Стенд</a>` : ''}</td>
        `;
        tbody.appendChild(tr);
    });
}