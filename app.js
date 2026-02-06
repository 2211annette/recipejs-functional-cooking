// Recipe data - Foundation for all 4 parts
// ============================================
// RECIPE APP (IIFE)
// ============================================

const RecipeApp = (() => {

    // ============================================
    // DATA
    // ============================================

    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: [
                "400g spaghetti",
                "200g pancetta or guanciale",
                "4 large eggs",
                "100g Pecorino Romano cheese",
                "Black pepper",
                "Salt"
            ],
            steps: [
                "Bring a large pot of salted water to boil",
                "Cook spaghetti according to package directions",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Beat eggs in a bowl",
                        "Grate cheese and add to eggs",
                        "Add generous black pepper",
                        "Mix well"
                    ]
                },
                "Cook pancetta until crispy",
                "Combine pasta with sauce and serve"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken pieces in a creamy tomato sauce.",
            category: "curry",
            ingredients: [
                "Chicken",
                "Yogurt",
                "Spices",
                "Tomato puree",
                "Cream",
                "Butter"
            ],
            steps: [
                {
                    text: "Marinate chicken",
                    substeps: [
                        "Mix yogurt and spices",
                        "Coat chicken",
                        "Rest 30 minutes"
                    ]
                },
                "Cook chicken",
                "Prepare sauce",
                "Add chicken to sauce",
                "Simmer and serve"
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Flaky French pastry.",
            category: "baking",
            ingredients: [
                "Flour",
                "Butter",
                "Milk",
                "Yeast",
                "Sugar",
                "Egg"
            ],
            steps: [
                {
                    text: "Prepare dough",
                    substeps: [
                        "Mix ingredients",
                        "Knead dough",
                        "Let rise"
                    ]
                },
                {
                    text: "Laminate dough",
                    substeps: [
                        "Add butter",
                        "Fold and chill",
                        "Repeat folds"
                    ]
                },
                "Shape croissants",
                "Bake until golden"
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh veggie salad with feta.",
            category: "salad",
            ingredients: [
                "Tomatoes",
                "Cucumber",
                "Olives",
                "Feta",
                "Olive oil"
            ],
            steps: [
                "Chop vegetables",
                "Mix ingredients",
                "Drizzle olive oil",
                "Serve fresh"
            ]
        },
        {
            id: 5,
            title: "Beef Wellington",
            time: 120,
            difficulty: "hard",
            description: "Beef wrapped in pastry.",
            category: "meat",
            ingredients: [
                "Beef fillet",
                "Mushrooms",
                "Puff pastry",
                "Egg",
                "Mustard"
            ],
            steps: [
                "Sear beef",
                "Prepare mushroom duxelles",
                "Wrap beef",
                "Bake until done"
            ]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Quick vegetable dish.",
            category: "vegetarian",
            ingredients: [
                "Mixed vegetables",
                "Soy sauce",
                "Garlic",
                "Oil"
            ],
            steps: [
                "Heat pan",
                "Stir fry vegetables",
                "Add sauce",
                "Serve hot"
            ]
        }
    ];

    // ============================================
    // STATE
    // ============================================

    let currentFilter = 'all';
    let currentSort = 'none';

    // ============================================
    // DOM
    // ============================================

    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // ============================================
    // STEPS RENDERING (LU STEP 4 & 5)
    // ============================================

    const renderSteps = (steps, level = 0) => {
        const listClass = level === 0 ? 'steps-list' : 'substeps-list';
        let html = `<ol class="${listClass}">`;

        steps.forEach(step => {
            if (typeof step === 'string') {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                if (step.substeps) {
                    html += renderSteps(step.substeps, level + 1);
                }
                html += `</li>`;
            }
        });

        return html + `</ol>`;
    };

    const createStepsHTML = (steps) => {
        if (!steps || steps.length === 0) {
            return '<p>No steps available</p>';
        }
        return renderSteps(steps);
    };

    // ============================================
    // CARD TEMPLATE (FIXED STRUCTURE)
    // ============================================

    const createRecipeCard = (recipe) => `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>

            <div class="card-actions">
                <button class="toggle-btn" data-toggle="ingredients" data-recipe-id="${recipe.id}">
                    🥗 Show Ingredients
                </button>
                <button class="toggle-btn" data-toggle="steps" data-recipe-id="${recipe.id}">
                    📋 Show Steps
                </button>
            </div>

            <div class="ingredients-container" data-recipe-id="${recipe.id}">
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>

            <div class="steps-container" data-recipe-id="${recipe.id}">
                ${createStepsHTML(recipe.steps)}
            </div>
        </div>
    `;

    // ============================================
    // TOGGLE HANDLER (LU STEP 6)
    // ============================================

    const handleToggleClick = (event) => {
        const btn = event.target.closest('.toggle-btn');
        if (!btn) return;

        const id = btn.dataset.recipeId;
        const type = btn.dataset.toggle;

        const container = document.querySelector(
            `.${type}-container[data-recipe-id="${id}"]`
        );

        container.classList.toggle('visible');
        btn.textContent = container.classList.contains('visible')
            ? `Hide ${type}`
            : `Show ${type}`;
    };

    // ============================================
    // RENDER
    // ============================================

    const renderRecipes = (list) => {
        recipeContainer.innerHTML = list.map(createRecipeCard).join('');
    };

    const updateDisplay = () => {
        renderRecipes(recipes);
    };

    // ============================================
    // INIT
    // ============================================

    const setupEventListeners = () => {
        recipeContainer.addEventListener('click', handleToggleClick);
    };

    const init = () => {
        setupEventListeners();
        updateDisplay();
        console.log('RecipeApp ready!');
    };

    return { init };

})();

// START APP
RecipeApp.init();
