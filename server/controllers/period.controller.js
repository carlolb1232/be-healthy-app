const {Period} = require("../models/period.model");
const { User } = require("../models/user.model");


module.exports.createOnePeriod = async(req, res) => {
  try {
    const { date, height, weight, idUser} = req.body
    const period = await Period.create({date, height, weight});
    const user = await User.findById(idUser);
    user.periods.push(period)
    user.save()
    res.json({message: "", period:period});
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.getPeriodsFromUser = async(req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findById(idUser).populate("periods").exec();
    res.json({message:"", periods:user.periods})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.updateOnePeriodRutines = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const period = await Period.findById(id);
    period.rutines.push(body)
    period.save()
    res.json({message: "", period: period})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.updateOnePeriodDiets = async (req, res) => {
  try {
    const { foods, section } = req.body;
    const { idPeriod } = req.params;
    const period = await Period.findById(idPeriod);
    period[`${section}`].push(foods)
    period.save()
    res.json({message: "", period: period})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.getFoodsPerSection = async (req, res) => {
  try {
    const { idPeriod, section } = req.params;
    const period = await Period.findById(idPeriod).populate(`${section}`).exec();
    const foods = period[`${section}`]
    res.json({message:"", foods:foods})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}