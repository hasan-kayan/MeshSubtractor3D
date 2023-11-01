/**
 * Subtract a BSP tree from another.
 * @param {BSPNode} bspA - The BSP tree from which bspB will be subtracted.
 * @param {BSPNode} bspB - The BSP tree to subtract from bspA.
 * @returns {BSPNode} - The root node of the resulting BSP tree after subtraction.
 */
function subtractBSPs(bspA, bspB) {
    if (!bspA) return null;
    if (!bspB) return bspA;

    // Split the current node of bspA by the plane of the current node of bspB.
    const [frontA, backA] = splitBSP(bspA, bspB.plane);

    // Subtract the front and back parts with the rest of bspB tree.
    const newFront = subtractBSPs(frontA, bspB.front);
    const newBack = subtractBSPs(backA, bspB.back);

    return new BSPNode(bspA.plane, newFront, newBack);
}

/**
 * Split a BSP tree using a dividing plane.
 * @param {BSPNode} bsp - The BSP tree to split.
 * @param {Plane} plane - The dividing plane.
 * @returns {Array} - A pair [front, back], representing the front and back parts of the tree after splitting.
 */
function splitBSP(bsp, plane) {
    if (!bsp) return [null, null];

    const planeOnPlane = planeVsPlane(bsp.plane, plane);

    if (planeOnPlane > 0) {
        const [front, back] = splitBSP(bsp.front, plane);
        return [new BSPNode(bsp.plane, front, back), null];
    } else if (planeOnPlane < 0) {
        const [front, back] = splitBSP(bsp.back, plane);
        return [null, new BSPNode(bsp.plane, front, back)];
    } else {
        // Coplanar case; ideally, you'd handle this more intricately.
        return [null, null];
    }
}

/**
 * Determine the position of a plane with respect to another plane.
 * @param {Plane} a - The first plane.
 * @param {Plane} b - The second plane.
 * @returns {number} - Positive if plane A is in front of plane B, negative if behind, 0 if coplanar.
 */
function planeVsPlane(a, b) {
    // This is a very basic check based on the dot product of the normals.
    // For a more accurate check, you'd also consider the positions of the planes.
    return a.normal.dot(b.normal);
}

export { subtractBSPs };
