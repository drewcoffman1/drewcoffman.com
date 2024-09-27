# We'll make a good web site for you, at Tiger Pajamas! (dot com)

This is the starter site for new Tiger Pajamas web sites. Follow the below steps to get up and running with a new web site quickly.

## Create a new project, copy astro starter, wipe git and dependencies, run

```
cd <WHEREVER YOUR GIT STUFF IS STORED>
cp -r astro-starter <NAME OF NEW PROJECT>
cd <NAME OF NEW PROJECT>
rm -rf .git node_modules package-lock.json tina/tina-lock.json
npm i
code .
npm run dev
```

## Initial customization
`/src/consts.ts`
Change `SITE_TITLE` and `SITE_DESCRIPTION`
`BASE_URL`: change from `https://tigerpajamas.com` to eventual production url

### Git

```
git init
git add -A
git commit -m "initial commit"
```

Create a new private repository on github.com and follow the instructions to push this code to the new repo. If you are using git under a different email than hello@tigerpajamas.com, you'll need to add that email as a collaborator in the repo settings before it will let you push.

## Tina

- go to [app.tina.io](https://app.tina.io) and login with github
- create a new project, import your site, select git repo
- when a screen with a token shows up, run `npx @tinacms/cli init backend` at project root and follow the prompts (Other, npm, Tina Cloud, enter the tokens it asks for). This will create a `.env` file at root with three environment variables. commit and push any changes.

## Netlify

New site, choose git repo
Pick good name for project, it will become {PROJECT_NAME}.netlify.app
Keep build settings as is, and enter the three environment variables from the previous step where prompted
hit deploy
set up custom DNS if desired after successful deployment

### Do now or when ready:

**Change favicon**: `public/favicon` (get files at [favicon.io](https://favicon.io))
**Change default image for previews**: add image to `/public/img` and change reference in `/src/layouts/BaseLayout.astro`
