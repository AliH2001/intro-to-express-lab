//bring - i n- the -express 
const express = require('express')
const morgan = require('morgan')
// Start - the - exspress-appliction 
const app = express()
// tell express  what - type - of - data - we - are - going - to - send - in - th
const port = 3000
app.use(morgan('dev'));

//-----------------1. Be Polite, Greet the User---------------------------//
app.get('/greetings/:ali', (req, res) => {
  const name = req.params.ali;
  res.send(`Hello there, ${name}!`);
})
//-------------------- 2. Rolling the Dice-----------------------------------//

app.get('/roll/:random', (req, res) => {
  const random = Math.floor(Math.random() * req.params.random) + 1;
  res.send(`You rolled a ${random}`);
})


//--------------------3. I Want THAT One!-----------------------------------//
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
  const idx = parseInt(req.params.index);
  const collectible = collectibles[idx];
  if (collectible) {
    res.send(`You want the ${collectible.name} for $${collectible.price}`);
  } else {
    res.status(404).send('This item is not yet in stock. Check back soon!');
  }
})



//---------------------4. Filter Shoes by Query Parameters ----------------//
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get('/shoes', (req, res) => {
  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

  const filteredShoes = shoes.filter(shoe => {
    if (minPrice && shoe.price < Number(minPrice)) return false;
    if (maxPrice && shoe.price > Number(maxPrice)) return false;
    if (type && shoe.type !== type) return false;
    return true;
  });

  res.json(filteredShoes);
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});