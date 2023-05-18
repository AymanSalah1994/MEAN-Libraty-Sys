const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//Schema
let employeeSchema = new mongoose.Schema({
  _id: Number,
  firstName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]*$/.test(v);
      },
      message: "Please enter a valid firstName",
    },
    required: [true, "firstName  is required"],
  },
  lastName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]*$/.test(v);
      },
      message: "Please enter a valid lastName",
    },
    required: [true, "lasttName  is required"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email must be uniqe"],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "email  is required"],
  },
  password: {
    type: String,
    required: true,
    length: { min: 5 },
  },
  image: String,

  birthDate: {
    type: Date,
},
  hireDate: { type: Date },

  salary: {
    type: Number,
    required: true,
  },
  isActivated: {type:Boolean, default: false},
});

employeeSchema.plugin(AutoIncrement, { id: "employeeId", inc_field: "_id" });
mongoose.model("employees", employeeSchema);
