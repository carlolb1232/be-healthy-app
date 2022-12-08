const ExcerciseController = require('../controllers/excercise.controller');

module.exports = app => {
  app.get("/api/excercises", ExcerciseController.getAllExcercices);
  app.get("/api/excercises/:id", ExcerciseController.getOneExcercise);
  app.post("/api/excercises/", ExcerciseController.createOneExcercise);
  app.put("/api/excercises/:id", ExcerciseController.updateOneExcercise);
  app.delete("/api/excercises/:id", ExcerciseController.deleteOneExcercise);
}