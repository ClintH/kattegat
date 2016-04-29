This is a guide to deploying a Kattegat sketch to [Firebase](https://www.firebase.com/).

Note that the 'realtime' features of Kattegat are not available. Instead, you'll need to use a service like [Pusher](http://pusher.io).

# 1. Set up and initial deploy

Follow the [setup steps to install Firebase](https://www.firebase.com/docs/hosting/guide/deploying.html) if you don't already have it.

You'll be deploying from within your Kattegat project directory, so make sure your are 'in' that directory when you run these commands. Eg:

```
cd /Users/clint/code/public/sketch0
```

Next we'll initialise a Firebase project. We tell Firebase to use the current directory (designated with a '.') as the directory to publish:

```
firebase init --public .
firebase deploy
```

# 2. Test and fix deployment

After deploying, Firebase will report how many files were updated, and print out the URL of your published project.

Open the deployed URL in your browser (eg `http://mystuff.firebaseapp.com`), and with Chrome's Developer Tools, you'll see a lot of "Failed to load resource" errors. We need to fix this.

You'll need to copy the resources it reports as missing into your project diectory, change the references in your HTML file, and redeploy.

1. Copy these three files to your project directory from the main Kattegat directory

```
bower_components/pure/pure-min.css
public/base.css
bower_components/libraries.js
```

2. In your 'index.html' file, change the `<link>` tag at the top of the page from:

  `<link rel='stylesheet' href='/bower_components/pure/pure-min.css'>`

    to

  `<link rel='stylesheet' href='pure-min.css'>`

3. In your 'index.html' file, change the `<script>` tag at the bottom of the page from:

  `<script src="/bower_components/libraries.js"></script>`

    to

  `<script src="libraries.js"></script>`

4. Save, redeploy to Firebase, and test again in Chrome. The page and your script should load without errors.

Now you are set up to code and test with your Kattegat server, and push your code to Firebase when you want to deploy and test it remotely.

