var CanvasUtil = function(canvasId, isCenter, width, height) {

    // configuration
    var con = {
        id: canvasId,
        width: width, height: height, pointWidth: 2,
        translated: [false, 0, 0]
    };

    var customConfig = {};

    // create Canvas & get Context
    var canvas = document.getElementById(canvasId);
    canvas.width = con.width;
    canvas.height = con.height;
    var context = canvas.getContext('2d');
    if (isCenter) {
        context.translate(con.width / 2, con.height / 2);
        con.translated = [true, con.width / 2, con.height / 2];
    }

    // private function
    var getValue = function(obj, name) {
        if (name in obj) {
            return obj[name];
        } else if (name in customConfig) {
            return customConfig[name];
        } else {
            return null;
        }
    };

    return {
        //
        addEventListenerToCanvas: function(name, func) {
            canvas.addEventListener(name, func);
        },
        // cls
        clear: function() {
            context.clearRect(-1 * con.width, -1 * con.height, 2 * con.width, 2 * con.height);
        },
        // simple draw function
        draw: function(obj) {
            var type = getValue(obj, 'type');
            var location = getValue(obj, 'location');
            if ('rect' === type) {
                this.drawRect(location, obj.width, obj.height, obj.color);
            } else if ('text' === type) {
                var font = getValue(obj, 'font'),
                        fontColor = getValue(obj, 'fontColor'),
                        fontSize = getValue(obj, 'fontSize');
                this.drawText(location, obj.text, font, fontSize, fontColor);
            } else if ('circle' === type) {
                var radius = getValue(obj, 'radius'),
                        color = getValue(obj, 'color');
                this.drawCircle(location, radius, color);
            }
            return this;
        },
        // xy : [number, number]    // radius : number  // color : String
        drawCircle: function(xy, radius, color, stColor) {
            context.beginPath();
            context.arc(xy[0], xy[1], radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
            if ('undefined' !== typeof stColor) {
                context.strokeStyle = stColor;
                context.stroke();
            }
        },
        // xy : [number, number]    // color : String
        drawDot: function(xy, color) {
            this.drawRect(xy[0], xy[1], con.pointWidth, con.pointWidth, color);
        },
        // start, end : [number, number]    // width : number   // color : String
        // cap : String ; 'butt', 'round', 'square'. default is butt.
        drawLine: function(start, end, width, color, cap) {
            context.beginPath();
            context.moveTo(start[0], start[1]);
            context.lineTo(end[0], end[1]);
            context.lineWidth = width;
            context.strokeStyle = color;
            context.lineCap = cap;
            context.stroke();
        },
        // xy : [number, number]    // width, height : number   // color : String
        drawRect: function(xy, width, height, color) {
            context.fillStyle = color;
            context.fillRect(xy[0], xy[1], width, height);
        },
        // xy : [number, number]    // text, font, color : String   // size : Integer
        drawText: function(xy, text, font, size, color) {
            font = size + 'pt ' + font;
            context.font = font;
            context.fillStyle = color;
            context.fillText(text, xy[0], xy[1]);
        },
        //
        getMousePos: function(evt) {
            var rect = canvas.getBoundingClientRect();
            if (con.translated[0]) {
                return [evt.clientX - rect.left - con.translated[1], evt.clientY - rect.top - con.translated[2]];
            }
            return [evt.clientX - rect.left, evt.clientY - rect.top];
        },
        // getter
        getSize: function() {
            return [con.width, con.height];
        },
        getConfig: function(name) {
            return customConfig[name];
        },
        //
        setConfig: function(name, value) {
            customConfig[name] = value;
            return this;
        },
        // change center of canvas  // isCenter : boolean
        translate: function(isCenter, x, y) {
            if (isCenter) {
                x = con.width / 2;
                y = con.height / 2;
            }
            con.translated = [true, x, y];
            context.translate(x, y);
        },
        // pointsArr : [ [x1, y1], [x2, y2], ... , [xn, yn] ] ; 2D arrays.
        drawPolygon: function(pointsArr, width, color) {
            context.beginPath();
            context.moveTo(pointsArr[0][0], pointsArr[0][1]);
            for (var i = 1; i < pointsArr.length; i += 1) {
                context.lineTo(pointsArr[i][0], pointsArr[i][1]);
            }
            context.closePath();
            context.lineWidth = width;
            context.fillStyle = color;
            context.fill();
            context.strokeStyle = color;
            context.stroke();
        }
    };
};