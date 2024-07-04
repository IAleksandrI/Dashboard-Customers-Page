
// shown data customers table footer //
var showingDataFrom = '1';
document.getElementById("showing-from").textContent = showingDataFrom;
var showingDataTo = '8';
document.getElementById("showing-to").textContent = showingDataTo;
var entries = '256K';
document.getElementById("entries").textContent = entries;

// Mobile buttons menu and close //
const sideMenu = document.querySelector(".side-menu");
const menuButton = document.querySelector(".menu-button");
const closeButton = document.querySelector(".close-button");

menuButton.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

closeButton.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

// Pagination //
const ulTag = document.querySelector("ul");
let totalPages = 40;

function pagination (totalPages, page) {
    let liTag = '';
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;
    
    // showing button previous
    if(page > 1) {
        liTag += `<li class="pagination__previous" onclick = "pagination(totalPages, ${page - 1})"><span><</span></li>`;
    }else if(page = 1){
        liTag += `<li class="pagination__previous"><span><</span></li>`;
    }
    
    if(page > 2){
        liTag += `<li class="pagination__number" onclick="pagination(totalPages, 1)"><span>1</span></li>`; // showing first page
        if(page>3){
            liTag += `<li class="pagination__dots"><span>...</span></li>`; // showing dots before current pages
        }
    }
    // how many pages are shown before the current page
    if(page == totalPages){
        beforePages = beforePages - 2;
    }else if(page == totalPages - 1){
        beforePages = beforePages - 1;
    }

    // how many pages are shown after the current page
    if(page == 1){
        afterPages = afterPages + 2;
    }else if(page == 2){
        afterPages = afterPages + 1;
    }
    //showing pages
    for (let pageLenght = beforePages; pageLenght <= afterPages; pageLenght++) {
        if(pageLenght > totalPages){
            continue;
        }
        if(pageLenght == 0) {
            pageLenght = pageLenght + 1;
        }
        if(page == pageLenght){
            activeLi = "--active";
        }else {
            activeLi = "";
        }
        liTag += `<li class="pagination__number${activeLi}" onclick="pagination(totalPages, ${pageLenght})"><span>${pageLenght}</span></li>`;
    }

    if(page < totalPages - 1){
        if(page < totalPages - 2){
            liTag += `<li class="pagination__dots"><span>...</span></li>`; // showing dots after current pages
        }
        liTag += `<li class="pagination__number" onclick="pagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`; // showing last page
    }
    // showing button next
    if(page < totalPages) {
        liTag += `<li class="pagination__next" onclick = "pagination(totalPages, ${page + 1})"><span>></span></li>`;
    }else if(page = totalPages){
        liTag += `<li class="pagination__next"><span>></span></li>`;
    }
    ulTag.innerHTML = liTag;
}
pagination(totalPages, 1);


// Filling customers table //
Customers.forEach(customer => {
    const tr = document.createElement('tr');
    tr.classList.add('customers-table__customer');
    const trContent = `
                <th class="customers-table__cell">${customer.customerName}</th>
                <th class="customers-table__cell">${customer.company}</th>
                <th class="customers-table__cell">${customer.phoneNumber}</th>
                <th class="customers-table__cell">${customer.email}</th>
                <th class="customers-table__cell">${customer.country}</th>
                <th class="customers-table__cell"><div class="${customer.status === 'Inactive' ? 'customers-table__inactive-figure' : 'customers-table__active-figure'}">${customer.status}</div></th>
                `;
    tr.innerHTML = trContent;
    document.querySelector('table.customers-table tbody').appendChild(tr);
})