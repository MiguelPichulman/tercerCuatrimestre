// ============================================
// CLASE 5: FETCH API + TYPESCRIPT
// ============================================

// ============================================
// Interfaces para PokeAPI
// ============================================

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  results: Pokemon[];
}

// ============================================
// Función para obtener pokemons
// ============================================

async function obtenerPokemons(): Promise<Pokemon[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

  if (!response.ok) {
    throw new Error("Error al obtener pokemons");
  }

  const data: PokemonResponse = await response.json();
  return data.results;
}

// ============================================
// Cargar y mostrar en el DOM
// ============================================

const btnCargar = document.querySelector<HTMLButtonElement>("#cargar");
const lista = document.querySelector<HTMLUListElement>("#lista");
const loading = document.querySelector<HTMLDivElement>("#loading");

async function cargarPokemons(): Promise<void> {
  if (!lista || !loading) return;

  try {
    // Mostrar loading
    loading.style.display = "block";
    lista.innerHTML = "";

    // Obtener datos
    const pokemons = await obtenerPokemons();

    // Ocultar loading
    loading.style.display = "none";

    // Renderizar
    pokemons.forEach((pokemon, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${pokemon.name}`;
      lista.appendChild(li);
    });
  } catch (error) {
    loading.style.display = "none";
    lista.innerHTML = '<li style="color: red;">Error al cargar pokemons</li>';
    console.error(error);
  }
}

btnCargar?.addEventListener("click", cargarPokemons);
