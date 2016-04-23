/**
 * Created by Daniel Thuan Hong on 2016-01-18.
 */

//collada(dae) loader
var loader = new THREE.ColladaLoader();

//get and set main camera
var actualCam = document.getElementById("actualCam");

//main cam position
var actualCamX = 0;
var actualCamY = 0;
var actualCamZ = -3;

//counters
var counter = 0;
var fruitCounter = 0;
var treeCounter = 0;

//var to hold object to spawn
var toSpawn;

//holders
var sceneHolder = document.getElementById('scene');
var syncHolder = document.getElementById('aFrameSync');

//coords and scale holders
var coordHolder;
var scaleHolder;

//Modes
var chatMode = false;

//set camera position
actualCam.setAttribute("position", actualCamX + ' ' + actualCamY + ' ' + actualCamZ);


//Randomizer functions
function randWholeRange(x, y){
    return Math.floor(Math.random()*(y-x)) + x;
}

function randRange(x, y){
    return Math.random()*(y-x) + x;
}

function randHexColor(lor){   return (lor +=
    [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
&& (lor.length == 7) ?  lor : randHexColor(lor); };

//Scene object spawn functions
function spawnDAETree(){
    var treeGirth = randRange(1, 3);
    var numFruits = randWholeRange(4, 15);
    var x=randRange(-10,10);
    var y=-0.5;
    var z=randRange(-10, 10);
    var scaleY = randWholeRange(1, 3);
    var treeModel;
    var thisTree
    treeCounter++;
    //bounding box for tree
    var box = new THREE.Box3();
    //tag tree ID
    toSpawn = document.createElement('a-entity');
    treeModel = document.createElement('a-model');
    toSpawn.id='treeSpawned' + treeCounter;
    //load model
    treeModel.setAttribute('src','models/tree1/tree1.dae');
    //place model
    coordHolder= x + ' ' +  y + ' ' + z;
    toSpawn.setAttribute('position', coordHolder);
    //size tree
    scaleHolder = treeGirth + ' ' + scaleY + ' ' + treeGirth;
    treeModel.setAttribute('scale',scaleHolder);
    //place tree container
    syncHolder.appendChild(toSpawn);
    //place tree in container
    thisTree = document.getElementById('treeSpawned' + treeCounter);
    thisTree.appendChild(treeModel);
    //place overall tree into synchronized element
    //Load tree model
    loader.load('models/tree1/tree1.dae',function( collada){
        box.setFromObject(collada.scene);
        console.log( "box min: ",box.min,"box max: ", box.max, "box size: ",box.size() );
        //place fruits
        for(var i = 0; i < numFruits; i++){
            spawnFruit(box.min, box.max, treeGirth, scaleY, treeGirth, thisTree);
        }
    });
    console.log('Tree spawned at ' + coordHolder);
}

function spawnFruit(min, max, scaleX, scaleY, scaleZ, tree){
    var fruitSize = randRange(0.1, 0.2);
    var sideSpawn = randWholeRange(0,3);
    if(sideSpawn == 0){
        coordHolder=randRange(min.x,max.x) * scaleX + ' '
            + randRange(((max.y/2) * scaleY) + (min.y ),max.y * scaleY) + ' '
            + min.z * scaleZ;
    }
    else if(sideSpawn == 1){
        coordHolder=randRange(min.x,max.x)* scaleX + ' '
            + randRange(((max.y/2) * scaleY) + (min.y ),max.y * scaleY) + ' '
            + max.z * scaleZ;
    }
    else if(sideSpawn == 2){
        coordHolder=min.x * scaleX + ' '
            + randRange(((max.y/2) * scaleY) + (min.y ),max.y * scaleY) + ' '
            + randRange(min.z,max.z) * scaleZ;
    }
    else{
        coordHolder=max.x * scaleX+ ' '
            + randRange(((max.y/2) * scaleY) + (min.y ),max.y * scaleY) + ' '
            + randRange(min.z,max.z) * scaleZ;
    }
    counter++;
    fruitCounter++;
    toSpawn = document.createElement('a-entity');
    toSpawn.setAttribute('geometry', 'primitive: sphere; radius:' + fruitSize );
    toSpawn.setAttribute('material', 'color: #A00' );
    toSpawn.id='fruitSpawned' + fruitCounter;
    toSpawn.setAttribute('position', coordHolder);
    tree.appendChild(toSpawn);
    console.log('Fruit spawned at ' + coordHolder);
}

//Keybinding handler functions



function moveUpDown(e) {

    if (e.charCode == "101") {
        coordHolder = actualCam.getAttribute("position").x + ' ' + (actualCam.getAttribute("position").y + 0.05) + ' ' + actualCam.getAttribute("position").z;
        actualCam.setAttribute("position", coordHolder);
    }
    if (e.charCode == "114") {
        coordHolder = actualCam.getAttribute("position").x + ' ' + (actualCam.getAttribute("position").y - 0.05) + ' ' + actualCam.getAttribute("position").z;
        actualCam.setAttribute("position", coordHolder);
    }
    //console.log(e.charCode);
}

//Assign Action listener vars

var spawnTreeAction = function () {
    this.setAttribute('material', 'color', randHexColor('#'));
    spawnDAETree();
    console.log(toSpawn.nodeName);
    console.log('I was clicked!');
};


//bind keys
document.addEventListener("keypress", moveUpDown, false);
document.addEventListener("click", function(){
    document.getElementsByClassName('a-enter-vr-button')[0].blur();
    if(chatMode){
        document.getElementById("testTextInput").focus();
    }
});
//bind action listeners

document.getElementById('spawnTreeButton').addEventListener('mousedown', spawnTreeAction);
