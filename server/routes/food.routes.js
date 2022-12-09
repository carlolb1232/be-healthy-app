const FoodController = require('../controllers/food.controller');

module.exports = app => {
  app.get("/api/foods", FoodController.getAllFoods);
  app.get("/api/foods/:id", FoodController.getOneFood);
  app.post("/api/foods", FoodController.createOneFood);
  app.put("/api/foods/:id", FoodController.updateOneFood);
  app.delete("/api/foods/:id", FoodController.deleteOneFood);
}