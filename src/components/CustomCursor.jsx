import { onMount, onCleanup } from 'solid-js';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    let cursorRef, ringRef;

    onMount(() => {
        const onMove = (e) => {
            cursorRef.style.left = e.clientX + 'px';
            cursorRef.style.top = e.clientY + 'px';
            setTimeout(() => {
                ringRef.style.left = e.clientX + 'px';
                ringRef.style.top = e.clientY + 'px';
            }, 50);
        };

        const addHover = () => document.body.classList.add('hovering');
        const removeHover = () => document.body.classList.remove('hovering');
        const addClick = () => document.body.classList.add('clicking');
        const removeClick = () => document.body.classList.remove('clicking');

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mousedown', addClick);
        document.addEventListener('mouseup', removeClick);

        // Observe DOM for hoverable elements
        const attachHoverListeners = () => {
            document.querySelectorAll('a, button, .room-dot-btn, .gallery-item').forEach(el => {
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        };

        // Attach initially and on DOM changes
        attachHoverListeners();
        const observer = new MutationObserver(attachHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        onCleanup(() => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mousedown', addClick);
            document.removeEventListener('mouseup', removeClick);
            observer.disconnect();
        });
    });

    return (
        <>
            <div id="cursor" class={styles.cursor} ref={cursorRef}></div>
            <div id="cursor-ring" class={styles.cursorRing} ref={ringRef}></div>
        </>
    );
}
