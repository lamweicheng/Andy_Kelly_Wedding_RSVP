# Andy & Kelly's Wedding

This project is a mobile-first wedding invitation site for Andy and Kelly. The homepage highlights the three planned celebrations:

- San Francisco church ceremony and reception on 23 October 2027
- Malaysia tea ceremony and wedding banquet on 13 November 2027
- Hong Kong tea ceremony and wedding banquet on 20 November 2027

Venue details, Zoom information, and RSVP responses can be managed from the admin page.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Visit http://localhost:3000/admin for the admin dashboard.

## Notes

- The design is built to prioritize mobile presentation first and scale cleanly to desktop.
- RSVP responses and event details are stored with Prisma.
- Set `ADMIN_PASSWORD` in `.env` if you want the admin page to require a password.
- After updating the Prisma schema, run `npx prisma db push` against your database before collecting real RSVP responses.