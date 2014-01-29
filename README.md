# Welcome

Kattegat is a simple application server designed to make prototyping Javascript-based interactivity a bit smoother, yet without hiding too much of the real workings. <a href="https://github.com/ClintH/kattegat/blob/master/INSTALL.md">Install Kattegat</a> and play with the demos, or <a href="https://github.com/ClintH/kattegat/blob/master/API.md">read the code documentation</a>. There are also some basic sample projects which string together some snippets from the samples and relevant JS docs and show how things work in action - access those from your own Kattegat server once you've got it running.

It is developed for the Designing Interactive Artifacts course at the IT University of Copenhagen.

Please note that the server is not designed with any kind of access control. Use a firewall to restrict connections, and only run the server when you need it. It should NOT be used for any kind of production purposes.

# What can it do?

* Application server for serving static resources such as HTML, JS, CSS and images: Accessible from your own computer, or other devices on the same network
* Includes the latest version of various client-side Javascript libraries (such as jQuery and lodash) to simplify development
* Live reload for quick and easy experimentation with HTML, JS and CSS
* Persistent storage of small amounts of data and basic query capabilities (via [nedb](https://github.com/louischatriot/nedb))
* Simple realtime data exchange (via [Socket.io](http://socket.io))
* TODO: Arduino interfacing (via [Breakout.js](http://breakoutjs.com))
* TODO: Phidget interfacing

# <a href="https://github.com/ClintH/kattegat/blob/master/INSTALL.md">Getting started</a>

Read the <a href="https://github.com/ClintH/kattegat/blob/master/INSTALL.md">Getting Started</a> guide

# Read more
* [API documentation](https://github.com/ClintH/kattegat/blob/master/API.md)
* [Advanced topics](https://github.com/ClintH/kattegat/blob/master/DOCS.md)