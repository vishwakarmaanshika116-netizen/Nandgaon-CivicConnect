
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Complaint = require("./complaintModel");

const app = express();
const PORT = 5000;


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());

app.use(express.json());


// ============================================================
// MULTER - PHOTO / VIDEO UPLOAD
// ============================================================

// ============================================================
// CLOUDINARY - PHOTO / VIDEO UPLOAD
// ============================================================

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "nandgaon-civicconnect",
        resource_type: "auto"
    }
});

const upload = multer({
    storage: storage
});



// ============================================================
// MONGODB CONNECTION
// ============================================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log(
            "MongoDB Connected Successfully!"
        );

    })

    .catch((error) => {

        console.log(
            "MongoDB Connection Failed!"
        );

        console.log(
            error.message
        );

    });


// ============================================================
// TEST ROUTE
// ============================================================

app.get("/", (req, res) => {

    res.send(
        "Nandgaon CivicConnect Backend is Running!"
    );

});


// ============================================================
// SUBMIT COMPLAINT
// PHOTO + VIDEO SUPPORTED
// ============================================================

app.post(
    "/api/complaints",

    upload.fields([
        {
            name: "photo",
            maxCount: 1
        },
        {
            name: "video",
            maxCount: 1
        }
    ]),

    async (req, res) => {

        try {

            const {
                name,
                phone,
                email,
                address,
                ward,
                category,
                description,
                location
            } = req.body;


            // =================================================
            // GENERATE COMPLAINT ID
            // =================================================

            const complaintId =
                "NCC-" +
                new Date().getFullYear() +
                "-" +
                Math.floor(
                    1000 + Math.random() * 9000
                );


            // =================================================
            // GET UPLOADED FILES
            // =================================================

            let photoPath = "";
let videoPath = "";

if (
    req.files &&
    req.files.photo &&
    req.files.photo.length > 0
) {
    photoPath = req.files.photo[0].path;
}

if (
    req.files &&
    req.files.video &&
    req.files.video.length > 0
) {
    videoPath = req.files.video[0].path;
}

            // =================================================
            // CREATE COMPLAINT
            // =================================================

            const complaint =
                new Complaint({

                    complaintId: complaintId,

                    name: name,

                    phone: phone,

                    email: email || "",

                    address: address,

                    ward: ward,

                    category: category,

                    description: description,

                    location: location,

                    photo: photoPath,

                    video: videoPath,

                    status: "Submitted"

                });


            // =================================================
            // SAVE TO MONGODB
            // =================================================

            await complaint.save();


            // =================================================
            // RESPONSE
            // =================================================

            res.status(201).json({

                success: true,

                message:
                    "Complaint submitted successfully!",

                complaintId:
                    complaintId

            });


        } catch (error) {

            console.error(
                "Complaint submission error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Failed to submit complaint"

            });

        }

    }
);


// ============================================================
// TRACK COMPLAINT
// ============================================================

app.get(
    "/api/complaints/:complaintId",
    async (req, res) => {

        try {

            const complaint =
                await Complaint.findOne({

                    complaintId:
                        req.params.complaintId

                });


            if (!complaint) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Complaint not found"

                });

            }


            res.json({

                success: true,

                complaint:
                    complaint

            });


        } catch (error) {

            console.error(
                "Tracking error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to fetch complaint"

            });

        }

    }
);


// ============================================================
// ADMIN - GET ALL COMPLAINTS
// ============================================================

app.get(
    "/api/admin/complaints",
    async (req, res) => {

        try {

            const complaints =
                await Complaint.find()
                    .sort({
                        createdAt: -1
                    });


            res.json({

                success: true,

                complaints:
                    complaints

            });


        } catch (error) {

            console.error(
                "Fetching complaints error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to fetch complaints"

            });

        }

    }
);


// ============================================================
// ADMIN - UPDATE COMPLAINT STATUS
// ============================================================

app.put(
    "/api/admin/complaints/:complaintId/status",
    async (req, res) => {

        try {

            const {
                status
            } = req.body;


            const allowedStatuses = [

                "Submitted",

                "Verified",

                "In Progress",

                "Resolved",

                "Rejected"

            ];


            if (
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid complaint status"

                });

            }


            const complaint =
                await Complaint.findOneAndUpdate(

                    {
                        complaintId:
                            req.params.complaintId
                    },

                    {
                        status:
                            status
                    },

                    {
                        new: true,

                        runValidators: true
                    }

                );


            if (!complaint) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Complaint not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Complaint status updated successfully",

                complaint:
                    complaint

            });


        } catch (error) {

            console.error(
                "Status update error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to update complaint status"

            });

        }

    }
);

// ============================================================
// ADMIN LOGIN
// ============================================================

app.post("/api/admin/login", (req, res) => {

    try {

        const { email, password } = req.body;


        // ADMIN CREDENTIALS
        const ADMIN_EMAIL = "admin@nandgaon.com";
        const ADMIN_PASSWORD = "Nandgaon@123";


        // CHECK LOGIN DETAILS
        if (
            email === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {

            return res.json({

                success: true,

                message: "Admin login successful"

            });

        }


        // INVALID LOGIN
        res.status(401).json({

            success: false,

            message: "Invalid email/username or password"

        });


    } catch (error) {

        console.error(
            "Admin login error:",
            error
        );


        res.status(500).json({

            success: false,

            message: "Unable to process admin login"

        });

    }

});


// ============================================================
// START SERVER
// ============================================================

app.listen(
    PORT,
    () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

    }
);
