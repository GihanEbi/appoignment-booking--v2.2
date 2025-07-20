import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  ID: string;
  userId: string;
  customerName: string;

  //   created user details
  userCreated?: string;
  userModified?: string;
}
const appointmentSchema = new Schema<IAppointment>(
  {
    ID: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    customerName: { type: String, required: true },

    //   created user details
    userCreated: { type: String, required: false },
    userModified: { type: String, required: false },
  },
  { timestamps: true }
);
export default mongoose.models.appointments ||
  mongoose.model<IAppointment>('appointments', appointmentSchema);