import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer class={styles.footer}>
            <div class={styles.grid}>
                <div>
                    <div class={styles.brand}>Villa Maenam</div>
                    <p class={styles.tagline}>
                        A private sanctuary on the tranquil north shore of Koh Samui,
                        where Thai elegance meets the timeless rhythm of the sea.
                    </p>
                </div>
                <div class={styles.col}>
                    <h4>Explore</h4>
                    <ul>
                        <li>The Villa</li>
                        <li>Suites</li>
                        <li>Pool & Spa</li>
                        <li>Dining</li>
                        <li>Experiences</li>
                    </ul>
                </div>
                <div class={styles.col}>
                    <h4>Plan</h4>
                    <ul>
                        <li>Availability</li>
                        <li>Rates</li>
                        <li>Getting Here</li>
                        <li>Local Guide</li>
                        <li>Events</li>
                    </ul>
                </div>
                <div class={styles.col}>
                    <h4>Contact</h4>
                    <ul>
                        <li>+66 77 123 456</li>
                        <li>stay@villamaenam.com</li>
                        <li>Instagram</li>
                        <li>WhatsApp</li>
                    </ul>
                </div>
            </div>
            <div class={styles.bottom}>
                <span>© 2025 Villa Maenam. All rights reserved.</span>
                <span>Koh Samui, Surat Thani 84330, Thailand</span>
            </div>
        </footer>
    );
}
