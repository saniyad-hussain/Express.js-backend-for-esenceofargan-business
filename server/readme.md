# Essenceofargan.com Server

To develop or build the server, you must first install the dependencies `npm i`.

## Development

The development script will usually error if `/build` and `/css` don't already exists. For the cleanest first-time startup, you can run `npm run build-dev` first.

For regular development, use `npm run dev`, which starts two processes:
1. Building the source in `/src` and outputing it to `/build` and `/css`. Watching and rebuilding for any file change in `/src`.
2. A node server using `/bin/www` as the entrypoint, which runs the server files from `/build`.

You can also do single development builds using `npm run build-dev`, and you can separately start the development server and watch processes with `npm run server-dev` and `npm run babel-dev`, BUT, you will need to manually set the `NODE_ENV` environment variable to `development`. (e.g., `NODE_ENV=development npm run server-dev`.)

## Deployment

The server must be build first, using `npm run build`.

Then the server can be started with `npm start`.
