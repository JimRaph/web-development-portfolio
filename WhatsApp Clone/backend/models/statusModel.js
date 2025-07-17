import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,  // For text statuses
        trim: true
    },
    media: {
        type: String, // Store image/video URLs
    },
    caption: {
        type: String,  // Optional caption for media
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['image', 'video', 'text']
    },
    viewedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    viewsCount: {
        type: Number,
        default: 0  // Increment when a user views the status
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // Auto-delete after 24 hours
        index: { expires: '24h' } // TTL Index for auto-deletion
    }
}, { timestamps: true });

// Export the model
export const Status = mongoose.model('Status', statusSchema);
