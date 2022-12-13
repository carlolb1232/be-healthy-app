const {Food} = require("../models/food.model")


module.exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find()
    res.json({message: "", foods:foods})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.getOneFood = async (req,res) => {
  try {
    const { id } = req.params
    const food = await Food.findById(id);
    res.json({message:"", food:food})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.createOneFood = async (req, res) => {
  try {
    const { body } = req
    const food = await Food.create(body);
    res.json({message:"", food:food})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.updateOneFood = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const food = await Food.findByIdAndUpdate(id, body, { new:true, runValidators:true})
    res.json({message:"", food:food})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}

module.exports.deleteOneFood = async (req, res) => {
  try {
    const { id } = req.params
    const food = await Food.findByIdAndDelete(id);
    res.json({message:"", food:food})
  } catch (err) {
    res.json({ message: 'Ocurrio un error', errors: err.errors })
  }
}