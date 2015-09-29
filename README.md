# DPE plugin

**DPE plugin** is a jquery plugin that creates an image of Energy Efficiency Rating and Environmental Impact Rating. DPE stands for *Diagnostic de Performance Energétique*. Displaying rating in french real estate adverts is a [legal requirement](http://vosdroits.service-public.fr/particuliers/F16096.xhtml).

By using this script, that creates an image in HTML5 canvas element, you can:

* minimize http requests
* take advantage of browser caching
* avoid storing more image files on server
* combine it with other scripts
* speed up page load time

## Screenshots

![Energy Efficiency Rating](https://raw.github.com/sandraf/jquery.dpe-plugin.js/master/examples/dpe-energy.png?raw=true "Energy Efficiency Rating")

![Environmental Impact Rating](https://raw.github.com/sandraf/jquery.dpe-plugin.js/master/examples/dpe-climate.png?raw=true "Environmental Impact Rating")

## Installation

Clone this repository: `git clone https://github.com/sandraf/jquery.dpe-plugin.js.git`

Include script *after* the jQuery library:

````html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.dpe-plugin.min.js"></script>
```

## Usage

Just change the value of the `data-*` attribute.

Using `dpe-energy` class and `data-energy` attribute, or `dpe-climate` class and `data-climate` attribute is mandatory.

```html
<canvas class="dpe-energy" data-energy="92">
  <!-- Fallback content -->
</canvas>
<canvas class="dpe-climate" data-climate="45">
  <!-- Fallback content -->
</canvas>
```

You can create as many canvas elements as you want on a single page.

Then call the plugin, with or without overriding settings:

```html
<script>
  $(document).ready(function() {
    $('.dpe-energy').drawDPE({
      'size' : '280',
      'captionEnergy': ['More efficient', 'Less efficient', '']
    });
    $('.dpe-climate').drawDPE();
  });
</script>
```

You can override the following settings: captions, colors, ranges, limits, units, size (the minimum legal size is 180px). Just take a look at the beginning of the non minified script to see possible options.

## Author

*  [Blog](http://sandraf.github.io/)
*  [Twitter](https://twitter.com/ardnaS_F)
*  [Linkedin](https://fr.linkedin.com/in/sandrafrade)
