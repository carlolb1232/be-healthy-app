const RutineController = require('../controllers/rutine.controller');

module.exports = app => {
  app.post("/api/rutines", RutineController.createOneRutine);
  app.get("/api/rutines/:idPeriod", RutineController.getRutinesFromPeriod)
  app.delete("/api/delete-rutine/:id", RutineController.deleteRutine);
}