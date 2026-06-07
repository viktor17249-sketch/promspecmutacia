// Реєструємо ScrollTrigger у GSAP
gsap.registerPlugin(ScrollTrigger);

// Кількість кадрів для scrollytelling
const frameCount = 102;

// Функція для отримання шляху до кадру за індексом (шукаємо в корені)
const currentFrame = index => `untitled_Kling First & Last Frame_2026-06-07_11-18-33_frame_${index.toString().padStart(3, '0')}.webp`;

// Масив для збереження завантажених зображень
const images = [];
let loadedCount = 0;

// Елементи інтерфейсу прелоадера
const loader = document.getElementById('loader');
const progressBar = document.getElementById('progress-bar');
const loaderPercent = document.getElementById('loader-percent');
const loaderStatus = document.getElementById('loader-status');

// Список кумедних статусів завантаження
const loadingStatuses = [
    "Ініціалізація генетичних протоколів...",
    "Аналіз сумісності ДНК клієнта з криптонітом...",
    "Вилучення гену ліні та додавання гену суперсили...",
    "Плетіння нано-костюму з рідкого золота...",
    "Калібрування лазерного погляду...",
    "Тестування системи автоматичного знаходження другої шкарпетки...",
    "Завантаження етикету для спілкування з королівськими особами...",
    "Налаштування блоку стійкості до дурних питань...",
    "Синхронізація квантового інтелекту...",
    "Перевірка відсутності плащів (привіт Едні Мод)...",
    "Матеріалізація величі майже завершена..."
];

// Canvas налаштування
const canvas = document.getElementById('scrollytelling-canvas');
const context = canvas.getContext('2d');

// Об'єкт для анімації кадру через GSAP
const heroSequence = { frame: 1 };

// Функція для запуску прелоадера
function preloadImages() {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            images[i - 1] = img;
            loadedCount++;
            
            // Розрахунок відсотка завантаження
            const percent = Math.round((loadedCount / frameCount) * 100);
            progressBar.style.width = `${percent}%`;
            loaderPercent.textContent = `${percent}%`;
            
            // Зміна кумедних статусів залежно від відсотка
            const statusIndex = Math.min(
                Math.floor((percent / 100) * loadingStatuses.length),
                loadingStatuses.length - 1
            );
            loaderStatus.textContent = loadingStatuses[statusIndex];
            
            // Коли всі кадри завантажені
            if (loadedCount === frameCount) {
                setTimeout(startSite, 500);
            }
        };
        img.onerror = () => {
            console.error(`Помилка завантаження кадру: ${currentFrame(i)}`);
            loadedCount++;
            if (loadedCount === frameCount) {
                setTimeout(startSite, 500);
            }
        };
    }
}

// Запуск сайту після передзавантаження
function startSite() {
    // Плавно ховаємо прелоадер
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflowY = 'auto'; // Дозволяємо скрол
    }, 800);

    // Ініціалізуємо перше креслення на Canvas
    resizeCanvas();
    renderFrame(1);
    
    // Запуск GSAP анімацій
    initScrollytelling();
    initOtherAnimations();
}

// Функція малювання кадру у режимі 'cover' (збереження пропорцій)
function renderFrame(frameIndex) {
    const img = images[frameIndex - 1];
    if (!img) return;

    const w = canvas.width;
    const h = canvas.height;
    
    // Логіка cover
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgRatio > canvasRatio) {
        // Зображення ширше ніж екран
        drawHeight = h;
        drawWidth = h * imgRatio;
        drawX = (w - drawWidth) / 2;
        drawY = 0;
    } else {
        // Зображення вище ніж екран
        drawWidth = w;
        drawHeight = w / imgRatio;
        drawX = 0;
        drawY = (h - drawHeight) / 2;
    }
    
    context.clearRect(0, 0, w, h);
    context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

// Функція адаптації canvas під розмір екрана
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(Math.round(heroSequence.frame));
}

// Слухач зміни розміру вікна
window.addEventListener('resize', resizeCanvas);

// Ініціалізація Scrollytelling
function initScrollytelling() {
    // Анімуємо індекс кадру від 1 до 102 залежно від скролу Hero секції
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-scroll",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // М'який скраб для плавності
            onUpdate: self => {
                // Викликаємо рендер кадру при оновленні значення
                renderFrame(Math.round(heroSequence.frame));
            }
        }
    });

    // Анімація кадрів (розтягуємо тривалість на 5 одиниць)
    tl.to(heroSequence, {
        frame: frameCount,
        ease: "none",
        duration: 5
    });

    const step1 = document.querySelector("#step-1");
    const step2 = document.querySelector("#step-2");
    const step3 = document.querySelector("#step-3");
    const step4 = document.querySelector("#step-4");

    // Плавна зміна та тривале утримання тексту на екрані
    // Крок 1 (вже активний) -> зникає пізніше (на 1.2 - 1.5)
    tl.to(step1, { opacity: 0, y: -30, duration: 0.3 }, 1.2);

    // Крок 2 -> з'являється на 1.4-1.7, зникає на 2.5-2.8
    tl.fromTo(step2, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 1.4);
    tl.to(step2, { opacity: 0, y: -30, duration: 0.3 }, 2.5);

    // Крок 3 -> з'являється на 2.7-3.0, зникає на 3.8-4.1
    tl.fromTo(step3, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 2.7);
    tl.to(step3, { opacity: 0, y: -30, duration: 0.3 }, 3.8);

    // Крок 4 -> з'являється на 4.0-4.3 і залишається активним до кінця
    tl.fromTo(step4, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 4.0);
}

// Інші GSAP анімації на сторінці
function initOtherAnimations() {
    // Анімація заголовків секцій при появі
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => {
        const header = sec.querySelector('.section-header');
        if (header) {
            gsap.from(header, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    });

    // Анімація карток у галереї (тільки плавний рух вгору, без зміни прозорості)
    gsap.from(".gallery-card", {
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 85%"
        }
    });

    // Анімація рядків процесу створення
    const rows = document.querySelectorAll('.process-step-row');
    rows.forEach(row => {
        const num = row.querySelector('.big-num');
        const content = row.querySelector('.step-content-col');
        const visual = row.querySelector('.step-visual-col');

        const rowTl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: "top 85%"
            }
        });

        rowTl.from(num, { opacity: 0, x: -30, duration: 0.5 })
             .from(content, { opacity: 0, y: 30, duration: 0.5 }, "-=0.3")
             .from(visual, { opacity: 0, scale: 0.8, duration: 0.5 }, "-=0.3");
    });
}

// Обробка мобільного меню
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');

if (mobileNavToggle && mobileMenu) {
    mobileNavToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        mobileNavToggle.classList.toggle('active');
        
        // Змінюємо вигляд гамбургера на хрестик
        const spans = mobileNavToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            document.body.style.overflowY = 'hidden'; // Забороняємо скрол
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflowY = 'auto'; // Дозволяємо скрол
        }
    });

    // Закриття меню при кліку на лінк
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const spans = mobileNavToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            document.body.style.overflowY = 'auto';
        });
    });
}

// Запуск прелоадингу при старті
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowY = 'hidden'; // Забороняємо скрол на час завантаження
    preloadImages();
});

// Логіка для Lightbox (перегляд зображень супергероїв)
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

if (lightbox && lightboxImg) {
    document.querySelectorAll('.card-img-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            const card = wrapper.closest('.gallery-card');
            const name = card.querySelector('h3').textContent;
            const className = card.querySelector('.card-class').textContent;

            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${name} — ${className}`;
            lightbox.classList.add('active');
            document.body.style.overflowY = 'hidden'; // Запобігаємо скролінгу фону
        });
    });

    // Закриття Lightbox при натисканні на будь-яке місце, крім самого зображення
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
            document.body.style.overflowY = 'auto'; // Відновлюємо скролінг
        }
    });
}
