//Import the mongoose module
const mongoose = require("mongoose");

require("dotenv").config;

// console.log(process.env.mongoAtlasUri)

// // Database connection :Connect to MongoDB

// Connect to the MongoDB cluster
mongoose.connect(
  "mongodb+srv://beya:beya123456@cluster0.d2x9y.mongodb.net/person?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.log(err) : console.log(" Mongoose is connected"))
);

//Define a schema : person shema
const { Schema } = mongoose;
const PersonSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: String,
});

// // Creat a model from schema :person model
const PersonModel = mongoose.model("person", PersonSchema);

// // Create an instance of model PersonModel
const beya = new PersonModel({
  name: "amira",
  age: 25,
  favoriteFoods: "ma9arouna",
});

// // Save the new model instance, passing a callback
// beya.save((err,data)=> {
//     if (err) {console.log(err)};
//     e
//     // saved!
//   });

beya.save((err, data)=> {
  if (err) {
   console.log(err)

  } else {
    console.log(data);
  }
});

// //Create Many Records with model.create()

PersonModel.create([
  { name: "beya", age: 27, favoriteFoods: "koskos" },
  { name: "badiaa", age: 26, favoriteFoods: "rice salad" },
  { name: "wafa", age: 30, favoriteFoods: "koskos" },
  { name: "amira", age: 15, favoriteFoods: "djej" },
]);

// // Use model.find() to Search Your Database

PersonModel.find({ name: "amira" }).exec(function (err, data) {
  if (err) {
    return handleError(err);
  } else {
    console.log(data);
  }
});

// //Use model.findOne()

PersonModel.findOne({ favoriteFoods: "koskos" }).exec(function (err, data) {
  if (err) {
    return handleError(err);
  } else {
    console.log(data);
  }
});

// // Use model.findById(()
PersonModel.findById("60d0fa8f99e18e0980c12674", function (err, data) {
  if (err) {
    return console.log(err);
  } else {
    console.log(data);
  }
});

// //Perform Classic Updates by Running Find, Edit, then Save
// PersonModel.findById("60dda213ccf313255cbda490", function (err, data) {
//   if (err) {
//     return console.log(err);
//   } else {
//     data.favoriteFoods.push("ma9arouna");
//     console.log(data);
//     data.save();
//   }
// });

// // model.findOneAndUpdate()
PersonModel.findOneAndUpdate(
  { name: "amira" },
  { new: true },
  { age: 15 },
  (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(data);
    }
  }
);

// // Delete One Document Using model.findByIdAndRemove
PersonModel.findByIdAndRemove("60d0fa8f99e18e0980c12673", (err, data) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(data);
  }
});

// // Delete Many Documents with model.remove()
PersonModel.remove(
  { name: "amira" },
  (done = (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(data);
      console.log(data.deletedCount);
    }
  })
);

// // Chain Search Query Helpers to Narrow Search Results
PersonModel.find({ favoriteFoods: "rice salad" })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(
    (done = (err, data) => {
      if (err) return console.log(err);
      done(data);
    })
  );
