import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x6291a71f6e1a57cb1fa136ae1c298e017df3ae67efb6bbab7cb59316fdf9a1a09d1fa8f6075825f982ba80b3653bf330cdfb147ab3ed56bdc8bdb4eb27de4955/PubGoods",
});

const userCollection = db.collection("User");
const taskCollection = db.collection("Task");

async function createTask (id, title, description, favourite, completed) {
  return taskCollection.create([
    id ,
    title,
    description,
    favourite,
    completed
  ]);
}

async function getTasks () {
  return taskCollection.get()
}

async function getTask (recordId) {
  return taskCollection.record(recordId).get();
}

async function getUsers () {
  return userCollection.get()
}

async function getUser (recordId) {
  return userCollection.record(recordId).get();
}

export {
  db,
  getUsers,
  getUser,
  getTasks,
  getTask,
  createTask
}