/**
 * Created by Daniel Thuan Hong on 2016-01-29.
 */

//Text monitor instance array

var instanceNum=-1;

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
        this.texture = new THREE.Texture(this.canvas);
        console.log("Number of textMonitor instances: " + instanceNum);
        console.log("Font size for this monitor: " + this.fontSize);
    },
    update: function(){

        this.texture = new THREE.Texture(this.canvas);
        this.material = new THREE.MeshBasicMaterial({
            color: this.data.color,
            side: THREE.DoubleSide,
            map: this.texture,
            opacity: "0.8",
            transparent:true
        });

        var geometry = new THREE.PlaneGeometry(this.data.width, this.data.height,
            this.data.widthSegments,this.data.heightSegments);
        this.plane = new THREE.Mesh(geometry, this.material);
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

        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(255,255,255,1)";
        this.ctx.fillRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(this.textSource, 25, this.canvas.height / 2);

        this.plane.material.map.image = this.canvas;
        this.plane.material.map.needsUpdate = true;
    }
});
