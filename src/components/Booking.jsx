import styles from './Booking.module.css';

export default function Booking() {
    return (
        <section id="booking" class={styles.section}>
            <div class={styles.content}>
                <span class="section-tag" style={{ color: 'var(--gold)' }}>Reserve Your Stay</span>
                <h2 class={styles.title}>An Unforgettable <em>Escape</em></h2>
                <p class={styles.desc}>
                    Villa Maenam accommodates up to 12 guests across six suites.
                    Minimum stay of 4 nights. Rates from $3,200 per night including staff.
                </p>
                <div class={styles.form}>
                    <input type="text" class={styles.field} placeholder="Arrival Date" />
                    <input type="text" class={styles.field} placeholder="Departure Date" />
                    <input type="text" class={styles.field} placeholder="Number of Guests" />
                    <input type="email" class={styles.field} placeholder="Your Email" />
                </div>
                <button class={styles.submit}>Request Availability →</button>
            </div>
        </section>
    );
}
