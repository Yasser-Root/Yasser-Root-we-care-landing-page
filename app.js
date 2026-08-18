/**
 * WE CARE - Interactive Landing Page Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initDownloadModal();
    initLiveClock();
    initScrollAnimations();
});

/* ==========================================================================
   Download Modal Management
   ========================================================================== */
function initDownloadModal() {
    const modal = document.getElementById('downloadModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const triggerBtns = [
        document.getElementById('headerDownloadBtn'),
        document.getElementById('footerDownloadBtn'),
        ...document.querySelectorAll('.store-badge')
    ];

    triggerBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                    // Allow direct link navigation to external app store
                    return;
                }
                e.preventDefault();
                openModal();
            });
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function openModal() {
        if (modal) modal.classList.add('active');
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }
}

/* ==========================================================================
   Live Demo Portal States
   ========================================================================== */
const demoStates = {
    pickup: {
        status: '<i class="fa-solid fa-shield-check"></i> Safe on Bus',
        statusClass: 'status-tag safe',
        speed: '42 km/h',
        eta: '08:24 AM (9 mins)',
        busPos: '35%',
        toastText: 'Adam boarded Bus #24 at 08:14 AM. Bus is moving towards school.'
    },
    arrived: {
        status: '<i class="fa-solid fa-graduation-cap"></i> Arrived at School',
        statusClass: 'status-tag safe',
        speed: '0 km/h',
        eta: 'Arrived at 08:25 AM',
        busPos: '85%',
        toastText: 'Adam safely checked into Greenwood School at 08:25 AM.'
    },
    dropoff: {
        status: '<i class="fa-solid fa-house"></i> Dropped Off at Home',
        statusClass: 'status-tag safe',
        speed: '38 km/h',
        eta: '02:45 PM (In transit)',
        busPos: '60%',
        toastText: 'Bus #24 has left school. Estimated home arrival: 02:45 PM.'
    }
};

function setDemoState(stateKey) {
    const data = demoStates[stateKey];
    if (!data) return;

    // Update active chip
    document.querySelectorAll('.demo-chip').forEach(chip => chip.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Update portal UI
    const statusBadge = document.getElementById('childStatusBadge');
    const busSpeed = document.getElementById('busSpeed');
    const busETA = document.getElementById('busETA');
    const busIcon = document.getElementById('animatedBus');

    if (statusBadge) {
        statusBadge.innerHTML = data.status;
    }
    if (busSpeed) busSpeed.textContent = data.speed;
    if (busETA) busETA.textContent = data.eta;
    if (busIcon) busIcon.style.left = data.busPos;

    triggerToastNotification(data.toastText);
}

/* ==========================================================================
   Feature Previews & Toast Notifications
   ========================================================================== */
function triggerWatchDemo() {
    triggerToastNotification("Live Camera Stream: Sarah is sitting safely in Seat 4B.");
}

function toggleBusSimulator() {
    const busBadgeText = document.getElementById('busStatusText');
    const speeds = ['35 km/h', '48 km/h', '40 km/h', '32 km/h'];
    const currentSpeed = speeds[Math.floor(Math.random() * speeds.length)];
    
    if (busBadgeText) {
        busBadgeText.textContent = `Bus #24 En Route • ${currentSpeed} (ETA: 3 mins)`;
    }

    triggerToastNotification(`GPS Refreshed: Bus position updated in real-time (${currentSpeed}).`);
}

function triggerNotificationDemo() {
    const notifications = [
        "Notification Sent: Bus #24 is 2 minutes away from your pickup point.",
        "Notification Sent: Sarah has safely entered the school gate.",
        "Notification Sent: Bus #24 evening route started. Tap to view live map."
    ];
    const randomMsg = notifications[Math.floor(Math.random() * notifications.length)];
    triggerToastNotification(randomMsg);
}

function triggerToastNotification(message) {
    const toast = document.getElementById('demoToast');
    if (!toast) return;

    const body = toast.querySelector('.toast-body');
    if (body) body.textContent = message;

    toast.style.transform = 'scale(1.08)';
    toast.style.borderColor = '#44bb2b';
    
    setTimeout(() => {
        toast.style.transform = 'scale(1)';
    }, 400);
}

/* ==========================================================================
   Live Clock Helper
   ========================================================================== */
function initLiveClock() {
    const clock = document.getElementById('liveClock');
    if (!clock) return;

    function update() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        clock.textContent = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }

    update();
    setInterval(update, 30000);
}

/* ==========================================================================
   Scroll Intersection Observer for Smooth Fade-In
   ========================================================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}
