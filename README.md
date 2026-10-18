# freeCodeCamp Basic Node and Express

A starter project for the 12 Basic Node and Express exercises.

## Run locally
1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Run `npm start`.
4. Open http://localhost:3000.

## Deploy
Upload these files to a Node.js hosting service. Use build command `npm install` and start command `npm start`. Set environment variable `MESSAGE_STYLE=uppercase` in the hosting dashboard. The host should assign a public HTTPS URL; paste that URL into freeCodeCamp's Solution field.

## Important
Some freeCodeCamp checks depend on middleware registration order. In this starter, the logger is installed after the root and JSON routes, so requests to those routes won't be logged. If a challenge checks logging for all requests, move the logger above the routes. Challenges may also expect step-by-step edits rather than one finished solution. Always run the tests on the official site and adjust if needed.
