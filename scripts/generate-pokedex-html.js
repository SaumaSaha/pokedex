const fs = require("fs");

const getLines = (rawData) => {
  return rawData.trim().split("\n");
};

const capitalizeTypes = (types) => {
  return types
    .split(",")
    .reduce(
      (newTypes, type) =>
        newTypes + " " + type.slice(0, 1).toUpperCase() + type.slice(1),
      ""
    );
};

const capitalizeName = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

const getPokemonSpecifications = (pokemonDetail) => {
  return pokemonDetail.split("|");
};

let imgIndex = 1;

const generatePokemonCard = (pokemonDetail) => {
  const [id, name, types, speed, hp, xp, attack, defence, weight] =
    getPokemonSpecifications(pokemonDetail);

  const typesInCaps = capitalizeTypes(types);
  const nameInCap = capitalizeName(name);
  const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(imgIndex++)
    .toString()
    .padStart(3, 0)}.png`;

  return `<div class="card">
<div class="pokemon-avatar-container">
<img src="${imgUrl}" class = "pokemon-avatar"/>
</div>
<div class="pokemon-name"><p>${nameInCap}</p></div>
<div class="pokemon-stats">
  <div class="stat">
    <div class="stat-name">Types</div>
    <div class="stat-data"><p>${typesInCaps}</p></div>
  </div>
  <div class="stat">
    <div class="stat-name">Weight</div>
    <div class="stat-data"><p>${weight}</p></div>
  </div>
  <div class="stat">
    <div class="stat-name">Hp</div>
    <div class="stat-data"><p>${hp}</p></div>
  </div>
  <div class="stat">
    <div class="stat-name">Xp</div>
    <div class="stat-data"><p>${xp}</p></div>
  </div>
  <div class="stat">
    <div class="stat-name">Attack</div>
    <div class="stat-data"><p>${attack}</p></div>
  </div>
  <div class="stat">
    <div class="stat-name">Defence</div>
    <div class="stat-data"><p>${defence}</p></div>
  </div>
</div>
</div>`;
};

const main = () => {
  const rawData = fs.readFileSync("./resources/pokemon-data.txt", "utf-8");
  const pokemonDetails = getLines(rawData);
  console.log(
    pokemonDetails.reduce(
      (pokeDex, pokemonDetail) => pokeDex + generatePokemonCard(pokemonDetail),
      ""
    )
  );
};

main();
