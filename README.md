# Wave

Hello, my name is Erdonis and this is a simple social media site I built with a special function.
This social site is aimed at helping with productivity and internet addiction.
It has a built-in function that makes it possible to only use it one hour per day, stacked throughout the day each time a user logs in.
Once the daily usage allowance is used up, the site will become inaccesible for the user until 00:00 their local time.
This is done for the purpose of using social media in a controlled manner and avoid becoming addicted to it.

## Features

- Email register and login
- Users can update their info, profile photo and cover photo
- Create, update and delete posts, comments and replies
- Like and unlike posts, comments and replies
- Images and videos can be added to posts
- Follow and unfollow other users
- Send and receive messages between users
- 1h daily usage cap
- Activity logging and notifications
- Gallery of user's uploaded photos and videos
- Fully responsive design
- Dark and light themes

!NOTE
This project is a work in progress, it still contains bugs and it serves only as a blueprint of what the actual end product would look like.

## Tech Stack 🛠️

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)
- [React Aria](https://react-spectrum.adobe.com/react-aria/getting-started.html)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Prisma](https://www.prisma.io/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS SES](https://aws.amazon.com/ses/)

## Deployment on EC2

Follow these steps to deploy Wave on an EC2 instance.

1. Set up a PostgreSQL database and copy its connection URL into `.env`.
2. Run `npm install`
3. Run `npm run prisma:deploy`
4. Run `npm run prisma:seed`
5. Run `npm run pm2` (or `npm run build` and then `npm run start` if you're not using PM2). You can modify the port specified in the `pm2` script depending on your server configuration.
