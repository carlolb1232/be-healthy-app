const PeriodController = require('../controllers/period.controller')

module.exports = app => {
  app.get("/api/periods-user/:idUser", PeriodController.getPeriodsFromUser);
  app.post("/api/period", PeriodController.createOnePeriod);
  app.put("/api/period-rutines", PeriodController.updateOnePeriodRutines);
  app.put("/api/period-diets", PeriodController.updateOnePeriodDiets);
  app.put("/api/period-food-section/:idPeriod/:section", PeriodController.updateOnePeriodDiets);
  app.get("/api/foods-section/:idPeriod/:section", PeriodController.getFoodsPerSection);
  app.delete("/api/delete-period/:id", PeriodController.deletePeriod);
  app.delete("/api/delete-food-period/:idFood/:section/:idPeriod", PeriodController.deleteFoodFromDiet);
}