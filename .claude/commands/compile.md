# Compile for Local Deployment

Build the Next.js project and start a local preview server.

## Steps

1. Run `npm run build` to create a production build
2. If the build succeeds, run `npx serve out` to serve the static files locally
3. Report the local URL to the user (typically http://localhost:3000)

## Notes

- The project uses static export, so the build output goes to the `out/` directory
- If the build fails, report the errors and suggest fixes
