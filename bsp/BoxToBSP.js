import * as THREE from "three";


// Define a plane using a point and a normal.
class Plane {
    constructor(point, normal) {
        this.point = point;
        this.normal = normal;
    }
}

// Define a node in the BSP tree.
class BSPNode {
    constructor(plane, front = null, back = null) {
        this.plane = plane;
        this.front = front; // Front child node
        this.back = back;   // Back child node
    }
}

/**
 * Convert a ThreeJS BoxGeometry mesh to a BSP tree.
 * @param {THREE.Mesh} boxMesh - The box mesh to be converted.
 * @returns {BSPNode} - The root node of the BSP tree.
 */
function boxToBSP(boxMesh) {
    // Assumes the box is centered at the origin.
    // For a more general solution, you'd need to compute the vertices of the box mesh.

    const halfExtents = [
        boxMesh.geometry.parameters.width / 2,
        boxMesh.geometry.parameters.height / 2,
        boxMesh.geometry.parameters.depth / 2
    ];

    const planes = [
        new Plane(new THREE.Vector3(halfExtents[0], 0, 0), new THREE.Vector3(1, 0, 0)),   // +X face
        new Plane(new THREE.Vector3(-halfExtents[0], 0, 0), new THREE.Vector3(-1, 0, 0)), // -X face
        new Plane(new THREE.Vector3(0, halfExtents[1], 0), new THREE.Vector3(0, 1, 0)),   // +Y face
        new Plane(new THREE.Vector3(0, -halfExtents[1], 0), new THREE.Vector3(0, -1, 0)), // -Y face
        new Plane(new THREE.Vector3(0, 0, halfExtents[2]), new THREE.Vector3(0, 0, 1)),   // +Z face
        new Plane(new THREE.Vector3(0, 0, -halfExtents[2]), new THREE.Vector3(0, 0, -1))  // -Z face
    ];

    // For simplicity, the root node will be one of the planes. 
    // In a more intricate solution, you'd want to build a complete BSP tree.
    return new BSPNode(planes[0]);
}

export { boxToBSP };
