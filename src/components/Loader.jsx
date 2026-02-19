import { createSignal, onMount } from 'solid-js';
import styles from './Loader.module.css';

export default function Loader() {
    const [hidden, setHidden] = createSignal(false);

    onMount(() => {
        setTimeout(() => setHidden(true), 2600);
    });

    return (
        <div class={`${styles.loader} ${hidden() ? styles.hidden : ''}`}>
            <div class={styles.logo}>Villa Maenam</div>
            <div class={styles.sub}>Koh Samui · Thailand</div>
            <div class={styles.bar}>
                <div class={styles.progress}></div>
            </div>
        </div>
    );
}
