const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  mood: {
    type: String,
    enum: ['laughing','happy', 'sad', 'anxious', 'calm', 'angry', 'neutral'],
    default: 'neutral'
  },
  isPrivate: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create text index for search functionality
journalSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;