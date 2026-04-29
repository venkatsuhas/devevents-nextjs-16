import { Schema, model, models, Document } from 'mongoose';

interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      required: [true, 'Mode is required'],
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Agenda must be a non-empty array',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Tags must be a non-empty array',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Generate URL-friendly slug from title before saving
eventSchema.pre<IEvent>('save', async function () {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.isModified('date')) {
    const dateObj = new Date(this.date);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date format');
    }
    this.date = dateObj.toISOString().split('T')[0];
  }

  // Normalize time to HH:MM format
  if (this.isModified('time')) {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(this.time)) {
      throw new Error('Invalid time format. Use HH:MM');
    }
  }

  // Validate all required fields are non-empty
  const requiredFields = [
    'title',
    'description',
    'overview',
    'image',
    'venue',
    'location',
    'date',
    'time',
    'mode',
    'audience',
    'organizer',
  ];
  for (const field of requiredFields) {
    if (!this[field as keyof IEvent] || this[field as keyof IEvent] === '') {
      throw new Error(`${field} cannot be empty`);
    }
  }
});

// Index on slug for fast lookups
eventSchema.index({ slug: 1 });

const Event = models.Event || model<IEvent>('Event', eventSchema);

export default Event;
export type { IEvent };
