const URL = 'https://pokeapi.co/api/v2/pokemon/';
const searchInput = document.getElementById('search');
const pokemonImg = document.getElementById('img');
const pokemonInfo = document.getElementById('info');

// Función para mostrar un mensaje de error
function showError(message) {
    pokemonInfo.innerHTML = `<p class="error">${message}</p>`;
}

// Función para buscar un Pokémon
async function searchPokemon() {
    const searchedPokemon = searchInput.value.toLowerCase();

    try {
        const response = await fetch(URL + searchedPokemon);
        if (!response.ok) {
            showError(`No se encontró ningún Pokémon llamado "${searchedPokemon}"`);
            pokemonImg.src = '';  // Limpiar la imagen
            return;
        }

        const data = await response.json();

        // Mostrar la imagen del Pokémon
        pokemonImg.src = data.sprites.front_default;
        pokemonImg.alt = data.name;

        // Obtener el tipo del Pokémon
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');

        // Mostrar los datos del Pokémon
        pokemonInfo.innerHTML = 
        `
            <h2>${data.name.toUpperCase()}</h2>
            <p>Número: ${data.id}</p>
            <p>Altura: ${data.height / 10} m</p>
            <p>Peso: ${data.weight / 10} kg</p>
            <p class="pokemon-type">Tipo: ${types}</p>
        `;
    } catch (error) {
        showError('Ha ocurrido un error al buscar el Pokémon');
        console.error(error);
    }
}

// Agregar un controlador de eventos al botón de búsqueda
document.getElementById('botton').addEventListener('click', searchPokemon);
