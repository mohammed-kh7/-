const doller = document.getElementById('doller');
const shakel = document.getElementById('shakel');
const themeToggle = document.getElementById('themeToggle');
const exchangeRate = 3.5;

// تحميل الوضع المحفوظ
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// تبديل الوضع الداكن/الفاتح
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// تحويل من الدولار إلى الشيكل
doller.addEventListener('input', function() {
    if (doller.value === '') {
        shakel.value = '';
        return;
    }
    const result = (parseFloat(doller.value) * exchangeRate).toFixed(2);
    shakel.value = result;
    addPulseEffect(shakel);
});

// تحويل من الشيكل إلى الدولار
shakel.addEventListener('input', function() {
    if (shakel.value === '') {
        doller.value = '';
        return;
    }
    const result = (parseFloat(shakel.value) / exchangeRate).toFixed(2);
    doller.value = result;
    addPulseEffect(doller);
});

// إضافة تأثير نبضي عند التحديث
function addPulseEffect(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'pulse 0.3s ease';
    }, 10);
}

// إضافة تأثيرات CSS للنبض
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// التركيز التلقائي على حقل الدولار عند تحميل الصفحة
window.addEventListener('load', () => {
    doller.focus();
});