# vue-easeljs
A Vue.js plugin to control an HTML5 canvas using EaselJS

# Thanks

This library wouldn't be possible without the work of Joshua Bemenderfer at <a href="https://alligator.io/vuejs/custom-component-renderers/">alligator.io</a> and the <a href="http://www.createjs.com/easeljs">EaselJS</a> team.

Thanks to JPhilipp on <a href="https://opengameart.org/content/700-sprites">opengameart.com</a> for making freely available the sprites I used in testing.

And thanks to jez s on Flickr for the postcard photo on <a href="https://commons.wikimedia.org/wiki/File:Entrance_to_Gulfstream_Park,_at_Hallandale,_Florida,_the_%27track_by_the_sea.%27_One_of_the_nation%27s_most_scenic_race_courses..jpg">Wikimedia</a>.

# Implemented

This library provides Vue.js component access to:

* Canvas
* Container
* Shape
* Sprite
* Bitmap
* Text

And all of these supports the attributes:

* x: number
* y: number
* flip: horizontal, vertical, or both
* rotation: number of degrees
* scale: number
* alpha: number
* shadow: array

# Pending

We need to include these miscellaneous features: 

* Touch

There are no plans to implement these features:

* Filters
* BitmapText
* Buttons
* Complex Vector Paths
* MovieClip
* cache
