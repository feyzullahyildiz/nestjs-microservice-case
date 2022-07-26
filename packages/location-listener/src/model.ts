// import mongoose from 'mongoose';
import mongoose, { Schema } from "mongoose";


const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const locationSchema = new Schema({
  // courierId: mongoose.Types.ObjectId, // String is shorthand for {type: String}
  date: { type: Date, default: Date.now },
  location: {
    type: pointSchema,
    required: true,
    index: "2dsphere",
  },
});
