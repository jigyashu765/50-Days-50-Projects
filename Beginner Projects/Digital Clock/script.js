function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = now.toLocaleDateString(undefined, options);

    document.getElementById('clock').textContent = currentTime;
    document.getElementById('date').textContent = currentDate;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();
