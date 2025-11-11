# 💇‍♀️ Braids by Vee — AWS Hair Appointment Booking App

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
