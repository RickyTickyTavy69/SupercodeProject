import pkg from "mongoose";
const { model, Schema } = pkg;

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fontSize: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
});

export default model("Messages", messageSchema);
