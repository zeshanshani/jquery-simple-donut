/**
 * Simple Donut
 *
 * Version: 0.1
 * Author: Zeshan Ahmed
 * Website: https://zeshanahmed.com/
 * Github: https://github.com/zeshanshani/jquery-simple-donut/
 */
(function($) {

  $.fn.simpleDonut = function( options ) {

    // Settings.
    var settings = $.extend({
      width: 130,
      height: 130,
      stroke: 10,
      total: 100,
      value: 0,
      title: '',
      text: '{value}/{total}',
      text2: '',
      defaultColor: '#D3DAE6',
      progressColor: '#22AB59',
    }, options );

    // Define global plugin variables.
    var $donuts = $(this);

    // Run through all the $donuts instances.
    $donuts.each(function(i, el) {

      // Define variables.
      var $instance  = $(this),
          id = uniqueId();

      // Define options of each instance of $donuts.
      var width = $instance.data('donut-width'),
          height = $instance.data('donut-height'),
          stroke = $instance.data('donut-stroke'),
          total = $instance.data('donut-total'),
          value = $instance.data('donut-value'),
          title = $instance.data('donut-title'),
          text = $instance.data('donut-text'),
          text2 = $instance.data('donut-text2'),
          defaultColor = $instance.data('donut-default-color'),
          progressColor = $instance.data('donut-progress-color');

      // Check all the data options and if
      // any of them is empty, set it to settings.{option_name}
      if ( ! width ) width = settings.width;
      if ( ! height ) height = settings.height;
      if ( ! stroke ) stroke = settings.stroke;
      if ( ! total ) total = settings.total;
      if ( ! value ) value = settings.value;
      if ( ! title ) title = settings.title;
      if ( ! text ) text = settings.text;
      if ( ! text2 ) text2 = settings.text2;
      if ( ! defaultColor ) defaultColor = settings.defaultColor;
      if ( ! progressColor ) progressColor = settings.progressColor;

      $instance.html(
        `<svg class="simple-donut" id="donut_${id}" width="${width}" height="${height}">
          <circle class="simple-donut__circle-bg"
            stroke="${defaultColor}"
            stroke-width="${stroke}"
            fill="transparent"
            r="52"
            cx="${width/2}"
            cy="${height/2}"
          />
          <circle
            class="simple-donut__circle"
            stroke="${progressColor}"
            stroke-width="${stroke}"
            stroke-linecap="round"
            fill="transparent"
            r="52"
            cx="${width/2}"
            cy="${height/2}"
          />
        </svg>`
      );

      var $svg = $instance.find('svg');

      insertText( title, 50, 'simple-donut__title' );
      insertText( text, 75, 'simple-donut__text' );
      insertText( text2, 88, 'simple-donut__text2' );

      var circle = $instance.find('.simple-donut__circle')[0],
          radius = circle.r.baseVal.value,
          circumference = radius * 2 * Math.PI;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      function setProgress( percent ) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
      }

      if ( total ) {
        value = value * 100 / total;
      }

      $({ counter: 0 }).animate({ counter: value }, {
        duration: 500,
        easing: 'swing',
        step: function() {
          setProgress( Math.ceil( this.counter ) );
        }
      });


      /**
       * Insert Text
       *
       * @param {string} val text content
       * @param {string} y vertical position
       * @param {string} cssClass CSS class for the tag
       */
      function insertText( val, y = 40, cssClass = 'simple-donut__text' ) {
        // If Val isn't defined, return empty.
        if ( ! val ) return;

        // Check if placeholders are present.
        var hasTotal = val.indexOf( '{total}' ) > -1;
        var hasValue = val.indexOf( '{value}' ) > -1;

        // Replace placeholders.
        val = val.replace( '{total}', total );

        // Append the text as SVG child.
        appendSVGChild( 'text', $svg[0], {
          class: cssClass,
          x: '50%',
          'dominant-baseline': 'middle',
          'text-anchor': 'middle',
          y: y
        }, '' );

        // Find the recently added text.
        var $elem = $svg.find( '.' + cssClass );

        if ( hasValue ) {
          $({ counter: 0 }).animate({ counter: value }, {
            duration: 1000,
            easing: 'swing',
            step: function () {
              var newVal = val;
              newVal = newVal.replace( '{value}', Math.ceil( this.counter ) );
              $elem.text( newVal );
            }
          });
        } else {
          val = val.replace( '{value}', value );
          $elem.text( val );
        }

        return $elem;
      }

    });


    /**
     * Append SVG Child
     *
     * @param {string} element tag name
     * @param {object} target element object where it should append
     * @param {object} attributes a JS object containing tags name and value
     * @param {string} text text that goes inside the tag
     */
    function appendSVGChild( element, target,attributes = {}, text = '' ) {
      let e = document.createElementNS( 'http://www.w3.org/2000/svg', element );
      Object.entries(attributes).map(a => e.setAttribute(a[0],a[1]));
      if (text) {
        e.textContent = text;
      }
      target.appendChild(e);
      return e;
    };

    /**
     * Generate Unique ID
     */
    function uniqueId() {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return Math.random().toString(36).substr(2, 9);
    };

  }

})(jQuery);