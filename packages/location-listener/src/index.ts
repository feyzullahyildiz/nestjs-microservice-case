import path from "path";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, ".env") });

import amqplib from "amqplib";
import mongoose from "mongoose";
import { locationSchema } from "./model";
import type { RabbitLocationData } from "shared-data";
if (typeof process.env.LOCATION_MONGODB_CONNECTION !== "string") {
  console.log("Please define LOCATION_MONGODB_CONNECTION as env");
  process.exit(1);
}
if (typeof process.env.RABBITMQ_CONNECTION !== "string") {
  console.log("Please define RABBITMQ_CONNECTION as env");
  process.exit(1);
}
const QUEUE_NAME = "location-update";
const start = async () => {
  console.log("STARTED");
  await mongoose.connect(process.env.LOCATION_MONGODB_CONNECTION!);
  console.log("DB CONNECTED");
  const LocationModel = mongoose.model("Location", locationSchema);
  await LocationModel.createCollection();
  console.log("createCollection");

  const conn = await amqplib.connect(process.env.RABBITMQ_CONNECTION!, {
    clientProperties: {
      connection_name: "location_writer",
    },
  });
  console.log("Rabbitmq CONNECTED");
  const ch1 = await conn.createChannel();
  await ch1.assertQueue(QUEUE_NAME);

  // Listener
  ch1.consume(QUEUE_NAME, async (msg: any) => {
    if (!msg) {
      console.log("Consumer cancelled by server");
      return;
    }
    const payload = JSON.parse(msg.content) as {
      pattern: string;
      data: RabbitLocationData;
    };
    const { courierId, date, lon, lat } = payload.data;
    await LocationModel.create({
      courierId,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
      date,
    });
    ch1.ack(msg);
  });
};

start();
