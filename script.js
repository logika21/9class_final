class Product {
    constructor(title, price, image, description = "") {
        this.title = title;
        this.price = price;
        this.image = image;
        this.description = description;
    }
    get_card() {
        return `
            <div class="card" style="">
                <img src="/img/${this.image}">
                <h5 class="text-card">${this.title}</h5>
                <p class="price-card">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-currency-hryvnia"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a2.64 2.64 0 0 1 2.562 -2h3.376a2.64 2.64 0 0 1 2.562 2a2.57 2.57 0 0 1 -1.344 2.922l-5.876 2.938a3.338 3.338 0 0 0 -1.78 3.64a3.11 3.11 0 0 0 3.05 2.5h2.888a2.64 2.64 0 0 0 2.562 -2" /><path d="M6 10h12" /><path d="M6 14h12" /></svg>
                <span class="price-amount"> ${this.price}</span>
               </p>
                <button type="button" class="cart-btn">
                <svg class="bell" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                Купити</button>
            </div>
        `
    }
};

products = [
    new Product("Album Olivia Rodrigo'SOUR'", 1500, "81bGstWK87L._UF350_350_QL80_-removebg-preview.png"),
    new Product("Album Billie Eilish'HIT ME HARD AND SOFT'", 2500, "388071m58f739b7-removebg-preview.png"),
    new Product("Album Arctic Monkeys'AM'", 2000, "3712676930.png"),
    new Product("Album Maneskin'IL BALLO DELLA VITA'", 1500, "maneskin-il-ballo-della-vita-2.png"),

]


let products_list = document.querySelector('.products-list')

products.forEach(function (product) {
    products_list.innerHTML += product.get_card()

});

// Створення класу кошика
class ShoppingCart {
    constructor() {
        this.items = []
        this.total = 0
    }
    // Додавання товару до кошика
    addItem(item) {
        this.items.push(item);
    }
    // метод що повертає один елемент кошика
    get_item(item) {
        let itemElement = `<div class = "cart-item">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">${item.price} грн</div>
            <!-- Додайте інші дані про товар, які вам потрібні -->
            </div>`;
        return itemElement;
    }
}

let cart_list = document.querySelector('.cart-items-list')
let cart_total = document.querySelector('.cart-total')

// Створення об'єкта кошика
let cart = new ShoppingCart();
// / Функція для додавання товару до кошика при кліку на кнопку "Купити"

function showCartList() {
    if (cart.items.length > 0) {
        cart.total = 0
        cart_list.innerHTML = ''
        cart.items.forEach(item => {
            let itemElement = cart.get_item(item)
            cart_list.innerHTML += itemElement
            cart.total += item.price
        })
    }
    cart_total.innerHTML = cart.total
}

// Функція для додавання товару до кошика при кліку на кнопку "Купити"
function addToCart(event) {
    // Отримуємо батьківський елемент (картку товару), який містить інформацію про товар
    let productCard = event.target.closest('.card');

    // Отримуємо дані про товар з елементів картки товару
    let title = productCard.querySelector('.text-card').textContent;
    let price = parseFloat(productCard.querySelector('.price-amount').innerHTML); // Витягуємо ціну і перетворюємо на число
    // Інші дані про товар (зображення, опис) можна отримати аналогічно

    // Створюємо об'єкт товару
    let product = {
        title: title,
        price: price,
    };
    // Додаємо товар до кошика
    cart.addItem(product);
}

// Отримуємо всі кнопки "Купити" на сторінці
let buyButtons = document.querySelectorAll('.products-list .cart-btn');
// Навішуємо обробник подій на кожну кнопку "Купити"
if (buyButtons) {
    buyButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Змінні для переключення екранів "магазин" і "кошик"
let cart_block = document.querySelector("#cart");
let order_form = document.querySelector(".order-form");

let shop_page = document.querySelector(".shop-page");
let cartBtn = document.querySelector("#cartBtn");
let productsBtn = document.querySelector("#productsBtn");

// При натисканні на "Кошик" відображаємо блок #cart, а блок з товарами приховуємо
cartBtn.addEventListener("click", function () {
    cart_block.style.display = "block";
    shop_page.style.display = "none";
    if (cart.items.length > 0) {
        order_form.style.display = "block";
    }
    showCartList()
})

// Приховуємо кошик, показуємо товари
productsBtn.addEventListener("click", function () {
    cart_block.style.display = "none";
    shop_page.style.display = "block";
})