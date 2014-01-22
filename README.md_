
## Getting started

`BASE\public` is where you should place all your client-side HTML, Javascript, CSS, images and other resources. This is the stuff that will 'run' in the browser.

Start by copying the provided `[template.html](template.html)` file, giving it a new name and use it as the starting point for your hacking. A simple directory layout has been created for you as well to keep your JS, CSS, HTML and images all neat and tidy.

### Live reload

As you edit your source files, your browser will automatically refresh, making it quick to try out page changes. For this magic to work, you need to include the following snippet in your HTML:

	`
		&lt;script&gt;document.write('&lt;script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js"&gt;&lt;/' + 'script&gt;')&lt;/script&gt;
	`

(This is already included in the `template.html` file.)

### Javascript libraries

Pre-installed libraries

Useful Javascript libraries are preinstalled on your computer for you, and available in the `BASE\bower_components`. To use them in your project, you still have to add a reference to the library in your code. For example, to reference jQUery:
	<p>
	`
		&lt;script src="/js/jquery/jquery.min.js"&gt;&lt;/script&gt;
	`

The `src` path reflects how it is laid out on your computer, but note that 'js' appears instead of 'bower_components'. Any Javascripts you make yourself should be placed in `BASE\public\js`

# Updating Kattegat

From time to time, it might be necessary to update the little engine that powers Kattegat. To do this, stop your server (press CTRL+C) and run:

`npm install`

This will update the Kattegat engine, but won't touch any of the things you've done. Great!

You are also able to re-run the [Kattegat generator](https://github.com/ClintH/generator-kattegat) (which created all this stuff on your computer in the first place). Be careful doing this, because you might accidently overwrite some of your own work. It's safest to make a new directory, run the generator there (`yo kattegat`), and then merge your work manually.

# Getting fancy

	<p>Under the hood, Kattegat is a full [Express](http://expressjs.com)-based server, so the sky is the limit. If you want to hack on that, start by looking at `BASE\app.js`.