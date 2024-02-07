const mongoose = require('mongoose');
const { Schema } = mongoose;

const SparesCollectionSchema = new Schema({
  pumpTypes: [
    {
      pumpType: {
        type: String,
      },
      pumpBB: [
        {
          BBSize: {
            type: String,
          },
          pumpSize: {
            type: Array,
            default: []
          }
        }
      ]
    }
  ],
  spareTypes: {
    type: Array,
    default: [],
  },
  moc: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model("sparescollection", SparesCollectionSchema);

