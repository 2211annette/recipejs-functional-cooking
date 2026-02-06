// // Recipe data - Foundation for all 4 parts
// // ============================================
// // RECIPE APP (IIFE)
// // ============================================

// const RecipeApp = (() => {

//     // ============================================
//     // DATA
//     // ============================================

//     const recipes = [
//         {
//             id: 1,
//             title: "Classic Spaghetti Carbonara",
//             time: 25,
//             difficulty: "easy",
//             description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
//             category: "pasta",
//             ingredients: [
//                 "400g spaghetti",
//                 "200g pancetta or guanciale",
//                 "4 large eggs",
//                 "100g Pecorino Romano cheese",
//                 "Black pepper",
//                 "Salt"
//             ],
//             steps: [
//                 "Bring a large pot of salted water to boil",
//                 "Cook spaghetti according to package directions",
//                 {
//                     text: "Prepare the sauce",
//                     substeps: [
//                         "Beat eggs in a bowl",
//                         "Grate cheese and add to eggs",
//                         "Add generous black pepper",
//                         "Mix well"
//                     ]
//                 },
//                 "Cook pancetta until crispy",
//                 "Combine pasta with sauce and serve"
//             ]
//         },
//         {
//             id: 2,
//             title: "Chicken Tikka Masala",
//             time: 45,
//             difficulty: "medium",
//             description: "Tender chicken pieces in a creamy tomato sauce.",
//             category: "curry",
//             ingredients: [
//                 "Chicken",
//                 "Yogurt",
//                 "Spices",
//                 "Tomato puree",
//                 "Cream",
//                 "Butter"
//             ],
//             steps: [
//                 {
//                     text: "Marinate chicken",
//                     substeps: [
//                         "Mix yogurt and spices",
//                         "Coat chicken",
//                         "Rest 30 minutes"
//                     ]
//                 },
//                 "Cook chicken",
//                 "Prepare sauce",
//                 "Add chicken to sauce",
//                 "Simmer and serve"
//             ]
//         },
//         {
//             id: 3,
//             title: "Homemade Croissants",
//             time: 180,
//             difficulty: "hard",
//             description: "Flaky French pastry.",
//             category: "baking",
//             ingredients: [
//                 "Flour",
//                 "Butter",
//                 "Milk",
//                 "Yeast",
//                 "Sugar",
//                 "Egg"
//             ],
//             steps: [
//                 {
//                     text: "Prepare dough",
//                     substeps: [
//                         "Mix ingredients",
//                         "Knead dough",
//                         "Let rise"
//                     ]
//                 },
//                 {
//                     text: "Laminate dough",
//                     substeps: [
//                         "Add butter",
//                         "Fold and chill",
//                         "Repeat folds"
//                     ]
//                 },
//                 "Shape croissants",
//                 "Bake until golden"
//             ]
//         },
//         {
//             id: 4,
//             title: "Greek Salad",
//             time: 15,
//             difficulty: "easy",
//             description: "Fresh veggie salad with feta.",
//             category: "salad",
//             ingredients: [
//                 "Tomatoes",
//                 "Cucumber",
//                 "Olives",
//                 "Feta",
//                 "Olive oil"
//             ],
//             steps: [
//                 "Chop vegetables",
//                 "Mix ingredients",
//                 "Drizzle olive oil",
//                 "Serve fresh"
//             ]
//         },
//         {
//             id: 5,
//             title: "Beef Wellington",
//             time: 120,
//             difficulty: "hard",
//             description: "Beef wrapped in pastry.",
//             category: "meat",
//             ingredients: [
//                 "Beef fillet",
//                 "Mushrooms",
//                 "Puff pastry",
//                 "Egg",
//                 "Mustard"
//             ],
//             steps: [
//                 "Sear beef",
//                 "Prepare mushroom duxelles",
//                 "Wrap beef",
//                 "Bake until done"
//             ]
//         },
//         {
//             id: 6,
//             title: "Vegetable Stir Fry",
//             time: 20,
//             difficulty: "easy",
//             description: "Quick vegetable dish.",
//             category: "vegetarian",
//             ingredients: [
//                 "Mixed vegetables",
//                 "Soy sauce",
//                 "Garlic",
//                 "Oil"
//             ],
//             steps: [
//                 "Heat pan",
//                 "Stir fry vegetables",
//                 "Add sauce",
//                 "Serve hot"
//             ]
//         }
//     ];

//     // ============================================
//     // STATE
//     // ============================================

//     let currentFilter = 'all';
//     let currentSort = 'none';

//     // NEW: Add these
//     let searchQuery = '';
//     let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
//     let debounceTimer;
//     // ============================================
//     // DOM
//     // ============================================

//     const recipeContainer = document.querySelector('#recipe-container');
//     const filterButtons = document.querySelectorAll('.filter-btn');
//     const sortButtons = document.querySelectorAll('.sort-btn');

//     // NEW: Add these
//     const searchInput = document.querySelector('#search-input');
//     const clearSearchBtn = document.querySelector('#clear-search');
//     const recipeCountDisplay = document.querySelector('#recipe-count');
//     // ============================================
//     // STEPS RENDERING 
//     // ============================================

//     const renderSteps = (steps, level = 0) => {
//         const listClass = level === 0 ? 'steps-list' : 'substeps-list';
//         let html = `<ol class="${listClass}">`;

//         steps.forEach(step => {
//             if (typeof step === 'string') {
//                 html += `<li>${step}</li>`;
//             } else {
//                 html += `<li>${step.text}`;
//                 if (step.substeps) {
//                     html += renderSteps(step.substeps, level + 1);
//                 }
//                 html += `</li>`;
//             }
//         });

//         return html + `</ol>`;
//     };

//     const createStepsHTML = (steps) => {
//         if (!steps || steps.length === 0) {
//             return '<p>No steps available</p>';
//         }
//         return renderSteps(steps);
//     };


// // NEW: Search filter
// const filterBySearch = (recipes, query) => {
//     if (!query || query.trim() === '') {
//         return recipes;
//     }

//     const lowerQuery = query.toLowerCase().trim();

//     return recipes.filter(recipe => {
//         // TODO: Search in title
//         const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);


//         // TODO: Search in ingredients (use .some())
//         const ingredientMatch = recipe.ingredients.some(ingredient => 
//             ingredient.toLowerCase().includes(lowerQuery)
//         );

//         // TODO: Search in description
//         const descriptionMatch = recipe.description.toLowerCase().includes(lowerQuery);

//         return titleMatch || ingredientMatch || descriptionMatch;
//     });
// };

// // NEW: Favorites filter
//  const filterFavorites = (recipes) => {
//     // TODO: Return only recipes where recipe.id is in favorites array
//     // Hint: Use .filter() and check favorites.includes(recipe.id)
//     return recipes.filter(recipe => favorites.includes(recipe.id));
// };

// const applyFilter = (recipes, filterType) => {
//     switch(filterType) {
//         case 'easy':
//             return filterByDifficulty(recipes, 'easy');
//         case 'medium':
//             return filterByDifficulty(recipes, 'medium');
//         case 'hard':
//             return filterByDifficulty(recipes, 'hard');
//         case 'quick':
//             return filterByTime(recipes, 30);

//         // NEW: Add favorites case
//         case 'favorites':
//             // YOUR CODE HERE

//         case 'all':
//         default:
//             return filterFavorites(recipes);
//     }
// };
//     // ============================================
//     // CARD TEMPLATE (FIXED STRUCTURE)
//     // ============================================

//     const createRecipeCard = (recipe) => {
//         // Check if favorited
//         const isFavorited = favorites.includes(recipe.id);
//         const heartIcon = isFavorited ? '❤️' : '🤍';

//         return `
//         <div class="recipe-card" data-id="${recipe.id}">

//             <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
//                     data-recipe-id="${recipe.id}">
//                 ${heartIcon}
//             </button>

//             <h3>${recipe.title}</h3>
//             <p>${recipe.description}</p>

//             <div class="card-actions">
//                 <button class="toggle-btn" data-toggle="ingredients" data-recipe-id="${recipe.id}">
//                     🥗 Show Ingredients
//                 </button>
//                 <button class="toggle-btn" data-toggle="steps" data-recipe-id="${recipe.id}">
//                     📋 Show Steps
//                 </button>
//             </div>

//             <div class="ingredients-container" data-recipe-id="${recipe.id}">
//                 <ul>
//                     ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
//                 </ul>
//             </div>

//             <div class="steps-container" data-recipe-id="${recipe.id}">
//                 ${createStepsHTML(recipe.steps)}
//             </div>
//         </div>
//     `;
//     }
//     // ============================================
//     // TOGGLE HANDLER (LU STEP 6)
//     // ============================================

//     const handleToggleClick = (event) => {
//         const btn = event.target.closest('.toggle-btn');
//         if (!btn) return;

//         const id = btn.dataset.recipeId;
//         const type = btn.dataset.toggle;

//         const container = document.querySelector(
//             `.${type}-container[data-recipe-id="${id}"]`
//         );

//         container.classList.toggle('visible');
//         btn.textContent = container.classList.contains('visible')
//             ? `Hide ${type}`
//             : `Show ${type}`;
//     };

//     // ============================================
//     // RENDER
//     // ============================================

//     const renderRecipes = (list) => {
//         recipeContainer.innerHTML = list.map(createRecipeCard).join('');
//     };

//     const updateDisplay = () => {
//         renderRecipes(recipes);
//     };

//     // ============================================
//     // INIT
//     // ============================================

//     const setupEventListeners = () => {
//         recipeContainer.addEventListener('click', handleToggleClick);
//     };

//     const init = () => {
//         setupEventListeners();
//         updateDisplay();
//         console.log('RecipeApp ready!');
//     };

//     return { init };

// })();

// // START APP
// RecipeApp.init();

// ============================================
// RECIPE APP (IIFE)
// ============================================

const RecipeApp = (() => {
    'use strict';

    // ============================================
    // PRIVATE: DATA
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
    // PRIVATE: STATE
    // ============================================

    let currentFilter = 'all';
    let currentSort = 'none';
    let searchQuery = '';
    let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    let debounceTimer;

    // ============================================
    // PRIVATE: DOM REFERENCES
    // ============================================

    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');
    const searchInput = document.querySelector('#search-input');
    const clearSearchBtn = document.querySelector('#clear-search');
    const recipeCountDisplay = document.querySelector('#recipe-count');

    // ============================================
    // PRIVATE: PURE FILTER FUNCTIONS
    // ============================================

    const filterByDifficulty = (recipes, difficulty) =>
        recipes.filter(r => r.difficulty === difficulty);

    const filterByTime = (recipes, maxTime) =>
        recipes.filter(r => r.time <= maxTime);

    const filterBySearch = (recipes, query) => {
        if (!query.trim()) return recipes;
        const q = query.toLowerCase();

        return recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(q) ||
            recipe.description.toLowerCase().includes(q) ||
            recipe.ingredients.some(i => i.toLowerCase().includes(q))
        );
    };

    const filterFavorites = (recipes) =>
        recipes.filter(r => favorites.includes(r.id));

    const applyFilter = (recipes, filterType) => {
        switch (filterType) {
            case 'easy': return filterByDifficulty(recipes, 'easy');
            case 'medium': return filterByDifficulty(recipes, 'medium');
            case 'hard': return filterByDifficulty(recipes, 'hard');
            case 'quick': return filterByTime(recipes, 30);
            case 'favorites': return filterFavorites(recipes);
            default: return recipes;
        }
    };

    // ============================================
    // PRIVATE: PURE SORT FUNCTIONS
    // ============================================

    const sortByName = (recipes) =>
        [...recipes].sort((a, b) => a.title.localeCompare(b.title));

    const sortByTime = (recipes) =>
        [...recipes].sort((a, b) => a.time - b.time);

    const applySort = (recipes, sortType) => {
        switch (sortType) {
            case 'name': return sortByName(recipes);
            case 'time': return sortByTime(recipes);
            default: return recipes;
        }
    };

    // ============================================
    // PRIVATE: RENDER FUNCTIONS
    // ============================================

    const renderSteps = (steps, level = 0) => {
        const cls = level === 0 ? 'steps-list' : 'substeps-list';
        let html = `<ol class="${cls}">`;

        steps.forEach(step => {
            if (typeof step === 'string') {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                html += renderSteps(step.substeps, level + 1);
                html += `</li>`;
            }
        });

        return html + `</ol>`;
    };

    const createStepsHTML = (steps) =>
        steps && steps.length ? renderSteps(steps) : '<p>No steps available</p>';

    const createRecipeCard = (recipe) => {
        const isFav = favorites.includes(recipe.id);
        return `
        <div class="recipe-card">
            <button class="favorite-btn ${isFav ? 'favorited' : ''}"
                    data-recipe-id="${recipe.id}">
                ${isFav ? '❤️' : '🤍'}
            </button>

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
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>

            <div class="steps-container" data-recipe-id="${recipe.id}">
                ${createStepsHTML(recipe.steps)}
            </div>
        </div>`;
    };

    const renderRecipes = (list) => {
        recipeContainer.innerHTML = list.map(createRecipeCard).join('');
    };

    // ============================================
    // PRIVATE: UI HELPERS
    // ============================================

    const updateRecipeCounter = (showing, total) => {
        if (recipeCountDisplay) {
            recipeCountDisplay.textContent = `Showing ${showing} of ${total} recipes`;
        }
    };

    const updateDisplay = () => {
        let list = recipes;
        list = filterBySearch(list, searchQuery);
        list = applyFilter(list, currentFilter);
        list = applySort(list, currentSort);

        updateRecipeCounter(list.length, recipes.length);
        renderRecipes(list);
    };

    // ============================================
    // PRIVATE: FAVORITES MANAGEMENT
    // ============================================

    const saveFavorites = () => {
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
    };

    const toggleFavorite = (id) => {
        id = Number(id);
        favorites = favorites.includes(id)
            ? favorites.filter(f => f !== id)
            : [...favorites, id];

        saveFavorites();
        updateDisplay();
    };

    // ============================================
    // PRIVATE: EVENT HANDLERS
    // ============================================

    const handleToggleClick = (e) => {
        const btn = e.target.closest('.toggle-btn');
        if (!btn) return;

        const id = btn.dataset.recipeId;
        const type = btn.dataset.toggle;
        const box = document.querySelector(`.${type}-container[data-recipe-id="${id}"]`);

        box.classList.toggle('visible');
    };

    const handleFavoriteClick = (e) => {
        if (!e.target.classList.contains('favorite-btn')) return;
        toggleFavorite(e.target.dataset.recipeId);
    };

    const handleSearchInput = (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchQuery = e.target.value;
            updateDisplay();
        }, 300);

        clearSearchBtn.style.display = e.target.value ? 'block' : 'none';
    };

    const handleClearSearch = () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        updateDisplay();
    };

    // ============================================
    // PRIVATE: INITIALIZATION
    // ============================================

    const setupEventListeners = () => {
        recipeContainer.addEventListener('click', handleToggleClick);
        recipeContainer.addEventListener('click', handleFavoriteClick);

        searchInput?.addEventListener('input', handleSearchInput);
        clearSearchBtn?.addEventListener('click', handleClearSearch);
    };

    const init = () => {
        console.log('🍳 RecipeJS initializing...');
        setupEventListeners();
        updateDisplay();
        console.log('✅ RecipeJS ready!');
        console.log(`📊 ${recipes.length} recipes loaded`);
        console.log(`❤️ ${favorites.length} favorites saved`);
    };

    return { init, updateDisplay };
})();

RecipeApp.init();
