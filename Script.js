const cars = [
    { id: 1, make: "Ford", model: "Focus", year: 2019, price: 8500, mileage: 45000, colour: "Blue" },
    { id: 2, make: "BMW", model: "3 Series", year: 2020, price: 22000, mileage: 30000, colour: "Black" },
    { id: 3, make: "Toyota", model: "Corolla", year: 2018, price: 5000, mileage: 60000, colour: "Red" },
    { id: 4, make: "Audi", model: "A3", year: 2021, price: 25000, mileage: 15000, colour: "Silver" },
    { id: 5, make: "Volkswagen", model: "Golf", year: 2019, price: 8500, mileage: 40000, colour: "Grey" },
    { id: 6, make: "Mercedes", model: "C-Class", year: 2020, price: 28000, mileage: 22000, colour: "White" },
    { id: 7, make: "Honda", model: "Civic", year: 2017, price: 7000, mileage: 55000, colour:"Blue"},
    { id: 8, make: "Nissan", model: "Altima", year: 2018, price: 9000, mileage: 50000, colour:"Black"},
    { id: 9, make: "Hyundai", model: "Elantra", year: 2019, price: 8000, mileage: 45000, colour:"Red"},
    { id: 10, make: "Kia", model: "Optima", year: 2020, price: 12000, mileage: 30000, colour:"Silver"},
    { id: 11, make: "Mazda", model: "3", year: 2018, price: 7500, mileage: 60000, colour:"Grey"},
    { id: 12, make: "Subaru", model: "Impreza", year: 2019, price: 8500, mileage: 40000, colour:"White"},
    { id: 13, make: "Tesla", model: "Model 3", year: 2021, price: 35000, mileage: 15000, colour:"Red"},
    { id: 14, make: "Chevrolet", model: "Cruze", year: 2017, price: 6000, mileage: 55000, colour:"Blue"},
    { id: 15, make: "GMC", model: "Sierra", year: 2018, price: 25000, mileage: 50000, colour:"Black"},
    { id: 16, make: "Dodge", model: "Charger", year: 2019, price: 20000, mileage: 45000, colour:"Red"},
    { id: 17, make: "Jeep", model: "Wrangler", year: 2020, price: 30000, mileage: 30000, colour:"Silver"},
    { id: 18, make: "Lexus", model: "IS", year: 2018, price: 22000, mileage: 60000, colour:"Grey"},
    { id: 19, make: "Acura", model: "TLX", year: 2019, price: 25000, mileage: 40000, colour:"White"},
    { id: 20, make: "Infiniti", model: "Q50", year: 2020, price: 27000, mileage: 22000, colour:"Blue"},
];

let nextId = 21;

function displayCars(carList) {
    const listings = document.getElementById("car-listings");
    listings.innerHTML = ""; 

    if (carList.length === 0) {
            listings.innerHTML = '<p class="no-results">No cars found.</p>';
            return;
    }

    carList.forEach(car => {
        const card = document.createElement("article");
        card.className ="car-card";

        const title = document.createElement("h2");
        title.textContent = `${car.make} ${car.model}`;
        card.appendChild(title);

        const colourP = document.createElement("p");
        colourP.textContent = `Colour: ${car.colour}`;
        card.appendChild(colourP);

        const yearP = document.createElement("p");
        yearP.textContent = `Year: ${car.year}`;
        card.appendChild(yearP);

        const mileageP = document.createElement("p");
        mileageP.textContent = `Mileage: ${car.mileage.toLocaleString()} miles`;
        card.appendChild(mileageP);

        const priceP = document.createElement("p");
        priceP.className = "price";
        priceP.textContent = `Price: £${car.price.toLocaleString()}`;
        card.appendChild(priceP);

        const deleteBtn = document.createElement("button"); 
        deleteBtn.textContent = "Delete"; 
        deleteBtn.addEventListener("click", () => deleteCar(car.id)); 
        card.appendChild(deleteBtn); 

        listings.appendChild(card);
     });       
}

function getFilteredCars() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    if (!searchTerm) return cars;
    return cars.filter(car =>
        car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)
    );
}

document.getElementById("add-car-btn").addEventListener("click", addCar);

document.getElementById("search-bar").addEventListener("input", () => {
    displayCars(getFilteredCars());
});

function deleteCar(id) {
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
        cars.splice(index, 1);
    }
    displayCars(getFilteredCars());
}

function addCar() {
    const fields = {
        make: document.getElementById("input-make"),
        model: document.getElementById("input-model"),
        year: document.getElementById("input-year"),
        price: document.getElementById("input-price"),
        mileage: document.getElementById("input-mileage"),
        colour: document.getElementById("input-colour"),
    };

    let valid = true;

    Object.values(fields).forEach(field => field.classList.remove("invalid"));

    Object.entries(fields).forEach(([key, field]) => {
        if (!field.value.trim()) {
            field.classList.add("invalid");
            valid = false;
        }
    });

    ["make", "model", "colour"].forEach(key => {
    if (fields[key].value.trim().length > 50) {
      fields[key].classList.add("invalid");
      valid = false;
      }
    });

    const year = parseInt(fields.year.value);
    const price = parseInt(fields.price.value);
    const mileage = parseInt(fields.mileage.value);

    if (fields.year.value && (year < 1900 || year > 2030)) {
        fields.year.classList.add("invalid");
        valid = false;
    }
    if (fields.price.value && (price < 0 || price > 100000)) {
        fields.price.classList.add("invalid");
        valid = false;
    }
    if (fields.mileage.value && (mileage < 0)) {
        fields.mileage.classList.add("invalid");
        valid = false;
    }

    if (!valid) {
        document.getElementById("form-error").textContent = "Please check the highlighted fields for errors.";
        return;
    }

    cars.push({
        id: nextId++,
        make: fields.make.value.trim(),
        model: fields.model.value.trim(),
        year: year,
        price: price,
        mileage: mileage,
        colour: fields.colour.value.trim(),
    });

    Object.values(fields).forEach(field => field.value = "");
    document.getElementById("form-error").textContent = "";
    displayCars(getFilteredCars());
}

displayCars(cars);