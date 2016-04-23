/**
 * Created by dhong on 3/4/2016.
 */
var typingMode = false;
var chatBox = document.createElement('a-entity');
var chatBoxText;
var textSource;

//Onload



AFRAME.registerComponent('chatbox', {
    dependencies: ['material'],
    schema: {
        color: {default: '#AAF'},
        width: {default: 0.4},
        height: {default: 0.1},
        widthSegments: {default: 1},
        heightSegments: {default: 1},
        textInput: {default: 'default1234'},
        textAlignment: {default: 'center'},
        fontSize: {default: '40'}
    },
    init: function(){
        chatBox.id = "chatBox";
        chatBox.setAttribute("visible","false");
        chatBox.setAttribute("textmonitor","textInput:" + this.data.textInput +
            "; width: " + this.data.width +  "; height: " + this.data.height +
            "; textAlignment: " + this.data.textAlignment + "; fontSize: " + this.data.fontSize);
        chatBox.setAttribute("rotation" , "0 -30 0");
        chatBox.setAttribute("position" , (this.data.width/2 + 0.7) + " " + -(this.data.height * 1.2) + " -0.8");
        document.getElementById('actualCam').appendChild(chatBox);

    },
    update: function(){

        texture = new THREE.Texture(canvas);
        material = new THREE.MeshBasicMaterial({
            color: this.data.color,
            side: THREE.DoubleSide,
            map: texture
        });

        var geometry = new THREE.PlaneGeometry(this.data.width, this.data.length,
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

