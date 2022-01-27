import mongoose, { Schema } from "mongoose"

const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  // User SCHEMA
  const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    displayName: {type: String, required: true},
    photoURL: {type: String},
    bookmarks: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Component', 
        default: []
      }
    ]
  })

  // Component SCHEMA
  const ComponentSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    type: Number,
    name: String,
    stylesMap: Object,
    likes: Number
  }, {
    timestamps: { createdAt: true, updatedAt: false }
  })

  // Component MODEL
  const Component = mongoose.models.Component || mongoose.model("Component", ComponentSchema)

  // User Model
  const User = mongoose.models.User || mongoose.model("User", UserSchema)

  return { conn, Component, User }
}