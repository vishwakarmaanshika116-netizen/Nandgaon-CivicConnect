
// ============================================================
// NANDGAON CIVICCONNECT
// Main JavaScript
// ============================================================


// ============================================================
// DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    initializeFAQ();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeActiveNavigation();

});


// ============================================================
// FAQ ACCORDION
// ============================================================

function initializeFAQ() {

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = this.nextElementSibling;
            const icon = this.querySelector("span:last-child");


            faqQuestions.forEach(function (otherQuestion) {

                if (otherQuestion !== question) {

                    const otherAnswer =
                        otherQuestion.nextElementSibling;

                    const otherIcon =
                        otherQuestion.querySelector("span:last-child");


                    if (otherAnswer) {
                        otherAnswer.style.display = "none";
                    }


                    if (otherIcon) {
                        otherIcon.textContent = "+";
                    }

                }

            });


            if (answer.style.display === "block") {

                answer.style.display = "none";

                if (icon) {
                    icon.textContent = "+";
                }

            } else {

                answer.style.display = "block";

                if (icon) {
                    icon.textContent = "−";
                }

            }

        });

    });

}


// ============================================================
// MOBILE MENU
// ============================================================

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navbarLinks =
        document.querySelector(".nav-links");


    if (!menuButton || !navbarLinks) {
        return;
    }


    menuButton.addEventListener("click", function () {

        navbarLinks.classList.toggle("active");

    });


    const links =
        navbarLinks.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navbarLinks.classList.remove("active");

        });

    });

}


// ============================================================
// SCROLL EFFECTS
// ============================================================

function initializeScrollEffects() {

    const navbar =
        document.querySelector(".navbar");


    if (!navbar) {
        return;
    }


    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}


// ============================================================
// ACTIVE NAVIGATION
// ============================================================

function initializeActiveNavigation() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";


    const navLinks =
        document.querySelectorAll(".nav-links a");


    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");


        if (!linkPage) {
            return;
        }


        const cleanLink =
            linkPage.split("#")[0];


        if (
            cleanLink === currentPage ||
            (currentPage === "" && cleanLink === "index.html")
        ) {

            link.classList.add("active");

        }

    });

}


// ============================================================
// SMOOTH SCROLL
// ============================================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (targetId === "#") {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


// ============================================================
// BACK TO TOP BUTTON
// ============================================================

const backToTop =
    document.querySelector(".back-to-top");


if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ============================================================
// CURRENT YEAR
// ============================================================

const yearElement =
    document.querySelector("#currentYear");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// ============================================================
// FORM VALIDATION
// ============================================================

function validateForm(form) {

    if (!form) {
        return false;
    }


    const requiredFields =
        form.querySelectorAll("[required]");


    let isValid = true;


    requiredFields.forEach(function (field) {

        if (!field.value.trim()) {

            field.classList.add("error");

            isValid = false;

        } else {

            field.classList.remove("error");

        }

    });


    if (!isValid) {

        alert(
            "Please fill in all required fields."
        );

    }


    return isValid;

}


// ============================================================
// REMOVE FORM ERROR
// ============================================================

document
    .querySelectorAll("input, textarea, select")
    .forEach(function (field) {

        field.addEventListener("input", function () {

            if (this.value.trim()) {

                this.classList.remove("error");

            }

        });

    });


// ============================================================
// COMPLAINT SUBMISSION
// ============================================================

const complaintForm =
    document.getElementById("complaintForm");


if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!validateForm(complaintForm)) {
                return;
            }


            // =================================================
            // FORM DATA
            // =================================================

            const formData =
                new FormData();


            formData.append(
                "name",
                document
                    .getElementById("name")
                    .value
                    .trim()
            );


            formData.append(
                "phone",
                document
                    .getElementById("mobile")
                    .value
                    .trim()
            );


            formData.append(
                "email",
                document
                    .getElementById("email")
                    .value
                    .trim()
            );


            formData.append(
                "address",
                document
                    .getElementById("address")
                    .value
                    .trim()
            );


            formData.append(
                "ward",
                document
                    .getElementById("ward")
                    .value
                    .trim()
            );


            formData.append(
                "category",
                document
                    .getElementById("category")
                    .value
            );


            formData.append(
                "description",
                document
                    .getElementById("description")
                    .value
                    .trim()
            );


            formData.append(
                "location",
                document
                    .getElementById("location")
                    .value
                    .trim()
            );


            // =================================================
            // PHOTO UPLOAD
            // =================================================

            const photoInput =
                document.getElementById("photo");


            if (
                photoInput &&
                photoInput.files.length > 0
            ) {

                formData.append(
                    "photo",
                    photoInput.files[0]
                );

            }


            // =================================================
            // VIDEO UPLOAD
            // =================================================

            const videoInput =
                document.getElementById("video");


            if (
                videoInput &&
                videoInput.files.length > 0
            ) {

                formData.append(
                    "video",
                    videoInput.files[0]
                );

            }


            // =================================================
            // SEND TO BACKEND
            // =================================================

            try {

                const response =
                    await fetch(
                        "https://nandgaon-civicconnect.onrender.com/api/complaints",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                if (result.success) {

                    alert(
                        "Complaint submitted successfully!\n\n" +
                        "Complaint ID: " +
                        result.complaintId
                    );


                    complaintForm.reset();


                } else {

                    alert(
                        result.message ||
                        "Failed to submit complaint."
                    );

                }


            } catch (error) {

                console.error(
                    "Complaint submission error:",
                    error
                );


                alert(
                    "Unable to connect to the server. " +
                    "Please try again."
                );

            }

        }
    );

}


// ============================================================
// TRACK COMPLAINT
// ============================================================

const trackForm =
    document.getElementById("trackForm");


if (trackForm) {

    trackForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const complaintId =
                document
                    .getElementById("complaintId")
                    .value
                    .trim();


            if (!complaintId) {

                alert(
                    "Please enter your Complaint ID."
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        `https://nandgaon-civicconnect.onrender.com/api/complaints/${encodeURIComponent(complaintId)}`
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    alert(
                        "Complaint not found. Please check your Complaint ID."
                    );


                    const statusBox =
                        document.getElementById(
                            "complaintStatus"
                        );


                    if (statusBox) {
                        statusBox.style.display = "none";
                    }


                    return;

                }


                const complaint =
                    result.complaint;


                const statusBox =
                    document.getElementById(
                        "complaintStatus"
                    );


                if (statusBox) {
                    statusBox.style.display = "block";
                }


                const statusText =
                    document.getElementById(
                        "statusText"
                    );


                if (statusText) {

                    statusText.textContent =
                        "Complaint ID: " +
                        complaint.complaintId;

                }


                const statusBadge =
                    document.querySelector(
                        ".status-badge"
                    );


                if (statusBadge) {

                    statusBadge.textContent =
                        complaint.status;

                }


                const detailItems =
                    document.querySelectorAll(
                        ".detail-item strong"
                    );


                if (detailItems[0]) {

                    detailItems[0].textContent =
                        complaint.category;

                }


                if (detailItems[1]) {

                    detailItems[1].textContent =
                        complaint.ward ||
                        "Not provided";

                }


                if (detailItems[2]) {

                    detailItems[2].textContent =
                        new Date(
                            complaint.updatedAt
                        ).toLocaleString();

                }


            } catch (error) {

                console.error(
                    "Tracking error:",
                    error
                );


                alert(
                    "Unable to connect to the server. Please try again."
                );

            }

        }
    );

}


// ============================================================
// CONSOLE MESSAGE
// ============================================================

console.log(
    "Nandgaon CivicConnect loaded successfully."
);

// ============================================================
// FEEDBACK SUBMISSION
// ============================================================

const feedbackForm =
    document.getElementById("feedbackForm");


if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!validateForm(feedbackForm)) {
                return;
            }


            const selectedRating =
                document.querySelector(
                    'input[name="rating"]:checked'
                );


            if (!selectedRating) {

                alert(
                    "Please select a rating."
                );

                return;

            }


            const feedbackData = {

                name:
                    document
                        .getElementById("feedbackName")
                        .value
                        .trim(),

                email:
                    document
                        .getElementById("feedbackEmail")
                        .value
                        .trim(),

                rating:
                    selectedRating.value,

                feedback:
                    document
                        .getElementById("feedback")
                        .value
                        .trim()

            };


            try {

                const response =
                    await fetch(
                        "https://nandgaon-civicconnect.onrender.com/api/feedback",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    feedbackData
                                )
                        }
                    );


                const result =
                    await response.json();


                if (result.success) {

                    alert(
                        "Feedback submitted successfully!"
                    );


                    feedbackForm.reset();


                } else {

                    alert(
                        result.message ||
                        "Failed to submit feedback."
                    );

                }


            } catch (error) {

                console.error(
                    "Feedback submission error:",
                    error
                );


                alert(
                    "Unable to connect to the server. " +
                    "Please try again."
                );

            }

        }
    );

}