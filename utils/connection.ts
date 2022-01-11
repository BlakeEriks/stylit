import mongoose, { Model, Schema } from "mongoose"

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
    creator_id: {type: Schema.Types.ObjectId, ref: 'User'},
    type: Number,
    styles: Array,
    likes: {count: Number, users: [{type:Schema.Types.ObjectId, ref: 'User'}]},
  })

  // Component MODEL
  const Component = mongoose.models.Component || mongoose.model("Component", ComponentSchema)

  // User Model
  const User = mongoose.models.User || mongoose.model("User", UserSchema)

  return { conn, Component, User }
}