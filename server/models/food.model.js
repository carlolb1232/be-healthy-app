const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [
        true,
        "El nombre de la comida"
      ],
    },
    img:{
      type: String,
      required:[
        true,
        "Ingrese link de imagen"
      ]
    }
  },
  {
    timestamps: true
  }
)

const Food = mongoose.model("Food", FoodSchema);

module.exports = {Food, FoodSchema};
