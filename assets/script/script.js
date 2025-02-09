const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const inp = document.querySelector('.input_search')
const buttonNext = document.querySelector('.btn-next')
const buttonPrev = document.querySelector('.btn-prev')
let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
    return data; 
    }
    
};

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = ''
    const data = await fetchPokemon(pokemon);
    if (data){
        pokemonImage.style.display = 'block'
         console.log(data); 
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    searchPokemon = data.id;
    if (data.id < 650){
         pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }else {
        pokemonImage.src = data.sprites.front_default;
         
    }
   
    inp.value = '';
    }else{
        pokemonName.innerHTML = 'Inválido'
        pokemonId.innerHTML = '**'
        pokemonImage.style.display = 'none'
    }
   
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
     renderPokemon(inp.value.toLowerCase());
     

});

buttonPrev.addEventListener('click', () => {
 if (searchPokemon > 1){
     renderPokemon(searchPokemon -= 1)
 }
   
});

buttonNext.addEventListener('click', () => {
   
    renderPokemon(searchPokemon += 1)
 
 });
 
renderPokemon(searchPokemon);

