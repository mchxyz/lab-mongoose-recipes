const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
let newRecipe = {
  title: "Mondongo soup",
  cuisine: "french"
}
return Recipe.create(newRecipe) 

  })
  .then((createdRecipe) =>{
    //console.log(createdRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((createdRecipes)=>{
    //console.log(createdRecipes);
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese" }, { "duration": 100 }, {new: true}) // You should set the new option to true to return the document after update was applied
  })
  .then((updatedOne)=>{
    //console.log(updatedOne);
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then((deletedOne)=>{
    console.log(deletedOne);
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      //process.exit(0);
    })
  })
  .catch(error => {
    console.error('', error);
  });

// // If the Node process ends, close the Mongoose connection
// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     console.log('Mongoose default connection disconnected through app termination');
//     process.exit(0);
//   });
// });


// Iteration 5 - Remove a recipe
// Oh oh! The Carrot Cake is no longer available, so we need to remove it from the database.Using the Model.deleteOne method, remove that recipe from the database and display a success message after doing it!

// Iteration 6 - Close the Database
// As the last step, you need to close the database.Otherwise, the connection will stay open until the Node.js process dies.Pay attention to the asynchronicity of the operation.You should only close the connection after everything is done! 😉