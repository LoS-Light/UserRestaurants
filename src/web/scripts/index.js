const buttonSearch = document.getElementById("button-search");
buttonSearch.addEventListener("click", (event) => {
    const inputSearch = document.getElementById("input-search");
    const keyword = inputSearch.value.trim();
    if (!keyword) {
        event.preventDefault();
    }
});

const buttonRestItems = document.querySelectorAll(".restaurant-item");
const modalDeleteRest = document.getElementById("modal-delete-rest");
const targetDeleteRest = document.getElementById("target-delete-rest");
const formDeleteRest = document.getElementById("form-delete-rest");

for (let item of buttonRestItems) {
    item.addEventListener("click", (event) => {
        if (event.target.type) {
            evalRestaurantOption(event);
        }
    });
}

function evalRestaurantOption(event) {
    event.preventDefault();
    const dataset = event.target.dataset;

    if (event.target.type === "button") {
        window.location.href = dataset.href;
    }
    else if (event.target.type === "submit") {
        const id = dataset.id;
        const name = dataset.name;
        targetDeleteRest.textContent = name;
        formDeleteRest.action = `/restaurants/${id}?_method=DELETE`;
        const myModal = new bootstrap.Modal(modalDeleteRest);
        myModal.show();
    }
}
