const month = 11;
const day = 3;

function updateCountdown() {
    const now = new Date();
    let birthday = new Date(now.getFullYear(), month - 1, day);

    if (birthday <= now) {
        birthday.setFullYear(now.getFullYear() + 1);
    }

    const difference = birthday - now;

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor(difference / 3600000) % 24;
    const minutes = Math.floor(difference / 60000) % 60;
    const seconds = Math.floor(difference / 1000) % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);