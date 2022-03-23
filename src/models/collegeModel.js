const mongoose = require('mongoose')
//require('mongoose-type-url');

const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        lowercase:true,
        unique: true,
        required: 'Name is required'
    },
    fullName: {
        type: String,
        unique: true,
        required: 'full Name is required'
    },
    logoLink: {
        type: String,
        required: 'logoLink is required',
        // url: {
        //     work: mongoose.SchemaTypes.Url,
        //     profile: mongoose.SchemaTypes.Url
        // }
        
    },
    isDeleted: { 
        type: Boolean, 
        default: false }

}, { timestamps: true })

    module.exports = mongoose.model('College', collegeSchema)
    
   