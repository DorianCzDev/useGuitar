
# E-commerce Demo Projects

All projects are non-commercial and they use the same database.

For install npm modules run

```
npm i
```

If you want to know more about a specific project, scroll ⬇️.

* [useGuitar-api](https://github.com/DorianCzDev/useGuitar-api) is back-end server based on express.js for `useGuitarPanel`
* [useGuiratPanel](https://github.com/DorianCzDev/useGuitarPanel) is front-end react app for employees where they can add/remove/edit stuff
* [useGuitar](https://github.com/DorianCzDev/useGuitar) is full-stack next.js app where customer can order stuff
##  `useGuitar` Tech Stack

**Client:** `Typescript`, `Next.js`

**Server:** `Next.js`

**Database:** `MongoDB`

**Main Libraries:** `Tailwind`, `Stipe`, `nodemailer`, `jsonwebtoken`, `React Slick`, `React Redux`, `Mongoose`, `React Hook Form`
##  `useGuitar` Features

- Manage cart data with `React Redux` and store it in local storage
- Make order with stripe API supported by webhook which listens to payment receive event
- Auth based on cookies - accessToken and refreshToken, the second is stored in database
- Pagination based on database skip and limit
- Real-time calculations by database with pre and post methods
- Joining documents with virtuals
- Sending cookies with hashing tokens to client
- Sign up with password hashing and sending verification email with token stored in database by `nodemailer` and gmail smtp
- Sorting and filtering data
- Forgot password, send mail with reset password token stored in database
- ...and many more!