import mongoose, { connect } from 'mongoose';

function connectTodb() {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
    console.log('Not connected to the DB',err);
    });
};
export default connectTodb;