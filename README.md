## Project Overview
- Developed end-to-end web scraping application using Next.js 13, designed to empower users with the ability to track, monitor, and receive real-time notifications regarding products and their prices on Amazon websites within the realm of eCommerce. 
- Employed BrightData to oversee IP rotation, address CAPTCHA challenges, and handle other data accessibility complexities. 
- Implemented an email notification functionality to provide regular updates to users regarding changes in their monitored products, including stock updates, price reductions, and special discounts. 
- Executed user authentication through NextAuth, utilizing JWT for secure user sessions, managing restricted and public routes, and employing bcrypt for robust password encryption.
- Utilized cron jobs for automated execution of web scraping tasks and routine updates of product records within the database.

## Website Preview
<img width="992" alt="Screen Shot 2023-10-18 at 16 48 53" src="https://github.com/Luca-garnier/PricewhisperApp/assets/69828682/23837c13-529e-4497-ac1b-3e2bdea289b2.png">

<img width="987" alt="Screen Shot 2023-10-18 at 16 49 15" src="https://github.com/Luca-garnier/PricewhisperApp/assets/69828682/992da23d-807c-4713-9bf1-e764235ec09e">

<img width="462" alt="Screen Shot 2023-10-18 at 16 51 53" src="https://github.com/Luca-garnier/PricewhisperApp/assets/69828682/981399aa-bea4-4679-baa3-b04e564ed823">






## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
