import { onMount, For } from 'solid-js';
import { drawGallery } from '../lib/galleryCanvas';
import styles from './Gallery.module.css';

const galleryItems = [
    { label: 'Infinity Pool at Dusk' },
    { label: 'Master Suite' },
    { label: 'Tropical Garden' },
    { label: 'Dining Pavilion' },
    { label: 'Sunrise Terrace' },
];

export default function Gallery() {
    const canvasRefs = [];

    onMount(() => {
        drawGallery(canvasRefs);
    });

    return (
        <section id="gallery" class={styles.section}>
            <div class={styles.header}>
                <span class="section-tag" style={{ color: 'var(--gold)' }}>Visual Journey</span>
                <h2 class="section-title" style={{ color: 'var(--ivory)' }}>
                    Spaces That <em style={{ color: 'var(--gold)' }}>Breathe</em>
                </h2>
            </div>
            <div class={styles.grid}>
                <For each={galleryItems}>
                    {(item, i) => (
                        <div class={`${styles.item} gallery-item`}>
                            <canvas ref={(el) => (canvasRefs[i()] = el)}></canvas>
                            <div class={styles.overlay}>
                                <p class={styles.label}>{item.label}</p>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </section>
    );
}
