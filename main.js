import * as THREE from 'three';
import { boxToBSP } from './bsp/BoxToBSP'
import { subtractBSPs } from './bsp/Subtract';
import { bspToMesh } from './bsp/BSPToMEsh';

/**
 * Subtract one BoxGeometry mesh from another.
 * @param {THREE.Mesh} meshA - The mesh from which meshB will be subtracted.
 * @param {THREE.Mesh} meshB - The mesh to subtract from meshA.
 * @returns {THREE.Mesh} - The resulting mesh after subtraction.
 */
function subtractMeshes(meshA, meshB) {
    // Convert meshes to BSP trees.
    const bspA = boxToBSP(meshA);
    const bspB = boxToBSP(meshB);

    // Subtract the BSP trees.
    const resultBSP = subtractBSPs(bspA, bspB);

    // Convert the resulting BSP tree back to a mesh.
    return bspToMesh(resultBSP);
}

export { subtractMeshes };
