let all_products = [
    {
        id: 1,
        name: "Dumbbell 5 KG",
        price: 75000,
        description: "Dumbbell plastik",
    },
    {
        id: 2,
        name: "Handwrap 5m",
        price: 50000,
        description: "Handwrap 5 meter merk bang jago",
    },
];
let products = all_products;
let admin_page = document.getElementById("admin-page");
let beranda_page = document.getElementById("beranda-page");
let list_product = document.getElementById("list-product");
let table_product = document.getElementById("table-product");
admin_page.style.display = "none";
beranda_page.style.display = "block";
showProducts();

/*---------------------------------------------------*\
    BERANDA
\*---------------------------------------------------*/
function showProducts() {
    var html = "";
    products.forEach((product, index) => {
        html += `
        <div class="col-md-3 mb-4">
            <div class="card h-100" onmouseover="hoverCard(this)" onmouseout="normalCard(this)">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h6 class="card-subtitle mb-2 text-warning">Rp. ${product.price}</h6>
                    <p class="card-text">${product.description}</p>
                </div>
            </div>
        </div>
        `;
    });
    if (!html) {
        html +=
            '<div class="alert alert-warning"><strong>Warning!</strong>&ensp; Data not found</div>';
    }
    list_product.innerHTML = html;
}

function hoverCard(card) {
    card.classList.add("text-bg-primary");
}
function normalCard(data) {
    data.classList.remove("text-bg-primary");
}

function switchPage(page) {
    let admin_btn = document.getElementById("admin");
    let beranda_btn = document.getElementById("beranda");
    if (page == "beranda") {
        admin_btn.classList.remove("active");
        beranda_btn.classList.add("active");
        admin_page.style.display = "none";
        beranda_page.style.display = "block";
    } else if (page == "admin") {
        loadProduct();
        admin_btn.classList.add("active");
        beranda_btn.classList.remove("active");
        admin_page.style.display = "block";
        beranda_page.style.display = "none";
    } else {
        alert("(404) Page not found!");
    }
}

function filterProducts() {
    let keyword = document.getElementById("keyword").value;
    let sort = document.getElementById("sort").value;

    // search with filter
    products = all_products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(keyword);

    // sorting
    if (sort) {
        if (sort == "asc") {
            products = products.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort == "desc") {
            products = products.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort == "cheap") {
            products = products.sort((a, b) => a.price - b.price);
        } else if (sort == "expensive") {
            products = products.sort((a, b) => b.price - a.price);
        }
    }
    showProducts();
}

/*---------------------------------------------------*\
    ADMIN
\*---------------------------------------------------*/
function loadProduct() {
    var html = "";
    all_products.forEach((product, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button type="button" class="btn btn-warning mr-1 mb-1" onclick="edit(${index})">Update</button>
                <button type="button" class="btn btn-danger mr-1 mb-1" onclick="delete_(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
    table_product.innerHTML = html;
}

const modal = document.getElementById("modal-input");
const btn_add = document.getElementById("btn-add");
const form_input = document.getElementById("form-input");
const title_form = document.getElementById("title-form");

btn_add.addEventListener("click", (event) => {
    document.getElementById("form").reset();
    document.getElementById("index").value = "";
    document.getElementById("id").value = "";
    form_input.style.display = "block";
    title_form.innerHTML = "Add New Data";
});

function validate(formData) {
    var i = 0;
    var result = true;
    for (var data of formData.entries()) {
        if (i > 1 && data[1] == "") {
            document.querySelector(".validate-" + data[0]).innerHTML =
                "Harus Diisi";
            result = false;
        } else {
            document.querySelector(".validate-" + data[0]).innerHTML = "";
        }
        i++;
    }
    return result;
}

function save() {
    let form = document.forms.form;
    let formData = new FormData(form);
    var result = validate(formData);

    if (result) {
        if (formData.get("index") == "") {
            // save new data
            all_products.push({
                id: generateId(),
                name: formData.get("name"),
                price: formData.get("price"),
                description: formData.get("description"),
            });
        } else {
            // update data
            all_products[formData.get("index")] = {
                id: formData.get("id"),
                name: formData.get("name"),
                price: formData.get("price"),
                description: formData.get("description"),
            };
        }
        loadProduct();
        showProducts();
        document.getElementById("form").reset();
        form_input.style.display = "none";
    }
}

function generateId() {
    max_id = Math.max(...all_products.map((data) => data.id));
    return max_id + 1;
}

function close_form() {
    document.getElementById("form").reset();
    form_input.style.display = "none";
}

function edit(index) {
    document.getElementById("form").reset();
    form_input.style.display = "block";
    title_form.innerHTML = "Update Data";

    data = all_products[index];
    document.getElementById("index").value = index;
    Object.keys(data).forEach((key) => {
        // console.log(key, data[key]);
        document.getElementById(key).value = data[key];
    });
}

function delete_(index) {
    all_products.splice(index, 1);
    loadProduct();
    showProducts();
}
