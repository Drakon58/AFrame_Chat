/**
 * Created by dhong on 3/11/2016.
 */
var commands = document.getElementById("testTextInput");
var addEntity = document.getElementById("aFrameAdd");
var counter = 0;
var chatMode = false;


function finishTyping(e){
    if (e.keyCode == "13") {
        commands.value.replace(/(\r\n|\n|\r)/gm,"");
        document.getElementsByClassName('a-enter-vr-button')[0].blur();
        document.getElementById("testTextInput").blur();
        sceneHolder.setAttribute('keyboard-shortcuts', "enterVR: true");
        chatMode = false;
        document.getElementById('testTextInput').removeEventListener("keydown", finishTyping, false);
        document.getElementById('chatBox').setAttribute("visible","false");
        console.log("before spawn");
        if(commands.value == "box"){
            spawnCube();
            console.log("cube spawned");
        }
        else if(commands.value == "tree"){
            spawnDAETree();
            console.log("tree spawned");
        }
        else if(commands.value == "helm"){
            spawnHelm();
            console.log("helm spawned");
        }
        else if(commands.value =="helmPos"){
            console.log(document.getElementById('testHelm').getAttribute("rotation"));
        }
        document.addEventListener("keypress", moveUpDown, false);
        console.log(commands.value);
        console.log("Exit type mode");
    }
    e.stopPropagation();
}

function beginTyping(e){
    if (e.keyCode == "13") {
        commands.value.replace(/(\r\n|\n|\r)/gm,"");
        document.getElementsByClassName('a-enter-vr-button')[0].blur();
        if(chatMode == false) {
            //disable other controls
            sceneHolder.setAttribute('keyboard-shortcuts', 'enterVR: false');
            document.removeEventListener("keypress", moveUpDown, false);
            //clear
            document.getElementById('testTextInput').value = '';
            document.getElementById("testTextInput").focus();
            chatMode = true;
            //add listener for stopping type mode
            document.getElementById('testTextInput').addEventListener("keydown", finishTyping, false);
            document.getElementById('chatBox').setAttribute("visible","true");
            console.log(commands.value);
            console.log("Enter type mode");
        }
    }

}

function randWholeRange(x, y){
    return Math.floor(Math.random()*(y-x)) + x;
}

function spawnCube(){
    var toSpawn = document.createElement('a-entity');
    toSpawn.id='cubeSpawned' + counter;
    toSpawn.setAttribute('geometry','primitive: box');
    toSpawn.setAttribute('material','color: ' + randHexColor('#'));
    var coordHolder = randWholeRange(3, 10) + ' ' +  randWholeRange(3, 10) + ' ' + randWholeRange(3, 10);
    toSpawn.setAttribute('position', coordHolder);
    addEntity.appendChild(toSpawn);
    console.log('Cube spawned at ' + coordHolder);
}

function spawnHelm(){
    var toSpawn = document.createElement('a-obj-model');
    toSpawn.setAttribute('src','#trooper-head-obj');
    var coordHolder = randWholeRange(3, 10) + ' ' +  randWholeRange(3, 10) + ' ' + randWholeRange(3, 10);
    toSpawn.setAttribute('position', coordHolder);
    toSpawn.setAttribute('scale', '0.075 0.075 0.075');
    addEntity.appendChild(toSpawn);
    console.log('Helm spawned ' + coordHolder);
}

document.addEventListener("keydown", beginTyping, false);
document.getElementById("testTextInput").addEventListener("onfocus", function(){
    this.value="";
}, false);
