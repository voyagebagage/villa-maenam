import { onMount } from 'solid-js';
import { drawGallery } from '../lib/galleryCanvas';
import styles from './Gallery.module.css';

const galleryItems = [
    { id: 'gc1', label: 'Infinity Pool at Dusk' },
    { id: 'gc2', label: 'Master Suite' },
    { id: 'gc3', label: 'Tropical Garden' },
    { id: 'gc4', label: 'Dining Pavilion' },
    { id: 'gc5', label: 'Sunrise Terrace' },
];

export default function Gallery() {
    onMount(() => {
        drawGallery();
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
                {galleryItems.map((item) => (
                    <div class={`${styles.item} gallery-item`}>
                        <canvas id={item.id}></canvas>
                        <div class={styles.overlay}>
                            <p class={styles.label}>{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
