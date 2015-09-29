/**
 * jquery.dpe-plugin.js
 *
 * @author: Sandra Frade http://sandraf.github.io/
 *
**/
;(function($) {

    $.fn.drawDPE = function( options ) {

        // Settings you can override when calling the plugin
        var settings = $.extend( {
            'size'           : 260,
            'captionEnergy'  : ['Logement économe', 'Logement énergivore', 'Logement'],
            'colorEnergy'    : ['#007D1C', '#6DB410', '#C8E306', '#FFFF00', '#FFB600', '#FF6D00', '#FF0000'],
            'rangeEnergy'    : ['<50', '51 à 90', '91 à 150', '151 à 230', '231 à 330', '331 à 450', '> 450'],
            'limitEnergy'    : [50, 90, 150, 230, 330, 450],
            'unitEnergy'     : 'kWh/m²/an',
            'captionClimate' : ['Faible émission de GES', 'Forte émission de GES', 'Logement'],
            'colorClimate'   : ['#F5D7FE', '#E79CFC', '#D961FA', '#CB25F8', '#AC07DA', '#7D059E', '#4E0363'],
            'rangeClimate'   : ['<5', '6 à 10', '11 à 20', '21 à 35', '36 à 55', '56 à 80', '> 80'],
            'limitClimate'   : [5, 10, 20, 35, 55, 80],
            'unitClimate'    : 'kCO²/m²/an'
        }, options);

        return this.each(function() {

            var ctx = $(this)[0].getContext('2d');
            var value, caption, color, range, limit, unit, letterFont, rangeFont;
            var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
            $(this).css('background-color', '#FFF');
            var size = settings.size;
            ctx.canvas.width = size;
            ctx.canvas.height = size;

            // Specific variables depending on dpe type
            if ($(this).is('.dpe-energy')) {
                value = $(this).data('energy');
                caption = settings.captionEnergy;
                color = settings.colorEnergy;
                range = settings.rangeEnergy;
                limit = settings.limitEnergy;
                unit = settings.unitEnergy;
            } else if ($(this).is('.dpe-climate')) {
                value = $(this).data('climate');
                caption = settings.captionClimate;
                color = settings.colorClimate;
                range = settings.rangeClimate;
                limit = settings.limitClimate;
                unit = settings.unitClimate;
            }

            // Texts sizes
            if (size < 260) {
                ctx.font = "0.6em Arial";
                letterFont = "0.9em Arial";
                rangeFont = ctx.font;
                unitFont = "bold 0.5em Arial";
            } else if (size >= 260 && size < 360) {
                ctx.font = "0.8em Arial";
                letterFont = "1.4em Arial";
                rangeFont = ctx.font;
                unitFont = "bold 0.6em Arial";
            } else {
                ctx.font = "1em Arial";
                letterFont = "1.6em Arial";
                rangeFont = ctx.font;
                unitFont = "bold 0.8em Arial";
            }

            // Letters
            var letterStyle = "#000",
                letterX = (size * 0.115),
                letterY = (size * 0.142);

            // Ranges
            var rangeStyle = "#000",
                rangeX = (size * 0.019),
                rangeY = (size * 0.134);

            // Captions
            ctx.fillStyle = "#000";
            ctx.fillText(caption[0], (size * 0.011), (size * 0.043));
            ctx.fillText(caption[1], (size * 0.011), (size * 0.980));
            ctx.fillText(caption[2], (size * 0.740), (size * 0.043));

            // Separator
            ctx.beginPath();
            ctx.moveTo((size * 0.711), 0);
            ctx.lineTo((size * 0.711), size);
            ctx.stroke();

            // First arrow coordinates
            var arrowX = [
                0,  // Top left
                0,  // Bottom left
                (size * 0.153), // Bottom right
                (size * 0.230), // Arrow point
                (size * 0.153)  // Top right
            ];
            var arrowY = [
                (size * 0.057), // Top left
                (size * 0.173), // Bottom left
                (size * 0.173), // Bottom right
                (size * 0.115), // Arrow point
                (size * 0.057)  // Top right
            ];

            // Arrows
            var increase = 0,
                arrowPoint = 0;

            for (var i = 0; i < 7; i++) {
                arrowY[0] += increase;
                arrowY[1] += increase;
                arrowX[2] += arrowPoint;
                arrowY[2] += increase;
                arrowX[3] += arrowPoint;
                arrowY[3] += increase;
                arrowX[4] += arrowPoint;
                arrowY[4] += increase;
                rangeY += increase;
                letterX += arrowPoint;
                letterY += increase;

                // Letter
                ctx.font = letterFont;
                ctx.fillStyle = letterStyle;
                ctx.fillText(letter[i], letterX, letterY);
                ctx.globalCompositeOperation = 'destination-over';

                // Range
                ctx.font = rangeFont;
                ctx.fillStyle = rangeStyle;
                ctx.fillText(range[i], rangeX, rangeY);
                ctx.globalCompositeOperation = 'destination-over';

                // Color
                ctx.fillStyle = color[i];
                ctx.beginPath();
                ctx.moveTo(arrowX[0], arrowY[0]);
                ctx.lineTo(arrowX[1], arrowY[1]);
                ctx.lineTo(arrowX[2], arrowY[2]);
                ctx.lineTo(arrowX[3], arrowY[3]);
                ctx.lineTo(arrowX[4], arrowY[4]);
                ctx.fill();

                // Increase
                increase = (size * 0.126);
                arrowPoint = (size * 0.076);
            }

            // Cursor
            var cursor = 0;

            if (value <= limit[0]) {
                cursor = 0;
            } else if (value > limit[0] && value <= limit[1]) {
                cursor = increase;
            } else if (value > limit[1] && value <= limit[2]) {
                cursor = increase * 2;
            } else if (value > limit[2] && value <= limit[3]) {
                cursor = increase * 3;
            } else if (value > limit[3] && value <= limit[4]) {
                cursor = increase * 4;
            } else if (value > limit[4] && value <= limit[5]) {
                cursor = increase * 5;
            } else if (value > limit[5]) {
                cursor = increase * 6;
            } else {
                cursor = 0;
            }

            // Cursor coordinates
            var cursorX = [
                size, // Top right
                size, // Bottom right
                (size * 0.769), // Bottom left
                (size * 0.730), // Cursor point
                (size * 0.769)  // Top left
            ];
            var cursorY = [
                (size * 0.057) + cursor, // Top right
                (size * 0.173) + cursor, // Bottom right
                (size * 0.173) + cursor, // Bottom left
                (size * 0.115) + cursor, // Cursor point
                (size * 0.057) + cursor  // Top left
            ];

            // Outer black cursor
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(cursorX[0], cursorY[0]);
            ctx.lineTo(cursorX[1], cursorY[1]);
            ctx.lineTo(cursorX[2], cursorY[2]);
            ctx.lineTo(cursorX[3], cursorY[3]);
            ctx.lineTo(cursorX[4], cursorY[4]);
            ctx.fill();
            ctx.globalCompositeOperation = 'destination-out';

            // Inner white cursor
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.moveTo(cursorX[0] - (size * 0.019), cursorY[0] + (size * 0.019));
            ctx.lineTo(cursorX[1] - (size * 0.019), cursorY[1] - (size * 0.019));
            ctx.lineTo(cursorX[2] + (size * 0.011), cursorY[2] - (size * 0.019));
            ctx.lineTo(cursorX[3] + (size * 0.023), cursorY[3]);
            ctx.lineTo(cursorX[4] + (size * 0.011), cursorY[4] + (size * 0.019));
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';

            // Cursor text
            var valueX = cursorX[2] + (size * 0.038);
            var valueY = (size * 0.146) + cursor;
            ctx.font = letterFont;
            ctx.fillStyle = '#000';
            ctx.fillText(value, valueX, valueY);

            // Unit
            ctx.font = unitFont;
            ctx.fillText(unit, valueX - (size * 0.038), valueY + (size * 0.076));

        });

    };

}( jQuery ));