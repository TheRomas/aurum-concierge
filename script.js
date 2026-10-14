/**
 * AURUM CONCIERGE - Interactive Website Logic
 * Handles booking simulator, WhatsApp message formatting, UI transitions, and accordions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Set today's date in pickup date input by default
    const pickupDateInput = document.getElementById('pickupDate');
    if (pickupDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        pickupDateInput.value = `${yyyy}-${mm}-${dd}`;
        pickupDateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    // Navbar Scrolled State
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('open');
        });
    });

    // Booking Tabs switching
    const bookingTabs = document.querySelectorAll('.booking-tab');
    const pickupLocation = document.getElementById('pickupLocation');
    const dropoffLocation = document.getElementById('dropoffLocation');

    bookingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            bookingTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const serviceType = tab.dataset.serviceType;
            if (serviceType === 'aeroporto') {
                pickupLocation.placeholder = 'Ex: Aeroporto GRU, Congonhas, Hotel...';
                dropoffLocation.placeholder = 'Ex: Hotel Fasano, Residência, Paulista...';
            } else if (serviceType === 'diaria') {
                pickupLocation.placeholder = 'Ponto de Partida / Hotel inicial';
                dropoffLocation.placeholder = 'Diária à disposição (Itinerário livre em SP)';
            } else if (serviceType === 'viagem') {
                pickupLocation.placeholder = 'Cidade de Origem (Ex: São Paulo)';
                dropoffLocation.placeholder = 'Cidade de Destino (Ex: Campos do Jordão, Litoral, Campinas)';
            } else if (serviceType === 'concierge') {
                pickupLocation.placeholder = 'Seu local de hospedagem ou partida';
                dropoffLocation.placeholder = 'Roteiro Gastronômico, Compras VIP ou Apoio Estudantil';
            }
        });
    });

    // Quick Presets Dropdowns
    const btnQuickPickup = document.getElementById('btnQuickPickup');
    const quickPickupMenu = document.getElementById('quickPickupMenu');
    const btnQuickDropoff = document.getElementById('btnQuickDropoff');
    const quickDropoffMenu = document.getElementById('quickDropoffMenu');

    btnQuickPickup?.addEventListener('click', (e) => {
        e.stopPropagation();
        quickPickupMenu?.classList.toggle('show');
        quickDropoffMenu?.classList.remove('show');
    });

    btnQuickDropoff?.addEventListener('click', (e) => {
        e.stopPropagation();
        quickDropoffMenu?.classList.toggle('show');
        quickPickupMenu?.classList.remove('show');
    });

    document.addEventListener('click', () => {
        quickPickupMenu?.classList.remove('show');
        quickDropoffMenu?.classList.remove('show');
    });

    quickPickupMenu?.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            if (pickupLocation) pickupLocation.value = item.getAttribute('data-val') || item.textContent;
            quickPickupMenu.classList.remove('show');
        });
    });

    quickDropoffMenu?.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            if (dropoffLocation) dropoffLocation.value = item.getAttribute('data-val') || item.textContent;
            quickDropoffMenu.classList.remove('show');
        });
    });

    // Steppers (Passengers and Luggage)
    const stepButtons = document.querySelectorAll('.step-btn');
    stepButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const stepType = btn.dataset.step;
            const action = btn.dataset.action;
            const inputEl = document.getElementById(`${stepType}Count`);
            const displayEl = document.getElementById(`${stepType}CountDisplay`);

            if (inputEl && displayEl) {
                let val = parseInt(inputEl.value, 10) || 1;
                if (action === 'increase') {
                    if (val < 15) val++;
                } else if (action === 'decrease') {
                    if (val > (stepType === 'passengers' ? 1 : 0)) val--;
                }
                inputEl.value = val;
                displayEl.textContent = val;
            }
        });
    });

    // Booking Form Submit -> Format WhatsApp Message
    const bookingForm = document.getElementById('bookingForm');
    bookingForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const activeTab = document.querySelector('.booking-tab.active');
        const serviceName = activeTab ? activeTab.textContent.trim() : 'Transporte Executivo';
        const origin = document.getElementById('pickupLocation')?.value || 'A combinar';
        const destination = document.getElementById('dropoffLocation')?.value || 'A combinar';
        const date = document.getElementById('pickupDate')?.value || 'Data a combinar';
        const time = document.getElementById('pickupTime')?.value || 'Horário a combinar';
        const vehicle = document.getElementById('vehicleType')?.value || 'Padrão';
        const passengers = document.getElementById('passengerCount')?.value || '1';
        const luggage = document.getElementById('luggageCount')?.value || '0';
        const femaleChauffeur = document.getElementById('femaleChauffeur')?.checked ? 'Sim (Preferência por Motorista Mulher)' : 'Sem preferência';
        const bilingualDriver = document.getElementById('bilingualDriver')?.checked ? 'Sim (Inglês)' : 'Não necessário';

        // Format Date to BR (DD/MM/YYYY)
        let formattedDate = date;
        if (date && date.includes('-')) {
            const [y, m, d] = date.split('-');
            formattedDate = `${d}/${m}/${y}`;
        }

        const message = `*SOLICITAÇÃO DE RESERVA / COTAÇÃO - AURUM CONCIERGE*\n\n` +
            `✨ *Tipo de Serviço:* ${serviceName}\n` +
            `📍 *Origem:* ${origin}\n` +
            `🎯 *Destino:* ${destination}\n` +
            `📅 *Data:* ${formattedDate} às ${time}\n` +
            `🚘 *Veículo Escolhido:* ${vehicle}\n` +
            `👥 *Passageiros:* ${passengers}\n` +
            `🧳 *Malas:* ${luggage}\n` +
            `👩 *Motorista Feminina:* ${femaleChauffeur}\n` +
            `🌐 *Motorista Bilingue:* ${bilingualDriver}\n\n` +
            `_Enviado pelo site aurumconcierge.com.br_`;

        const whatsappUrl = `https://wa.me/5511917277184?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
