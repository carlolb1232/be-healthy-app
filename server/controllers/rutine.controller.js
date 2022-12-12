const { Period } = require("../models/period.mode");
const { Rutine } = require("../models/rutine.model");


module.exports.createOneRutine = async (req, res) => {
  try {
    const { excercise, series, reps, rest, idPeriod } = req.body;
    const rutine = await Rutine.create({excercise, series, reps, rest})
    const period = await Period.findById(idPeriod);
    period.rutines.push(rutine)
    res.json({message: "", rutine:rutine})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.getRutinesFromPeriod = async (req, res) => {
  try {
    const { idPeriod } = req.params;
    const period = await Period.findById(idPeriod).populate("rutines").exec();
    res.json({message:"", rutines:period.rutines})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}