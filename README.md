# Welcome

Kattegat is a simple application server designed to make prototyping Javascript-based interactivity a bit smoother, yet without hiding too much of the real workings.

It is developed for the Designing Interactive Artifacts course at the IT University of Copenhagen.

Please note that the server is not designed with any kind of access control. Use a firewall to restrict connections, and only run the server when you need it. It should NOT be used for any kind of production purposes.

## Main features

* Application server for serving static resources such as HTML, JS, CSS and images (and the use of pre-processors like Jade and Stylus if you like)
* Persistent storage of small amounts of data, and basic query capabilities (via [nedb](https://github.com/louischatriot/nedb))
* Simple realtime WebSocket data exchange (via [Socket.io](http://socket.io))
* TODO: Arduino interfacing (via [Breakout.js](http://breakoutjs.com))
* TODO: Phidget interfacing

# Getting started

This assumes you've already run the [Kattegat generator](https://github.com/ClintH/generator-kattegat). Do this first if you haven't.

`BASE\public` is where you should place all your client-side HTML, Javascript, CSS, images and other resources. This is the stuff that will 'run' in the browser.

0. Have you installed and run [Kattegat generator](https://github.com/ClintH/generator-kattegat)?
1. Start by copying the provided `template.html` file and give it a new name, eg `test1.html`
2. Start your server if you haven't already with `node app`
3. The server will tell you how to access it, and print our one or more URLs to the terminal. Copy one into your browser, and add on the name of your file, eg `http://127.0.0.1:3000/test1.html`
4. Hack away on this file, placing any additional resources such as scripts, images and CSS in directories created for you. As you save, your page your automatically reload.
4. Keep an eye on the server window to help your debugging.

# Good to know
## Live reload

As you edit your source files, your browser will automatically refresh, making it quick to try out page changes. For this magic to work, you need to include the following snippet in your HTML:

	`
	<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js"></' + 'script>')</script>
	`

(This is already included in the `template.html` file.)

## Javascript libraries

Useful Javascript libraries are preinstalled on your computer for you, and available in the `BASE\bower_components`. To use them in your project, you still have to add a reference to the library in your code. For example, to reference jQuery:
	
	`
	<script src="js/jquery/jquery.min.js"></script>
	`

The `src` path reflects how it is laid out on your computer, but note that 'js' appears instead of 'bower_components'. Any Javascripts you make yourself should be placed in `BASE\public\js`

The pre-installed libraries are:
* [jQuery](http://www.jquery.com)
* [lodash](https://github.com/lodash/lodash)
* [PointerEvents polyfill](https://github.com/Polymer/PointerEvents)

# Updating Kattegat

From time to time, it might be necessary to update the little engine that powers Kattegat. To do this, stop your server (press CTRL+C) and run:

`npm install`

This will update the Kattegat engine, but won't touch any of the things you've done. Great!

You are also able to re-run the [Kattegat generator](https://github.com/ClintH/generator-kattegat) (which created all this stuff on your computer in the first place). Be careful doing this, because you might accidently overwrite some of your own work. It's safest to make a new directory, run the generator with `yo kattegat`, and then merge your work manually.

# Getting fancy

Under the hood, Kattegat is a full [Express](http://expressjs.com)-based server, so the sky is the limit. If you want to hack on that, start by looking at `BASE\app.js`.