// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   eventTitle: { type: String, required: true },
//   date: { type: String, required: true },
//   time: { type: String },
//   location: { type: String },
//   link: { type: String },
//   predictedDomain: { type: String }
// });

// const Event = mongoose.model('Event', eventSchema);

const eventsDataSchema = new mongoose.Schema({
  ques: { type: String, required: true },
  events: [
      {
          name: { type: String, required: true },
          date: { type: String, required: true },
          link: { type: String, required: true },
          location: { type: String , required: true}
      }
  ]
});

const EventsData = mongoose.model('eventsdata', eventsDataSchema);
