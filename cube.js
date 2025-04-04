import * as THREE from 'three';

export class Cube {
    constructor() {
        // Main cube
        this.geometry = new THREE.BoxGeometry(2, 2, 2);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            shininess: 30,
            specular: 0x444444
        });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.fragments = [];
        
        // Pre-create fragments
        this.createFragments();
    }

    createFragments() {
        if (this.fragments.length > 0) {
            return this.fragments;
        }

        const gridSize = 3; // 3x3x3 grid = 27 pieces
        const cubeSize = 2; // Total cube size
        const pieceSize = cubeSize / gridSize;
        const offset = cubeSize / 2 - pieceSize / 2;

        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                for (let z = 0; z < gridSize; z++) {
                    const geometry = new THREE.BoxGeometry(
                        pieceSize * 0.95,
                        pieceSize * 0.95,
                        pieceSize * 0.95
                    );

                    const material = new THREE.MeshPhongMaterial({
                        color: 0x00ff00,
                        shininess: 30,
                        specular: 0x444444
                    });

                    const fragment = new THREE.Mesh(geometry, material);
                    
                    // Calculate position
                    const xPos = (x * pieceSize - offset);
                    const yPos = (y * pieceSize - offset);
                    const zPos = (z * pieceSize - offset);

                    fragment.originalPosition = {
                        x: xPos,
                        y: yPos,
                        z: zPos
                    };

                    fragment.position.set(xPos, yPos, zPos);
                    this.fragments.push(fragment);
                }
            }
        }

        return this.fragments;
    }

    resetFragments() {
        this.fragments.forEach(fragment => {
            const { x, y, z } = fragment.originalPosition;
            fragment.position.set(x, y, z);
            fragment.rotation.set(0, 0, 0);
        });
    }
}