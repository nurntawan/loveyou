const CORRECT_PIN = "100515"; // รหัสผ่าน
let currentPin = "";
let errorCount = 0;

const pins = document.querySelectorAll('.pin');
const keys = document.querySelectorAll('.key');
const submitBtn = document.querySelector('.action-btn');
const message = document.querySelector('.message');
const container = document.querySelector('.container');

const errorMessages = [
    "มั่วมาก! 🤔",
    "มั่วอีกแล้ว! 😅",
    "มั่วไปไหน? 🧐",
    "วันนี้คงไม่ได้ดู 😢",
    "จบบบ! 😭"
];

// ฟังก์ชันอัพเดทการแสดงผลจุด PIN
function updatePinDisplay() {
    pins.forEach((pin, index) => {
        pin.classList.toggle('filled', index < currentPin.length);
    });
    
    submitBtn.disabled = currentPin.length !== 6;
}

// ฟังก์ชันแสดงข้อความเตือนเมื่อกรอกผิด
function showError() {
    container.classList.add('shake');
    message.style.opacity = 0;
    
    setTimeout(() => {
        message.textContent = errorMessages[errorCount % errorMessages.length];
        message.style.opacity = 1;
        errorCount++;
    }, 300);

    setTimeout(() => {
        container.classList.remove('shake');
    }, 500);
}

// Event Listeners สำหรับปุ่มกด
keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.textContent;
        
        if (value === '←') {
            currentPin = currentPin.slice(0, -1);
        } else if (value === 'C') {
            currentPin = "";
        } else if (currentPin.length < 6) {
            currentPin += value;
        }

        updatePinDisplay();
    });
});

// Event Listener สำหรับปุ่มยืนยัน
submitBtn.addEventListener('click', () => {
    if (currentPin === CORRECT_PIN) {
        window.location.href = "home.html";
    } else {
        showError();
        currentPin = "";
        updatePinDisplay();
    }
});

// Event Listener สำหรับการกด Enter
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && currentPin.length === 6) {
        submitBtn.click();
    }
});

// Event Listener สำหรับการใช้แป้นพิมพ์
document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
        currentPin = currentPin.slice(0, -1);
        updatePinDisplay();
    } else if (e.key === 'Escape') {
        currentPin = "";
        updatePinDisplay();
    } else if (/^[0-9]$/.test(e.key) && currentPin.length < 6) {
        currentPin += e.key;
        updatePinDisplay();
    }
});