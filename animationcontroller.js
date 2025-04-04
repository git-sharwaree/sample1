import { gsap } from 'gsap';

export class AnimationController {
    constructor(cube, scene) {
        this.cube = cube;
        this.scene = scene;
        this.isAnimating = false;
        this.isExploded = false;
        this.timeline = gsap.timeline();
    }

    explode() {
        if (this.isAnimating || this.isExploded) return;
        this.isAnimating = true;

        // Remove main cube
        this.scene.remove(this.cube.cube);

        // Add fragments
        const fragments = this.cube.fragments;
        fragments.forEach(fragment => {
            this.scene.add(fragment);
        });

        // Explosion animation
        this.timeline.to(fragments.map(f => f.position), {
            duration: 1.2,
            x: (i) => {
                const fragment = fragments[i];
                return fragment.originalPosition.x * 3 + (Math.random() - 0.5) * 4;
            },
            y: (i) => {
                const fragment = fragments[i];
                return fragment.originalPosition.y * 3 + (Math.random() - 0.5) * 4;
            },
            z: (i) => {
                const fragment = fragments[i];
                return fragment.originalPosition.z * 3 + (Math.random() - 0.5) * 4;
            },
            ease: "power2.out",
            stagger: {
                amount: 0.4,
                from: "center",
                grid: "auto"
            }
        });

        // Add rotation to fragments
        this.timeline.to(fragments.map(f => f.rotation), {
            duration: 1.2,
            x: () => Math.random() * Math.PI * 4,
            y: () => Math.random() * Math.PI * 4,
            z: () => Math.random() * Math.PI * 4,
            ease: "power1.inOut",
            stagger: {
                amount: 0.4,
                from: "random"
            }
        }, "-=1.2");

        this.timeline.then(() => {
            this.isAnimating = false;
            this.isExploded = true;
        });
    }

    reform() {
        if (this.isAnimating || !this.isExploded) return;
        this.isAnimating = true;

        const fragments = this.cube.fragments;

        // Reform animation
        this.timeline.to(fragments.map(f => f.position), {
            duration: 1.5,
            x: (i) => fragments[i].originalPosition.x,
            y: (i) => fragments[i].originalPosition.y,
            z: (i) => fragments[i].originalPosition.z,
            ease: "elastic.out(1, 0.7)",
            stagger: {
                amount: 0.6,
                from: "edges"
            }
        });

        // Reset rotations
        this.timeline.to(fragments.map(f => f.rotation), {
            duration: 1,
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.inOut",
            stagger: {
                amount: 0.4,
                from: "center"
            }
        }, "-=1.3");

        this.timeline.then(() => {
            // Cleanup and reset
            fragments.forEach(fragment => {
                this.scene.remove(fragment);
            });
            this.scene.add(this.cube.cube);
            this.cube.resetFragments();
            this.isAnimating = false;
            this.isExploded = false;
        });
    }
}