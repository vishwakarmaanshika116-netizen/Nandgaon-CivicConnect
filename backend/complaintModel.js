const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        complaintId: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        // =========================
        // PERSONAL DETAILS
        // =========================

        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            trim: true,
            default: ""
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        ward: {
            type: String,
            required: true,
            trim: true
        },

        // =========================
        // COMPLAINT DETAILS
        // =========================

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        // =========================
        // SUPPORTING EVIDENCE
        // =========================

        photo: {
            type: String,
            default: ""
        },

        video: {
            type: String,
            default: ""
        },

        // =========================
        // COMPLAINT STATUS
        // =========================

        status: {
            type: String,
            enum: [
                "Submitted",
                "Verified",
                "In Progress",
                "Resolved",
                "Rejected"
            ],
            default: "Submitted"
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);