import mongoose, {InferSchemaType} from 'mongoose';

const PrescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  providerId: { type: String, required: true },
  medication: { type: String, required: true },
  dosage: { type: String, required: true },
  instructions: { type: String },
  dateIssued: { type: Date, default: Date.now }
});

export type PrescriptionType = InferSchemaType<typeof PrescriptionSchema>;
const Prescription = mongoose.models.Prescription || mongoose.model<PrescriptionType>('Prescription', PrescriptionSchema);

export default Prescription;
