/**
 * Created by dhong on 3/14/2016.
 */
function PlayerHead(){
    playerModel :document.createElement('a-obj-model');
    var playerCamera = document.getElementById('actualCam');
    var playerCameraPos = playerCamera.getAttribute('position');
    var playerCount = 0;
}

var playerHeadInstances  = [];
var numPlayers = 0;
//var playerInstance = document.createElement("a-entity");
//document.getElementById("aFrameSync").appendChild(playerInstance);


AFRAME.registerComponent('player-model', {
    dependencies: ['material'],
    schema: {
        src: {default: '#trooper-head-obj'},
        mtl: {default: '#trooper-head-mtl'}
    },
    init: function(){
        playerHeadInstances.push(new PlayerHead);
        playerHeadInstances[numPlayers].playerModel.id = "playerHeadModel" + playerCount;
        playerHeadInstances[numPlayers].playerModel.setAttribute('src', this.data.src);
        playerHeadInstances[numPlayers].playerModel.setAttribute('mtl', this.data.mtl);
        playerHeadInstances[numPlayers].playerModel.setAttribute("position", playerCameraPos.x + " " + playerCameraPos.y + " " + playerCameraPos.z);
        playerHeadInstances[numPlayers].playerModel.setAttribute('scale', '0.075 0.075 0.075');
        numPlayers++;
        document.getElementById('actualCam').appendChild(playerModel);
    },
    update: function(){

    },
    tick: function(){
        document.getElementById('testHelm').setAttribute('rotation', playerCamera.getAttribute("rotation"));
        playerCameraPos = playerCamera.getAttribute('position');
        document.getElementById('testHelm').setAttribute("position", (playerCameraPos.x + 1) + " " + playerCameraPos.y + " " + (playerCameraPos.z + 1));
        //playerModel.setAttribute("position", (playerCameraPos.x + 1) + " " + playerCameraPos.y + " " + (playerCameraPos.z + 1));
        //playerModel.setAttribute('rotation', playerCamera.getAttribute("rotation"));
    }
});

function playerLoad(){
    console.log("Loading player");
    var playerInstance = document.createElement("a-entity");
    playerInstance.id = "playerInstance" + playerCount;
    playerCount++;
    playerInstance.setAttribute("player-model", "src:models/TrooperHead/st_pos3_head.obj");

//Add to scene when the player loads
    document.getElementById("aFrameSync").appendChild(playerInstance);
    console.log("Player loaded");
}
