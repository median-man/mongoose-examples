# Mongoose Example

This repository is a collection of useful examples using Mongoose ORM and
ExpressJS.

## Requirements

Must have NodeJS and MongoDB installed and the MongoDB service running.

## Quickstart

1. Clone this repo.
2. Run `npm install`
3. Run `npm run seed:all` to seed db with fake data.
4. Run `npm run dev` to start development server.

The `User` model has examples of virtuals for `longnote` and `notes`. The
`notes` field is a virtual that may be populated with documents from the `Note`
model. The `longnote` virtual returns the note with the longest string for the
`body` field.

An example of an instance method is included on the `User` model. This method
searches queries the `Note` model for the longest note belonging to the user.

See `src/server.js` for routes to test the behavior of various queries using
Postman, curl, or some other http client.
