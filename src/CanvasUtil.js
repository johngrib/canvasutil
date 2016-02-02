var CanvasUtil = function(canvasId, isCenter, width, height) {

    // configuration
    var con = {
        id: canvasId,
        width: 600, height: 600, pointWidth: 2,
        translated: [false, 0, 0]
    };

    // get Context
    var canvas = document.getElementById(canvasId);
    canvas.width = con.width;
    canvas.height = con.height;
    var context = canvas.getContext('2d');
    if (isCenter) {
        context.translate(con.width / 2, con.height / 2);
    }
    return {
        // cls
        clear: function() {
            context.clearRect(-1 * con.width, -1 * con.height, 2 * con.width, 2 * con.height);
        },
        // xy : [number, number]    // radius : number  // color : String
        drawCircle: function(xy, radius, color) {
            context.beginPath();
            context.arc(xy[0], xy[1], radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
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