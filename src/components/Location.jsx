import { onMount } from 'solid-js';
import { drawMapCanvas } from '../lib/mapCanvas';
import styles from './Location.module.css';

export default function Location() {
    let mapCanvasRef;

    onMount(() => {
        drawMapCanvas(mapCanvasRef);
    });

    return (
        <section id="location" class={styles.section}>
            <div class={styles.text}>
                <span class="section-tag" style={{ color: 'var(--gold-pale)' }}>Location</span>
                <h2 class="section-title" style={{ color: 'var(--ivory)' }}>
                    Maenam<br /><em style={{ color: 'var(--gold)' }}>Beach</em>
                </h2>
                <p class={styles.detail}>
                    Villa Maenam sits on the quiet north shore of Koh Samui — away from the crowds,
                    yet minutes from the island's finest restaurants, temples, and the celebrated
                    Big Buddha of Ang Thong. The international airport is 25 minutes by car.
                </p>
                <a href="#booking" class="btn-primary">Arrange Transfer</a>
            </div>
            <div class={styles.map}>
                <canvas ref={mapCanvasRef}></canvas>
                <div class={styles.pin}>
                    <div class={styles.pinDot}></div>
                    <div class={styles.pinLine}></div>
                    <div class={styles.pinLabel}>Villa Maenam</div>
                </div>
            </div>
        </section>
    );
}
