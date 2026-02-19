import { createSignal, onMount, onCleanup } from 'solid-js';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = createSignal(false);

    onMount(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll);
        onCleanup(() => window.removeEventListener('scroll', onScroll));
    });

    return (
        <nav class={`${styles.nav} ${scrolled() ? styles.scrolled : ''}`}>
            <a href="#" class={styles.brand}>Villa Maenam</a>
            <ul class={styles.links}>
                <li><a href="#tour">Virtual Tour</a></li>
                <li><a href="#amenities">Amenities</a></li>
                <li><a href="#location">Location</a></li>
                <li><a href="#booking">Enquire</a></li>
            </ul>
            <a href="#booking" class={styles.cta}>Book Now</a>
        </nav>
    );
}
