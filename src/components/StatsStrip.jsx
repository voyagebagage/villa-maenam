import { onMount, onCleanup, createSignal, For } from 'solid-js';
import styles from './StatsStrip.module.css';

const stats = [
    { num: '6', label: 'Bedroom Suites' },
    { num: '18', label: 'Metres Pool Length' },
    { num: '2.4', label: 'Acres of Gardens' },
    { num: '∞', label: 'Sea Views' },
];

export default function StatsStrip() {
    const [visible, setVisible] = createSignal(false);
    let stripRef;

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        observer.observe(stripRef);
        onCleanup(() => observer.disconnect());
    });

    return (
        <div class={styles.strip} ref={stripRef}>
            <For each={stats}>
                {(stat) => (
                    <div class={`${styles.item} ${visible() ? styles.visible : ''}`}>
                        <span class={styles.num}>{stat.num}</span>
                        <span class={styles.label}>{stat.label}</span>
                    </div>
                )}
            </For>
        </div>
    );
}
