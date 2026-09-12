const mongoose = require('mongoose');

const slotSchema= mongoose.Schema({
  dottore:{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Dottore',
   required: true   
  },
  dataOra:{
    type: Date,
    required: true
  },
  disponibile:{
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model('Slot',slotSchema);