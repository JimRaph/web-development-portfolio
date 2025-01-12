import mongoose from 'mongoose';

const DbConnect = (connection_string) => {
    return mongoose.connect(connection_string);
}

export default DbConnect;