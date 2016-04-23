/**
 * Created by Daniel Thuan Hong on 2016-01-29.
 */

function TextMonitor(ctx, canvas){
    this.texture = texture;
    this.ctx = ctx;
    this.canvas = canvas;
    this.plane = plane;
    this.material = material;
};

//Text monitor instance array
var monitorArray = [];

var texture;
var ctx;
var canvas;
var plane;
var material;
var textSource;
var instanceNum=-1;
var textAlignment;
var fontSize;

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
        fontSize: {default: 40}
    },
    init: function(){

        instanceNum++;
        canvas = document.createElement('canvas');
        canvas.id = "textMonitorCanvas" + instanceNum;
        document.body.insertBefore(canvas, document.body.firstChild);
        ctx = canvas.getContext('2d');
        ctx.canvas.width = 2048;
        ctx.canvas.height= 512;
        //text settings
        textAlignment = this.data.textAlignment;
        fontSize = this.data.fontSize;
        ctx.textAlign = textAlignment;
        ctx.font = fontSize + 'pt Arial';
        texture = new THREE.Texture(canvas);
        monitorArray.push(new TextMonitor(ctx, canvas, this.data.textAlignment, this.data.fontSize, this.data.textInput));
        console.log("Number of textMonitor instances: " + instanceNum);
        console.log("Font size for this monitor: " + fontSize);
    },
    update: function(){

        texture = new THREE.Texture(canvas);
        material = new THREE.MeshBasicMaterial({
            color: this.data.color,
            side: THREE.DoubleSide,
            map: texture,
            opacity: "0.8",
            transparent:true
        });

        var geometry = new THREE.PlaneGeometry(this.data.width, this.data.height,
            this.data.widthSegments,this.data.lengthSegments);
        plane = new THREE.Mesh(geometry, material);
        this.el.object3D.add(plane);


    },
    tick: function(){
        if(this.data.textInput == 'default1234'){
            textSource = new Date().getTime();
        }
        else{
            textSource = document.getElementById(this.data.textInput.toString());
            if(textSource.nodeName == "TEXTAREA"){
                textSource = document.getElementById(this.data.textInput.toString()).value;
            }
            else{
                textSource = document.getElementById(this.data.textInput.toString()).innerHTML;
            }
        }
        changeCanvas();
        plane.material.map.image = canvas;
        plane.material.map.needsUpdate = true;
    }
});

function changeCanvas() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.textBaseline = "middle";
    ctx.fillText(textSource, 25, canvas.height / 2);
}
