import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    data: string;
    date: Date;
}

const paymentSchema: Schema = new Schema({
    data: { type: String, required: true, unique: true },
    date: { type: String, default: new Date() },
});

export default mongoose.model<IPayment>('Payment', paymentSchema);
