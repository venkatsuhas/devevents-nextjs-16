import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Validate that referenced event exists before saving
bookingSchema.pre<IBooking>('save', async function () {
  try {
    const eventExists = await Event.findById(this.eventId);
    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
  } catch (error) {
    throw new Error(
      `Event validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
});

// Index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

const Booking = models.Booking || model<IBooking>('Booking', bookingSchema);

export default Booking;
export type { IBooking };
