This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Try the App

You can visit the deployed app here: [Submarine Social](https://dating-app-six.vercel.app/)

## Application Architecture

![Diagram of application architecture](./assets/Submarine%20social.drawio.svg)

### Landing Page

<img src="./assets/Landing.PNG" alt="drawing" width="400"/>

### Application Page

<img src="./assets/AppPage.PNG" alt="drawing" width="400"/>


As you can see you can swipe on potential connections based on interest.

## Code structure
```
.
├── assets/
│   └── ...Github assets
├── middleware/
│   └── middleware for next
├── pages/
│   ├── api/
│   │   └── ...endpoints
│   └── ...routes
├── public/
│   └── ...assets (e.g svg, img)
├── src/
│   ├── backend/
│   │   └── ...algorithms for the backend
│   ├── components/
│   │   └── ...simple components
│   ├── contexts/
│   │   └── ...context API
│   ├── controllers/
│   │   └── ...data interactive components
│   ├── hooks
│   ├── layouts/
│   │   └── ...web section layouts
│   ├── tools/
│   │   └── ...various helper functions such as casing, type checking etc...
│   └── views/
│       └── ...advanced render functions
└── styles/
    └── ...style modules
```

## Libraries

- **MUI**: Material UI as design foundation.
- **Emotion**: Dependency for Styling with MUI.
- **Framer-motion**: Animation.
- **SVGR**: SVG file loading.
- **Classnames**: To pass multiple classnames to components.
- **peerjs**: Tools to allow WebRTC p2p connection using EventEmitter3.
- **React-player**: MediaStream play capability with URL object.
- **swr**: Optimized and cached fetching.
- **Next-SEO**: Search engine optimization.
- **Mongodb**: NoSQL db.
- **Next-connect**: Middleware and better endpoints.
- **node-fetch**: Fetch on the backend.
- **ajv**: Compiled data validation for the backend.
- **next-auth**: Credentials authentication.
- **Dotenv**: Environment variables.





## Get involved

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements

- [x] The app needs to have multiple pages and use client-side routing
- [x] The app should make use of the Context API or use custom hooks
- [x] You can use an API that you have built
- [x] You should not use class components
- [x] Follow the guidelines for technical assignments

### Bonus

- [x] Having a backend

