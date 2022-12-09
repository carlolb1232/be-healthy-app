const mongoose = require("mongoose");

const ExcericeSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [
        true,
        "El nombre del ejercicio "
      ],
    },
    description:{
      type: String,
      required: [
        true,
        "El ejercicio requiere de una descripción"
      ],
    },
    link:{
      type: String,
    },
  },
  {
    timestamps: true
  }
)

const Excercise = mongoose.model("Excercise", ExcericeSchema);

module.exports = {Excercise, ExcericeSchema};
