/**
 * Created by doooby on 14.10.14.
 */

//THREE.Ray.prototype.vectorAtZ = function(z) {
//    var t;
//    t = (z - this.origin.z) / this.direction.z;
//    return new THREE.Vector3(
//            this.origin.x + t * this.direction.x,
//            this.origin.y + t * this.direction.y,
//        z
//    );
//};
//
//THREE.Ray.pickingRay = function(canvas, mouse_ev) {
//    var dir, x, y;
//    x = mouse_ev.clientX - canvas.container.offsetLeft;
//    y = mouse_ev.clientY - canvas.container.offsetTop;
//    x = 2 * (x / canvas.container.clientWidth) - 1;
//    y = -2 * (y / canvas.container.clientHeight) + 1;
//    dir = new THREE.Vector3(x, y, 0);
//    return (new THREE.Projector()).pickingRay(dir, canvas.camera);
//};
