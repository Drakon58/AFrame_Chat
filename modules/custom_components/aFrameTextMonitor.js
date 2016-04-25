/**
 * Created by Daniel Thuan Hong on 2016-01-29.
 */

//Text monitor instance array

var instanceNum=-1;
/*
Valid positions for text origin alignment are:
topleft    topcenter    topright
centerleft    center    centerright
bottomleft    bottomcenter    bottomright
 */
function TextOriginSettings(){

    var textXOffset = 0;
    var textYOffset = 0;
}

TextOriginSettings.prototype.calcOriginPoint = function(context, textStartPos, text){
    if(textStartPos == 'topleft'){
        this.textXOffset = 0;
        this.textYOffset = context.canvas.height - parseInt(context.font);
    }else  if(textStartPos == 'topcenter'){
        this.textXOffset = context.canvas.width/2;
        this.textYOffset = context.canvas.height - parseInt(context.font);
    }else  if(textStartPos == 'topright') {
        this.textXOffset = context.canvas.width - context.measureText(text).width;
        this.textYOffset = context.canvas.height - parseInt(context.font);
    }else  if(textStartPos == 'centerleft'){
        this.textXOffset = 0;
        this.textYOffset = context.canvas.height/2;
    }else  if(textStartPos == 'center'){
        this.textXOffset = context.canvas.width/2;
        this.textYOffset = context.canvas.height/2;
    }else if(textStartPos == 'centerright'){
        this.textXOffset = context.canvas.width - context.measureText(text).width;
        this.textYOffset = context.canvas.height/2;
    }else if(textStartPos == 'bottomleft') {
        this.textXOffset = 0;
        this.textYOffset = parseInt(context.font)/2;
    }else if(textStartPos == 'bottomcenter') {
        this.textXOffset = context.canvas.width/2;
        this.textYOffset = parseInt(context.font)/2;
    }else if(textStartPos == 'bottomright') {
        this.textXOffset = context.canvas.width - context.measureText(text).width;
        this.textYOffset = parseInt(context.font)/2;
    }
    else{
        console.log(textStartPos + " is not a valid origin alignment in the canvas. Using middleleft as default.")
        this.textXOffset = 0;
        this.textYOffset = context.canvas.height/2;
    }
};

AFRAME.registerComponent('textmonitor', {
    dependencies: ['material'],
    schema: {
        color: {default: '#AAF'},
        width: {default: 1},
        height: {default: 1},
        widthSegments: {default: 1},
        heightSegments: {default: 1},
        textInput: {default: 'default1234'},
        textAlignment: {default: 'center'},
        fontSize: {default: 40},
        textStartPos: {default: 'centerleft'},
        textXOffset: {default:0},
        textYOffset: {default:0},
        opacity: {default:1.0}
    },
    init: function(){
        instanceNum++;
        this.canvas = document.createElement('canvas');
        this.canvas.id = "textMonitorCanvas" + instanceNum;
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.canvas.width = 2048;
        this.ctx.canvas.height= 512;
        //text settings
        this.textAlignment = this.data.textAlignment;
        this.fontSize = this.data.fontSize;
        this.ctx.textAlign = this.textAlignment;
        this.ctx.font = this.fontSize + 'pt Arial';
        this.textStartPos = this.data.textStartPos;
        //offsets and origins
        this.textXOffset = this.data.textXOffset;
        this.textYOffset = this.data.textYOffset;
        this.textOriginSettings = new TextOriginSettings();


        this.texture = new THREE.Texture(this.canvas);

        console.log("Number of textMonitor instances: " + instanceNum);
        console.log("Font size for this monitor: " + this.fontSize);
        console.log("Alignment is : " + this.textAlignment);
    },
    update: function(){

        this.texture = new THREE.Texture(this.canvas);
        this.material = new THREE.MeshPhongMaterial({
            color: this.data.color,
            side: THREE.DoubleSide,
            map: this.texture,
            opacity: this.data.opacity,
            transparent:true
        });

        var geometry = new THREE.PlaneGeometry(this.data.width, this.data.height,
            this.data.widthSegments,this.data.heightSegments);
        this.plane = new THREE.Mesh(geometry, this.material);
        this.plane.name = "textMonitorCanvas" + instanceNum;
        this.el.object3D.add(this.plane);

    },
    tick: function(){
        if(this.data.textInput == 'default1234'){
            this.textSource = new Date().getTime();
        }
        else{
            this.textSource = document.getElementById(this.data.textInput.toString());
            if(this.textSource.nodeName == "TEXTAREA"){
                this.textSource = document.getElementById(this.data.textInput.toString()).value;
            }
            else{
                this.textSource = document.getElementById(this.data.textInput.toString()).innerHTML;
            }
        }

        this.textOriginSettings.calcOriginPoint(this.ctx, this.textStartPos, this.textSource);

        this.ctx.fillStyle = "rgba(255,255,255,1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.textSource, this.textXOffset + this.textOriginSettings.textXOffset,
            this.textYOffset + this.textOriginSettings.textYOffset);

        this.plane.material.map.image = this.canvas;
        this.plane.material.map.needsUpdate = true;
    }
});
