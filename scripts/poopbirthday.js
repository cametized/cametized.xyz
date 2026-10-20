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

async function checkPassword() {
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");
    const secret = document.getElementById("secret");

    const encrypted = "kbWwkzyQFPwvxNQoIb1L10/ZsGhn4EdHwHrflMZzprTmTJRUXtYPbYeBU6TaQGz59tmpy/iMFcioA8795U1/DN/Cv+SM1WuxVnw7eXmR7kUddx50pB8CTt6mH9n7uRRxyeBgPhDCI5xs3r5XitA9myCmjHPDPyUp+U2kvM0mrqmGHzmXFcXGtqIfqnp6ZMGtIjZqXexsPNVfFgK097M8jNe4wp4ARKIBV0qv+4vWlMaEpbSXgjBwIOJgOFNaWJCtl1vw6JtnsBR/JjdsSfy9X9BB8JNkcqPc1Q9Dr2MpY7kO"; // replace this with the youtube link when you can lol

    try {
        const bytes = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
        const salt = bytes.slice(0, 16);
        const iv = bytes.slice(16, 28);
        const data = bytes.slice(28);

        const keyMaterial = await crypto.subtle.importKey(
            "raw", new TextEncoder().encode(password),
            "PBKDF2", false, ["deriveKey"]
        );

        const key = await crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false, ["decrypt"]
        );

        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv }, key, data
        );

        secret.textContent = new TextDecoder().decode(decrypted);
        secret.style.display = "block";
        error.textContent = "";
    } catch {
        secret.style.display = "none";
        error.textContent = "you aren't epicg and i know this cause you don't know the password. if you are epicg, please contact me to get the password on your birthday.";
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);