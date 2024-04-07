const firebaseConfig = {
    apiKey: "AIzaSyBAfxQYO6TNJIdqOB6_DRM4e9NUa1NrWJ0",
    authDomain: "voting-gathery.firebaseapp.com",
    databaseURL: "https://voting-gathery-default-rtdb.firebaseio.com",
    projectId: "voting-gathery",
    storageBucket: "voting-gathery.appspot.com",
    messagingSenderId: "236437354667",
    appId: "1:236437354667:web:48c06bee64b290f4b35fee"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to the databas
// Get a reference to the Firebase Realtime Database


// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Create a transporter using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gathery@school173.com.ua',
        pass: 'tgod ptdz ince lpqs',
    },
});

// Retrieve user emails from Firebase
const usersRef = database.ref('users');
usersRef.once('value', (snapshot) => {
    const users = snapshot.val();
    console.log(users)

    if (users) {
        // Iterate through each user and send email
        Object.keys(users).forEach((userId) => {
            const user = users[userId];
            const userEmail = user.mail;

            const mailOptions = {
                subject: "GV173",
                from: 'gathery@school173.com.ua',
                to: userEmail,
                text: 'Вітаємо в системі голосування Gathery\nВаші данні для входу:\n\n\tlogin: rimon\n\tpassword: iis',
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(`Error sending email to ${userEmail}: ${error.message}`);
                } else {
                    console.log(`Email sent to ${userEmail}: ${info.response}`);
                }
            });
        });
    }
});
