const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const MONGO_URI =
    'mongodb+srv://lenn:1234@cluster0.dbox4.mongodb.net/hair_care?retryWrites=true&w=majority';

//Connect to DB
mongoose
    .connect(MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema(
    {
        acc: String,
        pass: String,
        email: String,
        image: String,
        cloudinary_id: String,
    },
    {timestamps: true}
);

userSchema.plugin(mongooseDelete, {overrideMethods: 'all', deleteAt: true});

module.exports = mongoose.model('User', userSchema);
