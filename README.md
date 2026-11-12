# Jayesh Parihar — Professional Portfolio Website

Welcome to your personal portfolio website! This website has been built from scratch to showcase your unique positioning at the intersection of **B2B SaaS Sales, Business Development, and Product Management**.

---

## 🌟 What Has Been Built For You

Your website includes:
1. **Modern Header & Sticky Navigation**: Quick links to all sections, an "Open to Opportunities" status badge, and mobile-friendly menu.
2. **High-Impact Hero Section**: Your name, your core positioning, your central message, dual primary action buttons (*Explore My Work* & *Let's Connect*), direct resume download buttons, and social links.
3. **Verified Achievements & Metrics**: Animated statistics showcasing your INR 2.5 Cr (~$295K) in 4 months / INR 60 lakh deal marketplace team contribution, 50+ onboarded system integrators, 17 closed enterprise deals ($58K revenue), and outbound performance (+35% qualified meetings). Transparent badges distinguish founding team efforts from individual execution.
4. **The Sales-to-Product Bridge ("About Me")**: Tells your authentic career transition story in a natural, confident first-person voice without generic AI buzzwords, accompanied by a visual 4-step flywheel.
5. **"Driving Business Growth Through Sales"**: An interactive timeline of your commercial experience across the B2B Marketplace founding team, Mobility Foresights, 99acres (Info Edge), and BYJU'S.
6. **"Exploring Product Problems. Building Product Solutions"**: Highlights your Airtribe AI-First PM program and 4 in-depth case studies:
   - **Fireflies.ai — Commitment Cards (Capstone)**: Full deep-dive modal, interactive prototype link, video walkthrough link, and downloadable PRD.
   - **VitaFit — Retention Strategy**: Retention curve analysis and streak recovery.
   - **Zomato — Funnel Analysis**: 7-stage funnel deconstruction and North Star metric tree.
   - **QuickBite — Scalability Architecture**: System design and modular scaling.
7. **Interactive Skills & Tools Matrix**: Categorized tags for Sales & BD, Product Management, GTM Tools, Product Tools, and AI tools with filter buttons.
8. **Education & Certifications**: Parul University BBA and your professional credentials.
9. **Dedicated Resume Center**: Download buttons for both your **Sales & BD Resume** and your **Associate Product Manager Resume** (real PDF files included).
10. **Interactive Contact Section**: Direct contact cards (Email with 1-click copy, LinkedIn, Phone, CST hours availability) and a validated contact form.

---

## 🚀 How to Preview Your Website on Your Computer

You do not need any coding knowledge or extra software to view your website!

### Method 1: The Simplest Way (Double-Click)
1. Open your computer's file manager (Files).
2. Go to: `/home/jayesh/.gemini/antigravity/scratch/jayesh-parihar-portfolio/`
3. Double-click the file named **`index.html`**.
4. It will immediately open in Google Chrome or your default web browser!

### Method 2: Running a Local Web Server
If you prefer running a local server:
1. Open a terminal.
2. Type:
   ```bash
   cd /home/jayesh/.gemini/antigravity/scratch/jayesh-parihar-portfolio
   python3 -m http.server 8000
   ```
3. Open your browser and visit: `http://localhost:8000`

---

## 📁 Project Folder Structure

Everything is clean, organized, and self-contained:

```text
jayesh-parihar-portfolio/
│
├── index.html                   <-- Your complete website (content, text, and structure)
├── README.md                    <-- This simple guide
│
└── assets/
    ├── css/
    │   └── styles.css           <-- Design, colors, spacing, and mobile responsiveness
    ├── js/
    │   └── main.js              <-- Interactive features (counters, case study modals, contact form)
    └── resumes/
        ├── Jayesh_Parihar_Sales_Resume.pdf    <-- Your real B2B Sales resume
        └── Jayesh_Parihar_APM_Resume.pdf      <-- Your real APM resume
```

---

## ✏️ How to Make Changes to Text or Links

All text and links are inside **`index.html`**. You can open it with any simple text editor (like Text Editor, VS Code, or Notepad):

- **To change a phone number or email:** Search for `pariharjayesh1092@gmail.com` or `+91 93270 56201` and replace it with your new details.
- **To update a link:** Search for `href="..."` and paste your updated URL.
- **To edit a bullet point:** Search for the company name (e.g. `Mobility Foresights`) and adjust the text between the `<span>` tags.

---

## 📄 How to Update Your Resume Files

Your website comes pre-loaded with your actual uploaded resume files in the `assets/resumes/` folder!

When you update your resume in the future:
1. Export your new resume as a PDF.
2. Rename it to match the existing file:
   - For Sales: `Jayesh_Parihar_Sales_Resume.pdf`
   - For APM: `Jayesh_Parihar_APM_Resume.pdf`
3. Paste it into the `assets/resumes/` folder, replacing the old file.
4. That's it! The download buttons on your website will automatically provide your newest PDF.

---

## 🌐 How to Publish Your Website Online (100% Free)

You do **not** need to pay for hosting, monthly fees, or complex servers. You have two beginner-friendly, free options:

### Option A: Netlify Drop (Easiest — Takes 60 Seconds)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop your entire `jayesh-parihar-portfolio` folder directly into the browser window.
3. Netlify will instantly launch your live website and give you a free, fast URL (e.g., `jayesh-parihar.netlify.app`).
4. (Optional) You can connect your own custom domain anytime.

### Option B: GitHub Pages (Matches your resume link: `jayeshpariharr.github.io/pm-portfolio`)
1. Create a free account at [github.com](https://github.com) if you haven't already.
2. Create a new repository named `pm-portfolio`.
3. Upload the files from this folder (`index.html` and the `assets` folder) to your repository.
4. In GitHub, go to **Settings** → **Pages** → under **Branch**, choose `main` → click **Save**.
5. Your website will be live at:
   `https://jayeshpariharr.github.io/pm-portfolio/`

---

## 📬 Connecting the Contact Form to Your Email

The website form already validates inputs and prepares a formatted message with a direct `mailto:` fallback.

If you would like form submissions to be sent directly to your inbox automatically:
1. Go to [https://web3forms.com/](https://web3forms.com/) (100% free, no account needed).
2. Enter your email: `pariharjayesh1092@gmail.com` and get your free Access Key.
3. Open `index.html`, find the `<form id="portfolio-contact-form">` tag, and add your key:
   ```html
   <form id="portfolio-contact-form" action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
4. Now every message submitted through your website will arrive directly in your Gmail inbox!

---

## 🎯 Summary

Your portfolio is fully functional, responsive across mobile, tablet, and desktop, cleanly structured, and ready to share with recruiters, hiring managers, and founders.
