import { onMount, onCleanup, createSignal, For } from 'solid-js';
import styles from './Amenities.module.css';

const amenities = [
    {
        icon: (
            <svg class={styles.icon} viewBox="0 0 52 52" fill="none">
                <path d="M26 8C16.06 8 8 16.06 8 26s8.06 18 18 18 18-8.06 18-18S35.94 8 26 8zm0 3a2 2 0 110 4 2 2 0 010-4zM14 20h24v2H14v-2zm0 6h24v2H14v-2zm4 6h16v2H18v-2z" fill="#C4903A" opacity=".7" />
            </svg>
        ),
        name: 'Infinity Pool',
        detail: 'An 18-metre infinity pool appears to merge with the Gulf of Thailand horizon, heated and lit for moonlit swims.',
    },
    {
        icon: (
            <svg class={styles.icon} viewBox="0 0 52 52" fill="none">
                <path d="M40 16H12a2 2 0 00-2 2v16a2 2 0 002 2h28a2 2 0 002-2V18a2 2 0 00-2-2zm-14 14a4 4 0 110-8 4 4 0 010 8z" fill="#6A9E8B" opacity=".8" />
                <path d="M26 8v6M26 38v6M8 26H14M38 26h6" stroke="#C4903A" stroke-width="1.5" />
            </svg>
        ),
        name: 'Thai Sala Dining',
        detail: 'Three open-air dining salas including a 12-seat banquet pavilion surrounded by lily ponds and jasmine walls.',
    },
    {
        icon: (
            <svg class={styles.icon} viewBox="0 0 52 52" fill="none">
                <rect x="10" y="10" width="32" height="32" rx="2" stroke="#C4903A" stroke-width="1.5" opacity=".7" />
                <path d="M18 26h16M18 20h16M18 32h10" stroke="#6A9E8B" stroke-width="1.5" />
            </svg>
        ),
        name: 'Six Master Suites',
        detail: 'Each suite is a private pavilion with four-poster beds, rain showers, and garden terraces overlooking the sea.',
    },
    {
        icon: (
            <svg class={styles.icon} viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="20" r="8" stroke="#C4903A" stroke-width="1.5" opacity=".7" />
                <path d="M14 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#6A9E8B" stroke-width="1.5" />
                <path d="M10 30l4-4M42 30l-4-4" stroke="#C4903A" stroke-width="1" opacity=".5" />
            </svg>
        ),
        name: 'Dedicated Staff',
        detail: 'A full villa team including private chef, butler, massage therapists, and concierge available around the clock.',
    },
    {
        icon: (
            <svg class={styles.icon} viewBox="0 0 52 52" fill="none">
                <path d="M26 10C17.16 10 10 17.16 10 26s7.16 16 16 16 16-7.16 16-16-7.16-16-16-16zm0 6l2 8h-4l2-8z" fill="#B85E3A" opacity=".6" />
                <circle cx="26" cy="32" r="3" fill="#C4903A" />
            </svg>
        ),
        name: 'Wellness & Spa',
        detail: 'A dedicated spa pavilion with traditional Thai massages, steam room, herbal baths, and sunset yoga deck.',
    },
    {
        icon: (
            <svg class={styles.icon} viewBox="0 0 52 52" fill="none">
                <path d="M10 36L26 16l16 20H10z" stroke="#C4903A" stroke-width="1.5" fill="none" opacity=".7" />
                <circle cx="32" cy="22" r="3" fill="#6A9E8B" opacity=".8" />
                <path d="M10 36h32" stroke="#C4903A" stroke-width="1.5" />
            </svg>
        ),
        name: 'Tropical Gardens',
        detail: '2.4 acres of manicured tropical gardens with orchid walks, Buddhist spirit houses, and ancient frangipani groves.',
    },
];

export default function Amenities() {
    const [visible, setVisible] = createSignal(false);
    let sectionRef;

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        observer.observe(sectionRef);
        onCleanup(() => observer.disconnect());
    });

    return (
        <section id="amenities" class={styles.section} ref={sectionRef}>
            <div class={styles.header}>
                <div>
                    <span class="section-tag">The Experience</span>
                    <h2 class="section-title">Beyond <em>Ordinary</em></h2>
                </div>
                <p class={styles.desc}>
                    Every detail of Villa Maenam has been conceived to dissolve the boundary
                    between interior and the lush world outside.
                </p>
            </div>
            <div class={styles.grid}>
                <For each={amenities}>
                    {(amenity) => (
                        <div class={`${styles.card} ${visible() ? styles.visible : ''}`}>
                            {amenity.icon}
                            <p class={styles.name}>{amenity.name}</p>
                            <p class={styles.detail}>{amenity.detail}</p>
                        </div>
                    )}
                </For>
            </div>
        </section>
    );
}
