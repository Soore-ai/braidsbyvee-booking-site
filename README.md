# 💇‍♀️ Braids by Vee — AWS Hair Appointment Booking App

[![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)]()
[![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)]()
[![Lambda](https://img.shields.io/badge/AWS%20Lambda-F58536?style=for-the-badge&logo=awslambda&logoColor=white)]()
[![CloudFront](https://img.shields.io/badge/CloudFront-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)]()
[![SES](https://img.shields.io/badge/Amazon%20SES-DD344C?style=for-the-badge&logo=amazonaws&logoColor=white)]()
[![SNS](https://img.shields.io/badge/Amazon%20SNS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)]()
[![Cognito](https://img.shields.io/badge/Amazon%20Cognito-7D4F9E?style=for-the-badge&logo=amazonaws&logoColor=white)]()
[![S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)]()
[![CloudWatch](https://img.shields.io/badge/CloudWatch-FF4F8B?style=for-the-badge&logo=amazonaws&logoColor=white)]()

---

**Live Site:** [https://braidsbyvee.com](https://braidsbyvee.com)

A full **AWS Serverless Booking Web Application** built for a real hair styling business, designed to let clients browse styles, book appointments, and receive automated confirmation emails — all with a non-technical admin interface for the stylist.

---

## 🧭 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Frontend Implementation](#frontend-implementation)
- [Backend Implementation](#backend-implementation)
- [Email & Notification System](#email--notification-system)
- [Authentication & Admin Access](#authentication--admin-access)
- [Deployment & Infrastructure](#deployment--infrastructure)
- [Monitoring & Cost Optimization](#monitoring--cost-optimization)
- [Results](#results)
- [Lessons Learned](#lessons-learned)
- [Next Steps](#next-steps)
- [Author](#author)

---

## 🧱 Overview
**Purpose:**  
To build a modern, easy-to-use **appointment booking system** for a hairstylist serving the Greater Toronto Area.  

**Goal:**  
Automate appointment scheduling, gallery management, and email notifications using **AWS Serverless technologies** — with zero server management required.

**Problem Solved:**  
Small beauty businesses often rely on DMs or manual texts for scheduling. This project eliminates that bottleneck through automation and a professional web interface.

---

## ⚙️ Architecture
**High-Level Overview:**

```plaintext
React Frontend (S3 + CloudFront)
        ↓
   API Gateway (REST)
        ↓
   AWS Lambda (Node.js)
        ↓
   DynamoDB (Bookings)
        ↓
   Amazon SES (Email)
        ↓
   Amazon SNS + CloudWatch (Notifications)
````

**Additional Services:**

* **Amazon Cognito:** Secure admin login for image uploads
* **Amazon Route 53:** Custom domain management
* **AWS Certificate Manager (ACM):** SSL/TLS for HTTPS
* **AWS IAM:** Role-based permissions for Lambda, S3, SES, etc.

---

## 🧰 Tech Stack

| Layer              | Tools / Services             |
| ------------------ | ---------------------------- |
| **Frontend**       | React, Tailwind CSS, AWS SDK |
| **Backend**        | Node.js (Lambda Functions)   |
| **Database**       | DynamoDB                     |
| **Email**          | AWS SES                      |
| **Authentication** | Amazon Cognito               |
| **Hosting**        | Amazon S3 + CloudFront       |
| **Domain**         | Route 53                     |
| **Monitoring**     | CloudWatch + SNS             |

---

## 💻 Frontend Implementation

**Main Pages:**

* `HomePage.jsx` — hero section, about, gallery, CTA button
* `Gallery.jsx` — fetches images from S3 (`public/gallery/`)
* `Book.jsx` — booking form posting to API Gateway
* `UploadMedia.jsx` — admin-only image upload (Cognito auth)

**Hosting Process:**

1. `npm run build` to generate static files.
2. Upload `/build` to an S3 bucket.
3. CloudFront serves global HTTPS distribution.

**Key Fix:**
Resolved `InvalidStorageOperationInput` error by refactoring S3 list API to use **only the `path` property** for gallery object listing.

---

## 🔙 Backend Implementation

**Workflow**

1. **API Gateway** receives booking requests.
2. **Lambda** parses the request body, validates data, and stores it in DynamoDB.
3. **SES** sends a confirmation email to the client and admin.

**Sample Lambda Function:**

```js
exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  await saveToDynamoDB(body);
  await sendEmail(body.email);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Booking successfully created" })
  };
};
```

**DynamoDB Table Structure**

| Field     | Type        | Description                |
| --------- | ----------- | -------------------------- |
| bookingId | String (PK) | Unique ID for each booking |
| name      | String      | Client name                |
| service   | String      | Selected service           |
| date      | String      | Appointment date           |
| time      | String      | Appointment time           |
| email     | String      | Client email address       |

---

## 📧 Email & Notification System

**Amazon SES (Simple Email Service):**

* Triggered automatically by Lambda upon successful booking.
* Sends confirmation to client + copy to admin.
* Domain verified in Route 53 via TXT record.
* Currently progressing out of **SES Sandbox** for production use.

**Notifications (SNS + CloudWatch):**

* CloudWatch monitors Lambda logs and metrics.
* SNS sends real-time alerts to email/SMS on failures or new bookings.

**Future Additions:**

* Scheduled reminder emails via CloudWatch Events → Lambda → SES.

---

## 🔐 Authentication & Admin Access

**Amazon Cognito** used for:

* Securing `/upload` route.
* Handling login/signup flow for the stylist (admin).
* Restricting S3 access to authenticated users for media uploads.

**Admin Features:**

* Upload photos/videos to S3 (`/gallery/` prefix).
* Manage gallery content directly through frontend UI.

---

## ☁️ Deployment & Infrastructure

**Frontend Deployment**

```bash
npm run build
aws s3 sync build/ s3://braidsbyvee-frontend --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

**Backend Deployment**

* Lambda functions deployed via AWS Console or SAM/CloudFormation.
* Environment variables configured for SES and DynamoDB integration.

**Cleanup**
Removed unused Amplify resources after migration to **S3 + CloudFront** hosting for better performance and control.

---

## 📊 Monitoring & Cost Optimization

* **CloudWatch Logs:** Monitors Lambda invocations and failures.
* **SNS Alerts:** Notifies via email/SMS when issues occur.
* **AWS Budgets:** Tracks monthly spending (under $2/month).
* **S3 Lifecycle Rules:** Automatically cleans up old versions and logs.

---

## 🏁 Results

✅ Fully functional live booking app at [braidsbyvee.com](https://braidsbyvee.com)
✅ Automated email confirmations for every booking
✅ Secure admin upload dashboard
✅ Fast global delivery via CloudFront CDN
✅ Zero downtime, zero server maintenance
✅ Real-world proof of AWS Solutions Architect skills

---

## 🧩 Lessons Learned

* Always separate static hosting (S3) from backend APIs (API Gateway/Lambda).
* SES sandbox removal requires domain verification before production use.
* CloudFront drastically improves speed and caching.
* Real client use cases push you to build production-grade reliability.

---

## 🚀 Next Steps

* Add admin dashboard to view bookings (React + DynamoDB query).
* Integrate Stripe for online deposits/payments.
* Implement automated appointment reminder emails.
* Publish this project as a public AWS case study.

---

## 👤 Author

**Built by:** [ED Eguaikhide](https://www.linkedin.com/in/ed-eguaikhide)
**Role:** AWS Certified Solutions Architect — Associate | Cloud Engineer
**Portfolio:** [https://braidsbyvee.com](https://braidsbyvee.com)

---

## 📸 Screenshots

![Architecture Diagram](path/to/architecture-diagram.png.png)
![Home Page](path/to/homepage-screenshot.png.png)
![Booking Page](path/to/booking-page-screenshot.png.png)

```
without all the details.
```
