import * as mongoose from 'mongoose';

const ContactSchema: mongoose.Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'Enter a first name'
    },
    lastname: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

export const Contact: mongoose.model = mongoose.model('Contact', ContactSchema);