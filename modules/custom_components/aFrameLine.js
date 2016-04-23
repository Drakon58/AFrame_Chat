/**
 * Created by Daniel Thuan Hong on 2016-01-29.
 */
AFRAME.registerComponent('line', {
    dependencies: ['material'],
    schema: {
        color: {default: '#000'},
        length: {default: 1},
        thickness: {default: 1}
    },
    update: function(){
        var material = new THREE.LineBasicMaterial({
            color: this.data.color,
            linewidth: this.data.thickness
        });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(0,0,-this.data.length/2),
            new THREE.Vector3(0,0,this.data.length/2)
        );

        var line = new THREE.Line(geometry, material);
        this.el.object3D.add(line);
    }
});