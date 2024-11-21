import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res
      .status(201)
      .json({ model: event, message: "Événement créé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
