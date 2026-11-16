// Navigation Handling
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            switchSection(targetId);
        });
    });

    // Checklist persistence
    const checkboxes = document.querySelectorAll('#daily-checklist input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const id = cb.getAttribute('data-id');
        const savedState = localStorage.getItem(`sst_check_${id}`);
        if (savedState === 'true') {
            cb.checked = true;
        }

        cb.addEventListener('change', () => {
            localStorage.setItem(`sst_check_${id}`, cb.checked);
        });
    });

    // Modal Handling for Capsule Cards
    const capsuleCards = document.querySelectorAll('.capsule-card');
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');

    const modalContentData = {
        'modal-riesgo-biologico': `
            <h2 style="color: var(--accent-red); margin-bottom: 15px;"><i class="fa-solid fa-biohazard"></i> Guía Visual: Riesgo Biológico</h2>
            <p><strong>¿Qué es?</strong> Posibilidad de sufrir afectación en la salud por contacto con microorganismos o materiales contaminados.</p>
            <h4 style="margin-top: 15px; color: var(--primary-color);">Vías de Ingreso:</h4>
            <p style="font-size: 0.9rem; margin-bottom: 10px;">Respiratoria, percutánea, mucosa y piel no intacta.</p>
            <h4 style="margin-top: 15px; color: #D97706;"><i class="fa-solid fa-triangle-exclamation"></i> ¿Qué hacer ante una exposición?</h4>
            <ol style="margin: 10px 0 20px 20px; font-size: 0.9rem; display: flex; flex-direction: column; gap: 6px;">
                <li>Suspende la actividad de inmediato.</li>
                <li>Realiza primeros cuidados (lavado con agua y jabón).</li>
                <li>Informa a tu jefe inmediato y a SST.</li>
                <li>Acude al servicio de salud para valoración.</li>
                <li>Reporta el evento formalmente.</li>
            </ol>
            <button class="btn-primary" onclick="switchSection('riesgo-biologico'); closeModalWindow();">Ver Guía Completa</button>
        `,
        'modal-epp': `
            <h2 style="color: var(--primary-color); margin-bottom: 15px;"><i class="fa-solid fa-shield-halved"></i> Elementos de Protección Personal (EPP)</h2>
            <p><strong>Cápsula Informativa SST:</strong> Los EPP son tu primera línea de defensa contra riesgos laborales. Deben usarse de manera correcta y según el protocolo de cada área.</p>
            <ul style="margin: 15px 0 20px 20px; display: flex; flex-direction: column; gap: 10px;">
                <li>Verifica el estado de tus EPP antes de iniciar la jornada.</li>
                <li>Realiza la disposición final de EPP descartables en el contenedor correspondiente.</li>
                <li>Solicita reposición oportuna ante cualquier deterioro.</li>
            </ul>
            <button class="btn-primary" onclick="closeModalWindow()">Entendido</button>
        `,
        'modal-bioseguridad': `
            <h2 style="color: var(--accent-green); margin-bottom: 15px;"><i class="fa-solid fa-hands-bubbles"></i> Bioseguridad</h2>
            <p><strong>Cápsula Informativa SST:</strong> La bioseguridad es un compromiso colectivo para prevenir infecciones asociadas a la atención en salud (IAAS).</p>
            <ul style="margin: 15px 0 20px 20px; display: flex; flex-direction: column; gap: 10px;">
                <li>Aplica los 5 momentos de la higiene de manos de la OMS.</li>
                <li>Mantén las áreas de trabajo limpias y desinfectadas.</li>
                <li>Respeta la señalización de aislamiento de pacientes.</li>
            </ul>
            <button class="btn-primary" onclick="closeModalWindow()">Entendido</button>
        `,
        'modal-plan': `
            <h2 style="color: var(--accent-purple); margin-bottom: 15px;"><i class="fa-solid fa-clipboard-medical"></i> Plan Hospitalario de Gestión del Riesgo</h2>
            <p><strong>Cápsula Informativa SST:</strong> Estar preparados nos permite responder eficazmente ante situaciones de emergencia y desastres.</p>
            <ul style="margin: 15px 0 20px 20px; display: flex; flex-direction: column; gap: 10px;">
                <li>Conoce las rutas de evacuación de tu servicio.</li>
                <li>Identifica los extintores y puntos de encuentro.</li>
                <li>Participa activamente en los simulacros institucionales.</li>
            </ul>
            <button class="btn-primary" onclick="closeModalWindow()">Entendido</button>
        `,
        'modal-pve': `
            <h2 style="color: var(--accent-cyan); margin-bottom: 15px;"><i class="fa-solid fa-wave-square"></i> PVE Vigilancia Epidemiológica</h2>
            <p><strong>Cápsula Informativa SST:</strong> Los Programas de Vigilancia Epidemiológica monitorean y previenen afectaciones a la salud de los trabajadores.</p>
            <ul style="margin: 15px 0 20px 20px; display: flex; flex-direction: column; gap: 10px;">
                <li>Participa en las evaluaciones de puestos de trabajo.</li>
                <li>Reporta síntomas osteomusculares o de estrés oportunamente.</li>
                <li>Asiste a los exámenes médicos ocupacionales periódicos.</li>
            </ul>
            <button class="btn-primary" onclick="closeModalWindow()">Entendido</button>
        `,
        'modal-pausas': `
            <h2 style="color: var(--accent-orange); margin-bottom: 15px;"><i class="fa-solid fa-person-running"></i> Pausas Activas</h2>
            <p><strong>Cápsula Informativa SST:</strong> Dedicar unos minutos al día para estirar y relajar los músculos previene lesiones y mejora la concentración.</p>
            <ul style="margin: 15px 0 20px 20px; display: flex; flex-direction: column; gap: 10px;">
                <li>Realiza estiramientos de cuello, hombros y manos cada 2 horas.</li>
                <li>Cambia de postura si permaneces mucho tiempo de pie o sentado.</li>
            </ul>
            <button class="btn-primary" onclick="switchSection('pausas-activas'); closeModalWindow();">Ir al Temporizador</button>
        `
    };

    capsuleCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalKey = card.getAttribute('data-modal');
            if (modalContentData[modalKey]) {
                modalBody.innerHTML = modalContentData[modalKey];
                modalContainer.classList.remove('hidden');
            }
        });
    });

    closeModal.addEventListener('click', closeModalWindow);
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModalWindow();
        }
    });

    // Quiz Form Submission
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const q1 = quizForm.querySelector('input[name="q1"]:checked');
            const q2 = quizForm.querySelector('input[name="q2"]:checked');
            const resultDiv = document.getElementById('quiz-result');

            if (!q1 || !q2) {
                resultDiv.className = 'quiz-result warning';
                resultDiv.textContent = 'Por favor responde todas las preguntas antes de calificar.';
                resultDiv.classList.remove('hidden');
                return;
            }

            let score = 0;
            if (q1.value === 'b') score++;
            if (q2.value === 'b') score++;

            resultDiv.classList.remove('hidden');
            if (score === 2) {
                resultDiv.className = 'quiz-result success';
                resultDiv.textContent = '¡Excelente! Obtuviste 2/2 respuestas correctas. ¡Tienes un gran conocimiento en SST!';
            } else {
                resultDiv.className = 'quiz-result warning';
                resultDiv.textContent = `Obtuviste ${score}/2 respuestas correctas. Te invitamos a revisar las cápsulas informativas.`;
            }
        });
    }

    // Satisfaction Form & Stars
    const stars = document.querySelectorAll('.rating-stars i');
    const selectedRatingInput = document.getElementById('selected-rating');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            selectedRatingInput.value = rating;
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.className = 'fa-solid fa-star';
                } else {
                    s.className = 'fa-regular fa-star';
                }
            });
        });
    });

    const satisfactionForm = document.getElementById('satisfaction-form');
    if (satisfactionForm) {
        satisfactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const satResult = document.getElementById('satisfaction-result');
            satResult.classList.remove('hidden');
            satisfactionForm.reset();
            setTimeout(() => {
                satResult.classList.add('hidden');
            }, 4000);
        });
    }

    // Timer Logic for Pausas Activas
    let timerInterval;
    let totalSeconds = 180; // 3 minutes
    const timerDisplay = document.getElementById('timer-display');
    const startTimerBtn = document.getElementById('start-timer');
    const pauseTimerBtn = document.getElementById('pause-timer');
    const resetTimerBtn = document.getElementById('reset-timer');

    function updateTimerDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    if (startTimerBtn) {
        startTimerBtn.addEventListener('click', () => {
            if (timerInterval) return;
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert('¡Pausa activa finalizada! Has completado tus 3 minutos de bienestar.');
                }
            }, 1000);
        });

        pauseTimerBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
        });

        resetTimerBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            totalSeconds = 180;
            updateTimerDisplay();
        });
    }
});

function switchSection(targetId) {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        if (item.getAttribute('data-target') === targetId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    sections.forEach(sec => {
        if (sec.id === targetId) {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function closeModalWindow() {
    document.getElementById('modal-container').classList.add('hidden');
}
