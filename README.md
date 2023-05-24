# Customer Support Center
This is the repo that I have put together for the code-test provided by the CMS team at IKEA. The project consists of a backend and a frontend, more about these projects and how to configure them can be found below.

## Frontend
The frontend is built with NextJS, Tailwindcss and some other minor packages. To get the frontend running make sure that you copy the `.env.local-example` into `.env.local` (found in `apps/web`) and provide the endpoint for the backend. An example would be:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
After copying the `env-file` you can go ahead an run `pnpm run dev --filter=web`. The entry point for the frontend is `/signin` but you have to navigate there yourself.

Alternatively the frontend can be run in production mode with the following commands: `pnpm run build --filter=web` and `pnpm --filter=web run start`

These commands assume that you're standing in the root of the project.

## Backend
The backend is built on top of NestJS to provide the frontend with functionality such as fetching data, mutating data and a minor session solution. Before you get started with the backend make sure you copy the `.env-example` file into `.env` and fill out the values (found in services api). An example would be:
```
SESSION_SECRET=my-super-secret
SESSION_NAME=authentication
SESSION_MAX_AGE=360000 # This only lasts 6 minutes
PORT=3001
```
After copying the `env-file` you can go ahead an run `pnpm run dev --filter=api`

Alternatively the backend can be run in production mode with the following commands: `pnpm run build --filter=api` and `pnpm --filter=web run api`

These commands assume that you're standing in the root of the project.

## The Project
The project consists of several features including a signup that can be used to create the first entry user, this user can either become an ADMIN, a SUPPORT AGENT or a CUSTOMER. Once signed up one can proceed to login and you'd be redirected to the homepage of the user-type. The homepages are as follows:

### ADMIN
As an ADMIN you are greeted with an overview of SUPPORT AGENTS that can be maintained by the admin, you can ADD, EDIT and REMOVE SUPPORT AGENTS.

### SUPPORT AGENT
As a SUPPORT AGENT you are greeted with an overview of your assigned ticket as well as all other active tickets, those are tickets which has not been resolved yet. As a SUPPORT AGENT you can view any of these tickets as well as resolving them and thus removing them from the previous view. When a ticket has been resolved the backend will attempt to find a new ticket for the agent that was assigned to the now resolved ticket.

### CUSTOMER
As a customer you can create a new ticket that will appear in the homepage for SUPPORT AGENTS. When a new ticket has been created the backend will attempt to find an available agent to assign to the ticket.


## Improvements
Given more time I think there are many things which could be improved on, but I think that is better left as a topic for the technical interview.

## Known defects
* Signout doesn't work, manual clearing of cookies in the client is needed (Also applies to destroying of sessions)
* Technically the interface for the ticket doesn't exactly match the description, you can't pick any products for instance
* Various styling defects that could have used some more love