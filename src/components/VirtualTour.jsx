import { createSignal, onMount, onCleanup, For } from 'solid-js';
import { rooms, initPanorama } from '../lib/panorama';
import styles from './VirtualTour.module.css';

export default function VirtualTour() {
    let canvasRef;
    const [currentRoom, setCurrentRoom] = createSignal(0);
    const [isTransitioning, setIsTransitioning] = createSignal(false);
    let panoramaApi = null;

    onMount(() => {
        panoramaApi = initPanorama(canvasRef, currentRoom, setCurrentRoom);
        onCleanup(() => panoramaApi?.cleanup());
    });

    function navigateToRoom(index) {
        if (index === currentRoom() || isTransitioning()) return;
        setIsTransitioning(true);

        setTimeout(() => {
            setCurrentRoom(index);
            panoramaApi?.navigateToRoom(index);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
        }, 400);
    }

    return (
        <section id="tour" class={styles.tour}>
            <canvas ref={canvasRef} class={styles.canvas}></canvas>

            <div class={`${styles.transitionOverlay} ${isTransitioning() ? styles.active : ''}`}></div>

            <div class={styles.header}>
                <div>
                    <p class={styles.sectionLabel}>360° Virtual Tour</p>
                    <div class={styles.titleBlock}><h2>Explore the Villa</h2></div>
                </div>
                <div class={styles.hint}>
                    <div class={styles.hintIcon}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="8" stroke="rgba(196,144,58,0.6)" stroke-width="1" />
                            <path d="M5 9h8M9 5l4 4-4 4" stroke="rgba(196,144,58,0.8)" stroke-width="1" fill="none" />
                        </svg>
                    </div>
                    <span>Drag to explore</span>
                </div>
            </div>

            <div class={styles.compass}>
                <div class={styles.compassInner}>
                    <span class={styles.compassN}>N</span>
                </div>
            </div>

            <div class={styles.roomInfo}>
                <div class={`${styles.roomNameBlock} ${isTransitioning() ? styles.changing : ''}`}>
                    <p class={styles.roomNum}>{rooms[currentRoom()].num}</p>
                    <h3 class={styles.roomName}>{rooms[currentRoom()].name}</h3>
                    <p class={styles.roomDesc}>{rooms[currentRoom()].desc}</p>
                </div>
                <div class={styles.roomNav}>
                    <For each={rooms}>
                        {(room, i) => (
                            <button
                                class={`${styles.dotBtn} room-dot-btn ${i() === currentRoom() ? styles.active : ''}`}
                                onClick={() => navigateToRoom(i())}
                            >
                                <span class={styles.dotLine}></span>
                                <span class={styles.dot}></span>
                                <span style={{ opacity: i() === currentRoom() ? 1 : 0.5 }}>
                                    {room.name.split(' ')[0]}
                                </span>
                            </button>
                        )}
                    </For>
                </div>
            </div>
        </section>
    );
}
