const pokemons = require('./pokemons-base');
const cors = require('cors');
const app = require('express')();

/**Cors configuration process */
app.use(cors());
/**
 * App listening at port 7777
 */
app.listen(7777);

console.log('================================');
console.log('WEB-SERVICES MOCK INICIALIZADOS');
console.log('Endereço: http://localhost:7777/');
console.log('================================');



app.get('/pokemons/:option', (req, res) => {
  let responseBody = [];
  const option = req.params['option'];

  if (option === 'favorite') {
    responseBody = pokemons.filter(pokemon => pokemon.favorite);
  }

  if (option === 'received') {
    responseBody = pokemons.filter(pokemon => pokemon.received);
  }

  if (option === 'deleted') {
    responseBody = pokemons.filter(pokemon => pokemon.deleted);
  }

  res.json(responseBody);
});

app.delete('/pokemons/:id', (req, res) => {
  const pokemonId = req.params['id'];
  const pokeSelected = pokemons.find(pokemon => pokemon.id == pokemonId)

  if (pokeSelected) {
    pokeSelected.deleted = true;
    pokeSelected.favorite = false;
    pokeSelected.received = false;
  }

  res.json({
    message: 'Pokemon deleted',
    code: 2321
  });
});

app.get('/pokemons/favorite/:id', (req, res) => {
  const pokemonId = req.params['id'];
  const pokeSelected = pokemons.find(pokemon => pokemon.id == pokemonId)
  pokeSelected.favorite = true;
  pokeSelected.deleted = false;
  pokeSelected.received = false;

  res.json({
    message: 'Pokemon favorited',
    code: 2324
  });
});

app.get('/pokemons/receive/:id', (req, res) => {
  const pokemonId = req.params['id'];
  const pokeSelected = pokemons.find(pokemon => pokemon.id == pokemonId)
  pokeSelected.received = true;
  pokeSelected.favorite = false;
  pokeSelected.deleted = false;

  res.json({
    message: 'Pokemon received',
    code: 2323
  });
});
