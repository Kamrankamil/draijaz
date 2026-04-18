# Email Forms Configuration Guide

This guide helps you set up functioning email forms for appointment booking and contact messages.

## Methods for Email Integration

### Method 1: Formspree (Recommended - Easiest)

#### Advantages:
- ✅ No coding required
- ✅ Free tier available
- ✅ Spam protection included
- ✅ Form files are stored
- ✅ Email notifications

#### Steps:

1. **Visit Formspree:**
   - Go to https://formspree.io
   - Click "Create New Form"

2. **Create Two Forms:**
   - One for Appointments
   - One for Contact Messages

3. **Get Form Endpoints:**
   After creating each form, you'll get an endpoint like:
   - `https://formspree.io/f/xyzabc123`

4. **Update index.html:**

   For Appointment Form (find `<form id="appointmentForm"`):
   ```html
   <form action="https://formspree.io/f/YOUR_APPOINTMENT_FORM_ID" method="POST">
       <input type="hidden" name="email" value="your-email@example.com">
       <input type="hidden" name="website" value="Dr. Aijaz Ahmed Appointment">
       <!-- rest of form -->
   </form>
   ```

   For Contact Form (find `<form id="contactForm"`):
   ```html
   <form action="https://formspree.io/f/YOUR_CONTACT_FORM_ID" method="POST">
       <!-- rest of form -->
   </form>
   ```

5. **Remove Custom JavaScript Handling:**
   In `assets/js/main.js`, comment out or remove the form submission handlers that show alerts.

---

### Method 2: EmailJS (More Advanced)

#### Advantages:
- ✅ Direct email sending
- ✅ No backend required
- ✅ Better customization
- ✅ Template support
- ✅ Free tier available

#### Steps:

1. **Visit EmailJS:**
   - Go to https://www.emailjs.com
   - Sign up for free account

2. **Get Credentials:**
   - Service ID: `service_xxxxx`
   - Template ID: `template_xxxxx`
   - Public Key: `xxxxxxxxxxxxx`

3. **Add EmailJS Script:**
   In `index.html`, add before closing `</head>`:
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
   ```

4. **Create Email Template:**
   - Go to EmailJS dashboard → Email Templates
   - Create template with variables: `{name}`, `{phone}`, `{message}`

5. **Update JavaScript:**
   In `assets/js/main.js`, add this:
   ```javascript
   // Initialize EmailJS
   (function() {
       emailjs.init("YOUR_PUBLIC_KEY");
   })();

   // Appointment Form Handler
   const appointmentForm = document.getElementById('appointmentForm');
   if (appointmentForm) {
       appointmentForm.addEventListener('submit', (e) => {
           e.preventDefault();
           
           emailjs.send("service_xxxxx", "template_xxxxx", {
               name: document.getElementById('name').value,
               phone: document.getElementById('phone').value,
               clinic: document.getElementById('clinic').value,
               date: document.getElementById('date').value,
               message: document.getElementById('message').value,
               to_email: "doctor@example.com"
           }).then((response) => {
               alert('Appointment request sent successfully!');
               appointmentForm.reset();
           });
       });
   }
   ```

---

### Method 3: PHP Backend

#### For servers with PHP support

#### Simple PHP Handler:

1. **Create `send-email.php`:**
   ```php
   <?php
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
       $name = htmlspecialchars($_POST['name'] ?? '');
       $email = htmlspecialchars($_POST['email'] ?? '');
       $message = htmlspecialchars($_POST['message'] ?? '');
       $clinic = htmlspecialchars($_POST['clinic'] ?? '');
       $phone = htmlspecialchars($_POST['phone'] ?? '');
       
       // Your email
       $to = "doctor@example.com";
       
       $subject = "New Appointment Request from " . $name;
       
       $body = "
       Name: $name
       Phone: $phone
       Email: $email
       Clinic: $clinic
       Message: $message
       ";
       
       $headers = "From: " . $email;
       
       if (mail($to, $subject, $body, $headers)) {
           echo "success";
       } else {
           echo "error";
       }
   }
   ?>
   ```

2. **Update HTML Form:**
   ```html
   <form action="send-email.php" method="POST">
       <!-- form fields -->
   </form>
   ```

---

### Method 4: Node.js Express Backend

#### For advanced setups

1. **Create `server.js`:**
   ```javascript
   const express = require('express');
   const nodemailer = require('nodemailer');
   const cors = require('cors');

   const app = express();
   app.use(express.json());
   app.use(cors());

   // Configure email service
   const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: 'your-email@gmail.com',
           pass: 'your-app-password'
       }
   });

   // Appointment endpoint
   app.post('/send-appointment', async (req, res) => {
       try {
           const { name, phone, email, clinic, date, message } = req.body;
           
           const mailOptions = {
               from: 'doctor@example.com',
               to: email,
               subject: 'Appointment Confirmation Request',
               html: `
                   <h2>Appointment Request Received</h2>
                   <p>Dear ${name},</p>
                   <p>Your appointment request has been received.</p>
                   <p><strong>Details:</strong></p>
                   <ul>
                       <li>Clinic: ${clinic}</li>
                       <li>Date: ${date}</li>
                       <li>Phone: ${phone}</li>
                   </ul>
                   <p>We will call you shortly to confirm.</p>
               `
           };
           
           await transporter.sendMail(mailOptions);
           res.json({ success: true });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   });

   app.listen(3000, () => console.log('Server running on port 3000'));
   ```

2. **Update JavaScript to use API:**
   ```javascript
   const appointmentForm = document.getElementById('appointmentForm');
   appointmentForm.addEventListener('submit', async (e) => {
       e.preventDefault();
       
       const response = await fetch('/send-appointment', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
               name: document.getElementById('name').value,
               phone: document.getElementById('phone').value,
               // ... other fields
           })
       });
       
       if (response.ok) {
           alert('Appointment request sent!');
           appointmentForm.reset();
       }
   });
   ```

---

## Recommended Configuration for Dr. Aijaz Ahmed

### Simple Setup (Recommended for beginners):
1. Use **Formspree**
2. No coding required
3. Just update form action attributes
4. Emails go directly to your inbox

### Professional Setup:
1. Use **EmailJS**
2. Better control and branding
3. Professional email templates
4. Easy integration

### Enterprise Setup:
1. Use **Node.js with Express**
2. Full backend control
3. Database integration possible
4. Advanced analytics

---

## Gmail SMTP Configuration

If you have Gmail and want to use it:

1. **Enable 2-Factor Authentication on Gmail**

2. **Create App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select Mail and Windows Computer
   - Copy the 16-character password

3. **Use in Configuration:**
   ```
   Email: your-email@gmail.com
   Password: (16-character app password)
   SMTP Server: smtp.gmail.com
   Port: 587
   ```

---

## Privacy & Security Notes

- ✅ Always use HTTPS
- ✅ Don't hardcode sensitive credentials
- ✅ Use environment variables for secrets
- ✅ Validate all form inputs
- ✅ Sanitize user data
- ✅ Follow HIPAA guidelines for medical information
- ✅ Add reCAPTCHA to prevent spam

---

### Adding reCAPTCHA

```html
<!-- Add in form -->
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>

<!-- Add script before </head> -->
<script src="https://www.google.com/recaptcha/api.js"></script>
```

---

## Testing Forms Locally

Before deploying, test with:
- **Formspree:** Works immediately after setup
- **EmailJS:** Test using browser console
- **PHP/Node:** Use tools like Postman or curl

```bash
# Test PHP endpoint
curl -X POST http://localhost:8000/send-email.php \
  -d "name=Test&email=test@example.com&message=Test message"

# Test Node.js endpoint
curl -X POST http://localhost:3000/send-appointment \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"123"}' 
```

---

## Support

- **Formspree Support:** https://formspree.io/docs
- **EmailJS Documentation:** https://www.emailjs.com/docs
- **Nodemailer:** https://nodemailer.com
- **SMTP Settings:** https://www.smtptips.com

---

**Choose the method that best fits your needs and technical comfort level.**

