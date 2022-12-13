const PeriodController = require('../controllers/period.controller')

module.exports = app => {
  app.get("/api/periods-user/:idUser", PeriodController.getPeriodsFromUser);
  app.post("/api/period", PeriodController.createOnePeriod);
  app.put("/api/period-rutines", PeriodController.updateOnePeriodRutines);
  app.put("/api/period-diets", PeriodController.updateOnePeriodDiets);
}