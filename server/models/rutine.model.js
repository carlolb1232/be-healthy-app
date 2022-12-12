const mongoose = require("mongoose");

const RutineSchema = new mongoose.Schema(
  {
    excercise:{
      type: mongoose.Schema.Types.ObjectId, ref: "Excercise"
    },
    series:{
      type: Number,
    },
    reps:{
      type: Number,
    },
    rest:{
      type: Number,
    },
  },
  {
    timestamps: true
  }
)

const Rutine = mongoose.model("Rutine", RutineSchema);

module.exports = {Rutine, RutineSchema};