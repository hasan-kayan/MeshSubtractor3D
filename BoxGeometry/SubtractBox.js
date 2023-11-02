import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

export class Subtraction {
  

  subtract(boxA, boxB) {
    // Create meshes from the geometries
    const meshA = new THREE.Mesh(boxA); // Take first mesh
    const meshB = new THREE.Mesh(boxB); // Take second mesh 

    const theMaterial = meshA.material;
    // Convert THREE meshes into CSG (Sontructive Solid Geometry)
    const csgA = CSG.fromMesh(meshA); // MeshA converted into CSG 
    const csgB = CSG.fromMesh(meshB); // MeshB converted into CSG 

    // Perform the subtraction
    const csgSubtracted = csgA.subtract(csgB); // Subtract smaller mesh from the bigger one A-B 

    // Convert the CSG result back into a THREE.Mesh
    const resultGeometry = CSG.toMesh(csgSubtracted, meshA.matrix); // Result of the subtraction will be created by bigger mesh (A) so creating result geometry 
    const resultMesh = new THREE.Mesh(resultGeometry.geometry, theMaterial ); // creating result mesh by result geometry and default material 
    // ADD MATERIAL MANAGEMENT 

    // It's important to update the matrix in case there are any transformations
    resultMesh.updateMatrix();

    return resultMesh;
  }
}