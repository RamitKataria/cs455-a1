const initialRecipeJsonStr = '{"Sandwich":{"ingredients":["2 slices of bread","A protein of your choice","Veggies of your choice","Cheese slices (optional)","Dressings of your choice"],"steps":["Put spread-type dressings on one or both slices of bread","Place the protein on one of the slices","Place the cheese slice on top of the protein","Now place the cheese slice","Add in any sauce-type dressings","Place the other slice on top and compress the sandwich a little"]},"Quinoa Tabouli":{"ingredients":["1 Cup (Preferably Red) Quinoa","2 Cups Water","1 Cucumber, seeded, small dice","3 Tomatoes, small dice","1 Small Red onion, minced","1 Garlic Clove, fine dice","1 Cup Parsley, chopped","1/2 Cup Fresh Mint","1/2 Cup Fresh Lemon Juice","1/4 Cup Olive Oil","1 Tsp Salt"],"steps":["In medium sauce pan bring quinoa, 1/2 tsp salt, and 2 cups of water to a boil. Reduce heat, cover and simmer for 15 minutes. Remove from heat and cool completely, allowing any remaining water to evaporate.","Toss cooled quinoa with all remaining ingredients in a large mixing bowl. Adjust seasoning with salt and pepper. Serve with crackers or as a side dish."]}}';

let recipes = JSON.parse(initialRecipeJsonStr);

function toggleCollapse(itemHeaderE) {
    const contentE = itemHeaderE.parentNode.lastElementChild;
    const iconE = itemHeaderE.lastElementChild;

    if (contentE.style.display === 'block') {
        contentE.style.display = 'none';
        iconE.innerHTML = '+'
    } else {
        contentE.style.display = 'block';
        iconE.innerHTML = '-';
    }
}

function removeRecipe(deleteButtonE) {
    const card = deleteButtonE.parentNode.parentNode;
    const recipeName = card.firstElementChild.firstElementChild.textContent;
    delete recipes[recipeName];
    card.remove();
}

function renderAllRecipes() {
    const accordionE = document.getElementById('recipes-accordion');
    accordionE.innerHTML = '';
    for (const title in recipes) {
        accordionE.insertAdjacentHTML('beforeend', `<article class="accordion-item">
                <h2 class="accordion-item-header" onclick="toggleCollapse(this)">
                    <span class="accordion-item-title">${title}</span>
                    <span class="accordion-item-icon">+</span>
                </h2>
                <div class="accordion-item-content">
                    Ingredients:
                        <ul>${recipes[title]['ingredients'].map((ing) => `<li>${ing}</li>`).join('')}</ul>
                    Steps:
                        <ol>${recipes[title]['steps'].map((s) => `<li>${s}</li>`).join('')}</ol>
                 <button class="remove-button" onclick="removeRecipe(this)">REMOVE</button>
                </div>
              </article>`)
    }
}

document.getElementById('remove-all-button').onclick = () => {
    recipes = {};
    renderAllRecipes();
};

renderAllRecipes();

function toggleForm() {
    const formE = document.getElementById('new-recipe-form');
    const newButtonE = document.getElementById('show-form-button');

    if (formE.style.display === 'block') {
        formE.style.display = 'none';
        newButtonE.innerHTML = 'NEW';
    } else {
        formE.style.display = 'block';
        newButtonE.innerHTML = 'CANCEL';

    }
}

const recipeFormE = document.getElementById('new-recipe-form');
recipeFormE.onsubmit = (e) => {
    e.preventDefault();
    toggleForm();
    let data = new FormData(recipeFormE);
    recipes[data.get('recipe_name')] = {
        ingredients: data.get('recipe_ings').split('\n'),
        steps: data.get('recipe_steps').split('\n')
    }
    renderAllRecipes();
}
