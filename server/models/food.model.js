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
  },
  {
    timestamps: true
  }
)

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
