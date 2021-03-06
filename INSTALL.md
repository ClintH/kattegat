# Getting Started

We'll be using the terminal ("command prompt" on Windows) to do a lot of stuff. I use a $ to show what you need to type at the prompt - **don't actually type the $**. You can read more about the [Mac OS X terminal](http://www.dummies.com/how-to/content/how-to-use-basic-unix-commands-to-work-in-terminal.html) and [Windows command prompt](http://www.sophos.com/en-us/support/knowledgebase/13195.aspx)

On OS X, you'll want to start the "Terminal" app, and on Windows, start the "Command Prompt" app (Win+R, type `cmd` and press ENTER)

## Step 1: Install Node and Git

[Please follow these steps for installing Node.js and Git](INSTALL NODE.md)

## Step 2: Install helper tools

We'll use [npm](http://howtonode.org/introduction-to-npm) (Node Package Manager), a useful tool for downloading packages of code and keeping them up to date. It is installed automatically on your computer when you install Node.js.

Open up a terminal/command prompt, and the helper tools ([Yeoman](http://yeoman.io), [Bower](http://bower.io), [Grunt](http://gruntjs.com) and [Gulp](http://gulpjs.com)) with the following command:

```
$ npm install -g yo bower grunt-cli gulp
```

Depending on your network connection it might take a minute or two to complete. Wait until you see your blinking cursor again - that's a sign it's done. The `"-g"` bit tells npm you want to install the tools globally on your computer, so you can access it no matter what directory you are in. This is useful.

## Step 3: Install Kattegat generator

The [Kattegat generator](https://github.com/ClintH/generator-kattegat) is a magical tool that generates a application server for you. But first you need to install it.

We can use npm to install globally:

```
$ npm install -g generator-kattegat
```


## <a name="make-server"></a>Step 4: Making a home for your code

Now that the setup tasks are out of the way, you are able to generate a new Kattegat server when ever you like.

You'll probably only need one, but if something breaks, it's nice to know you can re-generate it!

Change to a directory where you want to keep your source files. This might be inside your regular documents folder. On most computers when you start the terminal you'll be 'in' your main user directory, eg, `/Users/john/` or `c:\Users\john`. Let's make a `code` directory in this place. This is where your code will live. You can of course call it something else, or put it elsewhere. In that case, your mkdir and cd commands will be different.

````
$ mkdir code
$ cd code
````

On a PC, you'll see what directory you're "in" from the command prompt:

````
c:\dev\test\> _
````

While on a Mac, you can find out where you are using `pwd`:

````
$ pwd
````

Make a note of this directory. This is where we'll keep all your Kattegat-powered sketches.

Now that we have a main directory to house our projects, we want to make a directory to house our first one. Let's call it "myapp". In the following command we make a new directory "myapp" and then 'move' into it:

```
$ mkdir myapp && cd myapp
```

## Step 5: Generate a project

Now you should have everything installed, you've got a directory created where you can store your projects, and you're in a terminal with your current directory to be where you want stuff to happen.

You can now run the Kattegat generator. It will ask you for a name of the project, or just press enter if you aren't fussed.

```
$ yo kattegat
```

It will take some time to run, and you'll see a lot of stuff scrolling by. Once it's done and you get the message "Done, without errors" you're ready to continue. If it nothing seems to happen for a while, try pressing ENTER.

Tip: You might be prompted to install additional Git software. In this case, run the installer, and when it is completed, re-run the command above.

Make a note of the directory you're in. Type `pwd` on Mac or `cd` on Windows to find out where you are. We'll call this the _base directory_. You'll need to come back here to start your server and this is also where you'll install samples and edit code.

You can always get back to this directory by using the command `cd`, eg:

````
$ cd /Users/john/code/myapp/
````

Or on Windows, it might be something like:

````
$ cd c:\users\john\code\myapp\
````

## Step 6: Starting the project server

To start a server you've generated, you can use:

````
$ npm start
````

You have to be in your base directory already.

To stop it, press CTRL+C on your keyboard. Once the server starts, you won't be able to interact with the terminal until you stop the server.

Note: You can't run more than one server at a time. If you get an error that mentions "EADDRINUSE", it's probably because a server is already running. Use Activity Monitor (Mac) or Task Manager (Windows) to kill any 'node' tasks running, and try again.

Once the server starts it will list some URLs you can use to access it. Copy and paste one into your browser, and you should see a welcome page.

Tip: `http://127.0.0.1:3000/` is _always_ your local machine. If you are connected to a wired or wireless network, you'll probably see another URL printed. This is your _network address_, and is the URL you need to use if you want to access your server from another device on the same network.

Tip: Keep an eye on the terminal where the server is running. It prints useful information about what your sketch is doing, and - rarely - it might crash and need restarting.

## Accessing remotely

If you want to access your sketches from another device or network, start your server with:

```
$ npm start tunnel
```

This will generate a new address, in which traffic is securely tunneled via [ngrok](https://ngrok.com).  This means that your sketches will be available beyond the network your device is on _and_ they will be accessible via https://. This is important because when running on a different device, some web APIs (such as geolocation) are only allowed when served via HTTPS.

You should never need a tunnel if you are testing code with a browser running on the same machine you are running your Kattegat server on.


# <a name="make-page"></a> Starter sketches

When you first make your project, the directory `BASE/public/template` is created, with HTML, CSS and JS files ready to go. This is a great starting point for making quick sketches and experiments.

You can generate a new sketch from your base directory with:

````
$ yo kattegat:sketch
`````

You'll get prompted for a name of the sketch. It's a good idea to keep it short and sweet, because this will be how you access the sketch from a browser. Naming a sketch 'froz' will mean you access your sketch at: `http://localhost:3000/froz/`, and your files will be stored in `BASE/public/froz` (eg if your BASE base directory is `/Users/mary/code/`, your files will be in `/Users/mary/code/public/froz`)

The sketch generator will make a new folder and starter files for you, all ready to go.

# <a name="updating"></a> Updating

When you update, you probably want to update both the Kattegat generator, and Kattegat itself.

## Kattegat Generator

To update, and to see the version of Kattegat Generator you have installed simply run:
````
$ yo
````

And Yeoman will show a little menu. Use your cursor keys to move down to "Update your generators" and press ENTER. Yeoman should take care of the rest. If you don't see "Kattegat" listed when you run `yo`, you'll need to install it as per Step 3 above.

If you get an error about `EM FILE, too many open files`, try running:
````
$ ulimit -n 2048
$ yo
````

After the update has finished, and the Yeoman menu is still showing, navigate to the last option, "Get me out of here!" and press ENTER to quit.

If the update does not succeed, try uninstalling the generator:

````
$ npm uninstall -g generator-kattegat
````

And then reinstall as per step 3 above.

New projects you make (using `yo kattegat`) will now use the new version of Kattegat. If you want to update an existing project, read on for updating Kattegat.

## Kattegat

From time to time, it might be necessary to update the little engine that powers Kattegat.

Open a terminal and navigate to your base directory (eg `cd /Users/John/code/myapp`). Stop your server if it's already running in another terminal by pressing CTRL+C.

From the base directory, run:

````
$ grunt update
````

This will update a bunch of Kattegat things, as well as download the lastest version of the samples.

## DIA Samples

If you want to update just the samples, run the following:

````
$ grunt samplesUpdate
````

**Note** Any changes you've made within the 'dia-samples' directory will be overwritten.