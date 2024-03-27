// JavaScript for meal plan functionality
const recommendedDishes = [
    {name: "Rice Bowl", price: 12.45, description: "A delicious rice bowl with various toppings."},
    {name: "Miso Ramen", price: 10.95, description: "Rich and flavorful miso ramen."},
    {name: "Bulgogi Bowl", price: 13.45, description: "Savory bulgogi beef served over rice."},
    {name: "Asteroid Belt K Dog", price: 6.59, description: "K Dog with cubed potatoes and choice of sauce."},
    {name: "Sun K Dog", price: 6.29, description: "Original K Dog covered in Hot Cheetos and choice of sauce."},
    {name: "Mercury K Dog", price: 6.29, description: "K Dog covered in blue takis with choice of sauce."},
    {name: "Ziti Pizza", price: 15.99, description: "Customer favorite!"},
    {name: "Cheese Pizza", price: 11.99, description: "Original cheese pizza."},
    {name: "Chicken Pesto Pizza", price: 15.99, description: "Chicken Pesto pizza topped with tomato."}
];

const mealPlan = [];

function renderRecommendedDishes() {
    const recommendedDishesContainer = document.getElementById('recommended-dishes');
    recommendedDishesContainer.innerHTML = '';

    recommendedDishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.innerHTML = `
            <p>${dish.name} - $${dish.price}</p>
            <p class="text-sm mb-2">${dish.description}</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onclick="addToMealPlan('${dish.name}', ${dish.price}, '${dish.description}')">Add to Meal Plan</button>
        `;
        recommendedDishesContainer.appendChild(dishElement);
    });
}

function renderMealPlan() {
    const mealPlanContainer = document.getElementById('meal-plan');
    mealPlanContainer.innerHTML = '';

    mealPlan.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)} (${item.description})</p>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onclick="removeFromMealPlan('${item.name}')">Remove</button>
        `;
        mealPlanContainer.appendChild(itemElement);
    });

    const totalCostElement = document.getElementById('total-cost');
    const totalCost = mealPlan.reduce((acc, curr) => acc + curr.price, 0);
    totalCostElement.textContent = totalCost.toFixed(2);
}

function addToMealPlan(name, price, description) {
    mealPlan.push({ name, price, description });
    renderMealPlan();
}

function removeFromMealPlan(name) {
    const index = mealPlan.findIndex(item => item.name === name);
    if (index !== -1) {
        mealPlan.splice(index, 1);
    }
    renderMealPlan();
}

document.addEventListener('DOMContentLoaded', () => {
    renderRecommendedDishes();
    renderMealPlan();
});
