/**
 * Created by dhong on 3/4/2016.
 */
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
        this.chatBox = document.createElement('a-entity');
        this.chatBox.id = "chatBox";
        this.chatBox.setAttribute("visible","false");
        this.chatBox.setAttribute("textmonitor","textInput:" + this.data.textInput +
            "; width: " + this.data.width +  "; height: " + this.data.height +
            "; textAlignment: " + this.data.textAlignment + "; fontSize: " + this.data.fontSize);
        this.chatBox.setAttribute("rotation" , "0 -30 0");
        this.chatBox.setAttribute("position" , (this.data.width/2 + 0.7) + " " + -(this.data.height * 1.2) + " -0.8");
        document.getElementById('actualCam').appendChild(this.chatBox);
    }
});

