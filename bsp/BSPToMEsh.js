import * as THREE from 'three';

/**
 * Convert a BSP tree back to a ThreeJS mesh.
 * @param {BSPNode} bspRoot - The root node of the BSP tree.
 * @returns {THREE.Mesh} - The resulting mesh.
 */
function bspToMesh(bspRoot) {
    const geometry = new THREE.Geometry();

    traverseBSP(bspRoot, node => {
        const plane = node.plane;
        const polygon = planeToPolygon(plane);

        // Convert polygon to triangle vertices and faces.
        const vertices = polygonToVertices(polygon);
        geometry.vertices.push(...vertices);

        const face = new THREE.Face3(geometry.vertices.length - 3, geometry.vertices.length - 2, geometry.vertices.length - 1);
        geometry.faces.push(face);
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // Example material
    return new THREE.Mesh(geometry, material);
}

/**
 * Traverse the BSP tree and execute a callback for each node.
 * @param {BSPNode} node - Current node.
 * @param {Function} callback - Callback function.
 */
function traverseBSP(node, callback) {
    if (!node) return;
    callback(node);
    traverseBSP(node.front, callback);
    traverseBSP(node.back, callback);
}

/**
 * Convert a plane to a polygon (quadrilateral for our box faces).
 * This is a stub function for our simplified scenario.
 * @param {Plane} plane - The plane.
 * @returns {Array} - An array of vertex positions forming a polygon.
 */
function planeToPolygon(plane) {
    // This is a very simplified representation. 
    // In a more detailed solution, you'd need to compute the intersection of the plane with 
    // the surrounding bounding box to get the polygon vertices.
    return [
        new THREE.Vector3(-1, -1, 0),  // Placeholder vertices for a unit quad
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(-1, 1, 0)
    ];
}

/**
 * Convert a polygon (quadrilateral) to triangle vertices.
 * This function assumes the polygon is convex and planar.
 * @param {Array} polygon - An array of vertex positions.
 * @returns {Array} - An array of triangle vertices.
 */
function polygonToVertices(polygon) {
    // Triangulate the polygon (quadrilateral) into two triangles.
    return [polygon[0], polygon[1], polygon[2], polygon[0], polygon[2], polygon[3]];
}

export { bspToMesh };
