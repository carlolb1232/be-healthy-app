const mongoose = require('mongoose')

const PeriodSchema = new mongoose.Schema(
  {
    date:{
      type:Date,
      require:[
        true,
        "Ingrese una fecha"
      ]
    },
    height:{
      type: Number,
      require:[
        true,
        "Ingrese una altura"
      ]
    },
    weitght:{
      type: Number,
      require:[
        true,
        "Ingrese una peso"
      ]
    },
    imc:{
      type: Number,
    },
    rutines:[
      {
        type: mongoose.Schema.Types.ObjectId, ref: "Excercise"
      }
    ],
    shouldEat:[
      {
        type: mongoose.Schema.Types.ObjectId, ref: "Food"
      }
    ],
    canEat:[
      {
        type: mongoose.Schema.Types.ObjectId, ref: "Food"
      }
    ],
    shouldntEat:[
      {
        type: mongoose.Schema.Types.ObjectId, ref: "Food"
      }
    ]
  },
  {
    timestamps:true
  }
)

const Period = mongoose.model("Period", PeriodSchema);

module.exports = {Period, PeriodSchema};