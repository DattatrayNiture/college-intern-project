const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Inter name is required",
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // uppercase:false,
        //validate: [ validator.isEmail, 'invalid email' ]
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false //The validator dosn't play well with mongoose to get rid of the warning set isAsync to false


        }
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: [10, "plese provide valid 10 digit number"],
        maxlength: [10, "plese provide valid 10 digit number"]

    },
    collegeId: {
        type: ObjectId,
        ref: 'College',
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })






internSchema.path('mobile').validate(function validatePhone() {
    return (this.mobile > 999999999 || this.mobile < 10000000000);
});















module.exports = mongoose.model('Intern', internSchema)