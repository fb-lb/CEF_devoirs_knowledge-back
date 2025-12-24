# Knowledge-back - Express Application

This project is the back-end of the Knowledge front angular application available here :  
https://github.com/fb-lb/CEF_devoirs_knowledge-front/

It contains all routes used by the front, it can access to the database and perform actions on it.

---

## Technologies

- IDE : [VSCode](https://code.visualstudio.com/)
- [NodeJs](https://nodejs.org/en/download)

- Express : 5.1.0
- TypeScript : 5.9.2
- EmailJS : [create an account](https://dashboard.emailjs.com/sign-up)
- Stripe : [create an account](https://dashboard.stripe.com/register)
- Vitest : 4.0.14
- XAMP : 3.3.0 [download page](https://www.apachefriends.org/fr/download.html)

---

## Local installation

1. **Download project**

Go [here](https://github.com/fb-lb/CEF_devoirs_knowledge-back).  
Click on green button 'Code' and 'Download ZIP'.  
Extract files.
Open the project in your IDE.

2. **Create database in PHPMyAdmin**

In PHPMyAdmin, create a new database with a specific user for this database.

3. **Environment variables**

At the root project create a folder 'env'.  
Inside this folder create a file '.env' put :  

```.env
NODE_ENV=development
FRONT_URL=your_front_url
FRONT_BASE_HREF=null      // null in dev, just in case in producion mode
BACK_URL=your_back_url
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_user_name
DATABASE_PASSWORD=your_password
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port
DATABASE_URL=your_database_URI
EMAILJS_PUBLIC_API_KEY=your_email_js_public_key
EMAILJS_PRIVATE_API_KEY=your_email_js_private_key
EMAILJS_SERVICE_ID=your_email_js_service_id
EMAILJS_TEMPLATE_ID=your_email_js_template_id
JWT_SECRET=your_jwt_secret_key
PORT=your_back_end_port
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

4. **Install packages**

At the root project run :  

```.bash
npm install
```

5. **Build the database**

At the root project run :  

```.bash
npm run migrate
```

6. **Import data in the database**

At the root project run :  

```.bash
npm run seeders
```

7. **Start the app**

At the root project run :  

```.bash
npm run dev
```

8. **Run the tests with vitest**

At the root project run :  

```.bash
npm run test
```

### Users password to login

> Here is the different user name to connect, John and Jane are admin and the other are users :  
john.doe@test.com  
jane.doe@test.com  
jack.doe@test.com  
james.doe@test.com  

> This is the same password for all users : PassWord-12345-!