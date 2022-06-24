import pkg from "mongoose";

const { Schema, model } = pkg;

const statisticSchema = new Schema({
  User: {
    type: String,
    required: true,
  },
  PrizesWon: {
    type: Number,
    required: true,
  },
  MessagesWritten: {
    type: Number,
    required: true,
  },
  MessagesDeleted: {
    type: Number,
    required: true,
  },
  WonTesla: {
    type: Number,
    required: true,
  },
});

export default model("Statistic", statisticSchema);
