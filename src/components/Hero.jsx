import { onMount, onCleanup } from 'solid-js';
import { initHeroCanvas } from '../lib/heroCanvas';
import styles from './Hero.module.css';

export default function Hero() {
    let canvasRef;

    onMount(() => {
        const cleanup = initHeroCanvas(canvasRef);
        onCleanup(cleanup);
    });

    return (
        <section id="hero" class={styles.hero}>
            <canvas ref={canvasRef} class={styles.canvas}></canvas>
            <div class={styles.overlay}></div>
            <div class={styles.content}>
                <p class={styles.tag}>Exclusive Private Villa · Koh Samui</p>
                <h1 class={styles.title}>Villa<br /><em>Maenam</em></h1>
                <p class={styles.desc}>
                    A sanctuary suspended between jungle and sea. Six pavilions, a private pool,
                    and the unhurried rhythm of island life — crafted for those who seek something beyond luxury.
                </p>
                <div class={styles.actions}>
                    <a href="#tour" class="btn-primary">Begin Tour</a>
                    <a href="#booking" class="btn-outline">Enquire</a>
                </div>
            </div>
            <div class={styles.scroll}>
                <div class={styles.scrollLine}></div>
                <span>Scroll</span>
            </div>
        </section>
    );
}
