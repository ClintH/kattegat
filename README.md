# Welcome

Kattegat is a simple application server designed to make prototyping Javascript-based interactivity a bit smoother, yet without hiding too much of the real workings. <a href="#install">Install Kattegat</a> and play with the demos, or <a href="https://github.com/ClintH/kattegat/blob/master/DOCS.md">read the documentation</a>. There are also some basic [sample projects](https://github.com/ClintH/dia-samples) which string together some snippets from the samples and relevant JS docs and show how things work in action.

It is developed for the Designing Interactive Artifacts course at the IT University of Copenhagen.

Please note that the server is not designed with any kind of access control. Use a firewall to restrict connections, and only run the server when you need it. It should NOT be used for any kind of production purposes.

## What can it do?

* Application server for serving static resources such as HTML, JS, CSS and images (and the use of pre-processors like Jade and Stylus if you like)
* Persistent storage of small amounts of data, and basic query capabilities (via [nedb](https://github.com/louischatriot/nedb))
* Simple realtime WebSocket data exchange (via [Socket.io](http://socket.io))
* TODO: Arduino interfacing (via [Breakout.js](http://breakoutjs.com))
* TODO: Phidget interfacing

# <a name="install"></a> Getting started

This assumes you've already run the [Kattegat generator](https://github.com/ClintH/generator-kattegat). Do this step first.

You'll want to open a terminal (or command prompt) window and change directory to the place you ran the Kattegat generator (`yo kattegat`). Hopefully you remember where that is!

To change directory, you can write something like this on your Mac:

````
$ cd /User/clint/dev/kattegat-play
````

Or on Windows:
````
cd c:\Users\clint\dev\kattegat-play
````

If you then list the directory contents (`ls` on a Mac or `dir` on a PC), you should see a bunch of directories and files, including a 'bower_components' directory and a 'app.js'. If you do, you're probably in the right place, and can continue. We'll use "BASE" to signify this base directory.

`BASE\public` is where you should place all your client-side HTML, Javascript, CSS, images and other resources. This is the stuff that will 'run' in the browser.

## Is everything working?
1. Have you installed and run [Kattegat generator](https://github.com/ClintH/generator-kattegat)?
2. Start your server if you haven't already, by running `node app` (press CTRL+C to stop it).
3. The server will display one or more URLs which you can use to access it. Open one of them in your browser
4. If you get a page, and the demo and template links work you're all set to start hacking
5. The server window is useful for debugging - keep an eye on it!

Note: If Live reload is enabled, sometimes the server will crash if your text editor writes a temporary file to the Kattegat directory. If that happens, simply restart the server.

## Making your own pages
The Kattegat generator lets you make your own scratch pages which are ready to go. [https://github.com/ClintH/generator-kattegat/blob/master/README.md#make-page](Read more on how to do this)

It _should_ be as simple as running:

````
$ yo kattegat:page
````

You'll get prompted for a name of the page. It's a good idea to keep it short and sweet, because this will be how you access the page from a browser. Naming a page 'froz' will mean you access your page at: `http://localhost:3000/froz/`, and your files will be stored in `BASE\public\froz`.

# Good to know
## Live reload

As you edit your source files, your browser will automatically refresh, making it quick to try out page changes.

## Javascript libraries

Useful Javascript libraries are preinstalled on your computer for you, and available in the `BASE\bower_components`. You are free to reference them individually with a `SCRIPT` tag, or take advantage of the `BASE\bower_components\libraries.js` file, which is a glued-together version of all the libraries, making it super easy to import the whole lot with a single tag:

````
<script src="/bower_components/libraries.js"></script>
````

If you want to just use a single library in your project, don't use the `libraries.js` file. Instead, dig into the `BASE\bower_components` folder to find the path for the source file you want to use and reference it. Normally it will be the source file with the same name as the module. For example, to reference jQuery:
	
````
<script src="/bower_components/jquery/jquery.min.js"></script>
````

The pre-installed libraries are:
* [jQuery](http://www.jquery.com)
* [lodash](https://github.com/lodash/lodash): Utility functions
* [Geolib](https://github.com/manuelbieh/Geolib): Geographic data functions
* [PointerEvents polyfill](https://github.com/Polymer/PointerEvents): Mouse/stylus/touch event unifier
* [PureCSS](http://purecss.io): Simple CSS reset
* [Chroma.js](https://github.com/gka/chroma.js): Colour manipulation
* [Hammer](http://eightmedia.github.io/hammer.js/): Touch gesture recognition
* [Transit](http://ricostacruz.com/jquery.transit/): CSS animation
* [Moment](http://momentjs.com/): Time and date manipulation

The libraries are installed via [Bower](http://bower.io/), which makes it easy to install and keep libraries updated. If you're feeling adventurous edit `BASE\bower.json` and add new libraries and then run the following command to install them:

```
$ bower install
```

Of course, you can always reference Javascript libraries hosted remotely, or by copying them into your `BASE\public\` directory and referencing them, eg to reference `my-extra-library.js` and the remotely-hosted Google Web Fonts loader:
````
<script src="/my-extra-library.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/webfont/1.5.0/webfont.js"></script>
````

# Updating Kattegat

From time to time, it might be necessary to update the little engine that powers Kattegat. To do this, stop your server (press CTRL+C) and run:

````
$ npm install
````

This will update the Kattegat engine, but won't touch any of the things you've done. Great!

You are also able to re-run the [Kattegat generator](https://github.com/ClintH/generator-kattegat) (which created all this stuff on your computer in the first place). Be careful doing this, because you might accidently overwrite some of your own work. It's safest to make a new directory, run the generator with:

````
$ yo kattegat
````

...and then merge your work manually.

# Getting fancy

Under the hood, Kattegat is a full [Express](http://expressjs.com)-based server, so the sky is the limit. If you want to hack on that, start by looking at `BASE\app.js`.