# Braids by Vee — Booking Site (Frontend)

**Live site:** https://braidsbyvee.com
  
This is the React frontend for the Braids by Vee hair-booking app. It renders the gallery/home page and a `/book` page that submits appointments to an AWS serverless backend.

---

## What it does
- Home page with gallery and CTA  
- **/book** page that POSTs booking data to API Gateway → Lambda → DynamoDB  
- Hosted on **S3 + CloudFront** (fast, global, inexpensive)

## Stack
- **Frontend:** React (CRA), vanilla CSS  
- **Hosting/CDN:** Amazon S3 + CloudFront  
- **Backend (separate repo):** API Gateway, Lambda (Node.js), DynamoDB, CloudFormation/SAM  
  - Backend repo: https://github.com/Soore-ai/project-template-aws

## Environment
Create a `.env` file from the example:
cp .env.example .env


Copy code

Set your API endpoint (from API Gateway):
REACT_APP_API_URL=https://3jfk8oqf81.execute-api.us-east-1.amazonaws.com/Prod/book


Copy code

> React only reads `REACT_APP_*` variables at **build time**.

## Run locally
npm install
npm start

open http://localhost:3000/book
shell
Copy code

## Build & deploy (S3/CloudFront)
npm run build

sync to your bucket/prefix
aws s3 sync build s3://<your-site-bucket>/ --delete

then invalidate your distribution
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"


Copy code

## Screenshots
| View | Image |
|---|---|
| Home | ![Home](docs/images/site-home-current.png) |
| Booking Page | ![Book](docs/images/site-book-live.png) |
| Booking Success | ![Success](docs/images/site-book-success.png) |
| DynamoDB Item | ![DDB](docs/images/ddb-items-after-site-book.png) |

## Folder structure (frontend)
.
├─ public/
├─ src/
│ ├─ pages/
│ │ └─ Book.jsx
│ ├─ App.jsx
│ └─ index.js
├─ docs/
│ └─ images/ # screenshots used in this README
├─ .env.example
└─ package.json

Copy code

## Notes
- Do **not** commit your real `.env`; use `.env.example`.  
- For SPA routing issues on CloudFront, map 403/404 to `/index.html`.

---

**Author:** ED EGUAIKHIDE (Braids by Vee)