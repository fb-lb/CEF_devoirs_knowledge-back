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
- Vitest : 4.1.10
- MariaDB : 10.4.32 [download page](https://mariadb.org/download/)
- MongoDB Atlas : [create an account](https://account.mongodb.com/account/login)

---

## Local installation

1. **Download project**

Go [here](https://github.com/fb-lb/CEF_devoirs_knowledge-back).  
Click on green button 'Code' and 'Download ZIP'.  
Extract files.
Open the project in your IDE.

2. **Create database in PHPMyAdmin**

In PHPMyAdmin, create a new database with a specific user for this database.

3. **Create a MongoDB Cluster**

Go [here](https://account.mongodb.com/account/login) to create a MongoDB account and have your own cluster. Once connected, in your cluster, you can click on "Connect" and then "Drivers" and you can copy your connection string like :  
mongodb+srv://<db_username>:<db_password>@<cluster_name>.9oqojfz.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<your_app_name>  
Keep this string for the next step (that is the DATABASE_MONGO_DB_URI)

4. **Environment variables**

At the root project rename '/env/.env.example' by '/env/.env' and fill the environment variable value.

5. **Install packages**

At the root project run :  

```.bash
npm install
```

6. **Build the MariaDB database**

At the root project run :  

```.bash
npm run migrate
```

7. **Import data in the MariaDB database**

At the root project run :  

```.bash
npm run seeders
```

8. **Import data in the MongoDB database**

At the root project run :  

```.bash
npm run seeders-logs
```

9. **Start the app**

At the root project run :  

```.bash
npm run dev
```

10. **Run the tests with vitest**

At the root project run :  

```.bash
npm run test
```

### Users password to login

> Here is the different user name to connect, John and Jane are admin and the other are only users :  
john.doe@test.com  
jane.doe@test.com  
jack.doe@test.com  
james.doe@test.com  

> This is the same password for all users : PassWord-12345-!