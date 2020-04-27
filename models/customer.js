const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
   name: {
       type :String,
       required: true
   },
   role : {
       type : String,
       required:true
   },
   entryDate: {
       type: Date,
       required: true,
       default: Date
   }

})

module.exports = mongoose.model('Customer', customerSchema)