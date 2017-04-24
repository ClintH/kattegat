# Google Analytics

A tool like Google Analytics (GA) can be a useful to tracking how a prototype is used.

# 1. Sign up

Sign up for [Google Analytics](https://analytics.google.com/) and create a new "Property" (under the Administration section).

In the website URL, put in the URL you will access your code from, for example: https://mysketch.firebaseapp.com

You can leave the other options as default, and click 'Get Tracking ID'

# 2. Add the tracking code

Once created, you should be shown the Javasccript "Tracking Code" for the property you created, under the heading _Website tracking_. Copy the whole contents (including the `<script>` tags), and paste into the bottom of your HTML page, before the closing `</body>` tag.

_Tip:_ You can find this again via _Admin - Tracking Info - Tracking Code_.

Save your HTML page, and test that it works by loading it from a local server. If you visit the "Real Time" Reporting section of GA, you should see yourself in the statistics after you reload your project. It is not necessary to deploy your code to Firebase for this to work.

_Tip:_ Ensure you have disabled any ad blocker type browser extensions as they can prevent the tracking from working.

[Read more about adding analytics code](https://developers.google.com/analytics/devguides/collection/analyticsjs/)

# 3. Track an event

We're going to track when someone clicks a button on the page. Let's assume there's already a button in the HTML:

`<button id='btnTest'>Click me</button>`

In our Javascript, we could add:

```
document.getElementById('btnTest').addEventListener('click', function(e) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'buttons',
      eventAction: 'click',
      eventLabel: 'Test button clicked'
    });
});
```

Because the Google Analytics script was imported using the `SCRIPT` tag in our HTML page, we gain access to some additional functions. In these case, we use `ga`.

The parameters should be self-explanatory, but please read Google's documentation for more information. Setting informative `eventCategory`, `eventAction` and `eventLabel` properties is important to differentiate user activity. `hitType` you must leave as "event".

If you try clicking your button, you should see the event under GA's _Real Time - Events_ section. It can take a little longer for data to show up in _Behaviour - Events_.

Read more: [Tracking events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

# 4. Track timing

Let's measure the interval between button presses and send that timing information to GA. Assuming we have the same button in our HTML:

`<button id='btnTest'>Click me</button>`

In our Javascript, we could add:

```
// Get the time when the page loads
var lastClick = performance.now();

// Handle the click event
document.getElementById('btnTest').addEventListener('click', function(e) {
    // Calculate the difference, and round the number off
    var elapsedTime = Math.round(performance.now()- lastClick);

    // Print it out for our own testing:
    console.log("Elapsed time: " + elapsedTime);

    // Send to GA
    ga('send', {
      hitType: 'timing',
      timingCategory: 'buttons',
      timingVar: 'click',
      timingValue: elapsedTime
    });

    // Keep track of the current time
    lastClick = performance.now();
});
```

Read more: [Track User Timings](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings)

You can see the gathered data in the GA dashboard under _Behaviour - Site Speed - User Timings_. The timing data doesn't show up as fast as the real time events, so don't be surprised if nothing immediately shows.

# 5. Deployment note

GA will happily take in data from your page while you run it from your own computer. You may need to 'verify' your deployed site if a warning is displayed in the GA dashboard. The easiest method is via a HTML tag, [read more about that](https://support.google.com/webmasters/answer/35179?hl=en)



