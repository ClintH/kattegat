# Javascript libraries

Useful Javascript libraries are preinstalled on your computer for you, and available in the `BASE\bower_components`. You are free to reference them individually with a `SCRIPT` tag, or take advantage of the `BASE\bower_components\libraries.js` file, which is a glued-together version of all the libraries, making it super easy to import the whole lot with a single tag:

````
<script src="/bower_components/libraries.js"></script>
````

If you want to just use a single library in your project, don't use the `libraries.js` file. Instead, dig into the `BASE\bower_components` folder to find the path for the source file you want to use and reference it. Normally it will be the source file with the same name as the module. For example, to reference jQuery:
	
````
<script src="/bower_components/jquery/jquery.min.js"></script>
````

The pre-installed libraries are:
* [Animate.css](http://daneden.github.io/animate.css/): Easily add simple animations
* [Geolib](https://github.com/manuelbieh/Geolib): Geographic data functions
* [Hammer](http://eightmedia.github.io/hammer.js/): Touch gesture recognition
* [jsfeat](http://inspirit.github.io/jsfeat/#imgproc): Image processing
* [jQuery](http://www.jquery.com)
* [Leaflet](http://leafletjs.com/): Map rendering
* [lodash](https://github.com/lodash/lodash): Utility functions
* [Moment](http://momentjs.com/): Time and date manipulation
* [PointerEvents polyfill](https://github.com/Polymer/PointerEvents): Mouse/stylus/touch event unifier
* [PureCSS](http://purecss.io): Simple CSS reset
* [Tinycolor](https://github.com/bgrins/TinyColor): Colour manipulation
* [Transit](http://ricostacruz.com/jquery.transit/): CSS animation

The libraries are installed via [Bower](http://bower.io/), which makes it easy to install and keep libraries updated. If you're feeling adventurous you can install new Bower packages, and then run some grunt tasks to rebuild `libaries.js`.

````
$ bower install cool-library
$ grunt clean bower_concat concat
````

Of course, you can always reference Javascript libraries hosted remotely, or by copying them into your `BASE\public\` directory and referencing them. To reference `my-extra-library.js` and the remotely-hosted Google Web Fonts loader:
````
<script src="/my-extra-library.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/webfont/1.5.0/webfont.js"></script>
````

# Getting fancy

Under the hood, Kattegat is a full [Express](http://expressjs.com)-based server, so the sky is the limit. If you want to hack on that, start by looking at `BASE\app.js`.
