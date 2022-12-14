const {Excercise} = require("../models/excercise.model")


module.exports.getAllExcercices = async (req, res) => {
  try {
    const excercises = await Excercise.find()
    res.json({ message:"", excercises:excercises })
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.getOneExcercise = async (req, res) => {
  try {
    const { id } = req.params
    const excercise = await Excercise.findById(id);
    res.json({message:"", excercise:excercise})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.createOneExcercise = async (req, res) => {
  try {
    const { body } = req
    const excercise = await Excercise.create(body)
    res.json({message:"", excercise:excercise})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.updateOneExcercise = async (req, res) => {
  try {
    const { body } = req
    const { id } = req.params
    const excercise = await Excercise.findByIdAndUpdate({_id:id}, body, { new:true, runValidators:true })
    res.json({message: "", excercise:excercise})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.deleteOneExcercise = async (req, res) => {
  try {
    const { id } = req.params
    const excercise = await Excercise.findByIdAndDelete(id)
    res.json({message:"", excercise:excercise})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}