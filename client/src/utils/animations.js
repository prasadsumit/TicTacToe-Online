import confetti from 'canvas-confetti'

const startConfetti = () => {
    const duration = 3 * 1000 // 3 seconds
    const end = Date.now() + duration;

    (function frame() {
        const options = {
            particleCount: 10, // Small bursts
            startVelocity: 30, // Slow fall
            spread: 60, // Spread effect
            gravity: 0.8, // Make confetti fall down
        }

        confetti({ ...options, origin: { x: Math.random(), y: 0 } })

        if (Date.now() < end) {
            requestAnimationFrame(frame)
        }
    }())
}

export { startConfetti }
