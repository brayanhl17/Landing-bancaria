const btnBars = document.querySelector('.btn-bars');
const nav = document.querySelector('header nav');
const body = document.body;

// Crear overlay para el menú móvil
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

btnBars.addEventListener('click', () => {
	nav.classList.toggle('active');
	overlay.classList.toggle('active');
	body.classList.toggle('no-scroll');
	
	// Cambiar icono
	const icon = btnBars.querySelector('i');
	if (nav.classList.contains('active')) {
		icon.classList.remove('fa-bars-staggered');
		icon.classList.add('fa-times');
	} else {
		icon.classList.remove('fa-times');
		icon.classList.add('fa-bars-staggered');
	}
});

// Cerrar menú al hacer clic en overlay
overlay.addEventListener('click', () => {
	nav.classList.remove('active');
	overlay.classList.remove('active');
	body.classList.remove('no-scroll');
	const icon = btnBars.querySelector('i');
	icon.classList.remove('fa-times');
	icon.classList.add('fa-bars-staggered');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('header nav a');
navLinks.forEach(link => {
	link.addEventListener('click', () => {
		if (window.innerWidth <= 1024) {
			nav.classList.remove('active');
			overlay.classList.remove('active');
			body.classList.remove('no-scroll');
			const icon = btnBars.querySelector('i');
			icon.classList.remove('fa-times');
			icon.classList.add('fa-bars-staggered');
		}
	});
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
	const question = item.querySelector('.faq-question');
	const toggle = item.querySelector('.faq-toggle');
	
	question.addEventListener('click', () => {
		const isActive = item.classList.contains('active');
		
		// Cerrar todos los FAQs
		faqItems.forEach(faq => {
			faq.classList.remove('active');
			const icon = faq.querySelector('.faq-toggle i');
			icon.classList.remove('fa-times');
			icon.classList.add('fa-plus');
		});
		
		// Abrir el clickeado si estaba cerrado
		if (!isActive) {
			item.classList.add('active');
			const icon = toggle.querySelector('i');
			icon.classList.remove('fa-plus');
			icon.classList.add('fa-times');
		}
	});
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (href !== '#') {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	});
});


const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate-in');
		}
	});
}, observerOptions);


const animateElements = document.querySelectorAll(
	'.container-card, .faq-item, .testimonial-card, .side-left, .side-right, .container-images img'
);

animateElements.forEach(el => {
	el.classList.add('animate-element');
	observer.observe(el);
});


const testimonialTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
const dotsContainer = document.querySelector('.testimonial-dots');

if (testimonialTrack && testimonialCards.length > 0) {
	let currentIndex = 0;
	const totalCards = testimonialCards.length;
	
	// Crear dots
	for (let i = 0; i < totalCards; i++) {
		const dot = document.createElement('button');
		dot.classList.add('testimonial-dot');
		dot.setAttribute('aria-label', `Ir a testimonio ${i + 1}`);
		if (i === 0) dot.classList.add('active');
		dot.addEventListener('click', () => goToSlide(i));
		dotsContainer.appendChild(dot);
	}
	
	const dots = document.querySelectorAll('.testimonial-dot');
	
	function updateCarousel() {
		const cardWidth = testimonialCards[0].offsetWidth;
		const gap = 30;
		const offset = (cardWidth + gap) * currentIndex;
		
		testimonialTrack.style.transform = `translateX(-${offset}px)`;
		
		// Actualizar dots
		dots.forEach((dot, index) => {
			dot.classList.toggle('active', index === currentIndex);
		});
		
		// Actualizar botones
		prevBtn.disabled = currentIndex === 0;
		nextBtn.disabled = currentIndex === totalCards - 1;
	}
	
	function goToSlide(index) {
		currentIndex = Math.max(0, Math.min(index, totalCards - 1));
		updateCarousel();
	}
	
	function nextSlide() {
		if (currentIndex < totalCards - 1) {
			currentIndex++;
			updateCarousel();
		}
	}
	
	function prevSlide() {
		if (currentIndex > 0) {
			currentIndex--;
			updateCarousel();
		}
	}
	
	prevBtn.addEventListener('click', prevSlide);
	nextBtn.addEventListener('click', nextSlide);
	
	// Auto-play (opcional)
	let autoplayInterval = setInterval(nextSlide, 5000);
	
	// Pausar autoplay al interactuar
	const testimonialSection = document.querySelector('.section-testimonials');
	testimonialSection.addEventListener('mouseenter', () => {
		clearInterval(autoplayInterval);
	});
	
	testimonialSection.addEventListener('mouseleave', () => {
		autoplayInterval = setInterval(nextSlide, 5000);
	});
	
	// Responsive: actualizar al cambiar tamaño
	window.addEventListener('resize', updateCarousel);
	
	// Inicializar
	updateCarousel();
}


let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;
	
	if (currentScroll > 100) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
	
	lastScroll = currentScroll;
});


const newsletterForm = document.querySelector('footer form');

if (newsletterForm) {
	newsletterForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const emailInput = newsletterForm.querySelector('input[type="email"]');
		const submitBtn = newsletterForm.querySelector('button[type="submit"]');
		
		// Validar email
		if (emailInput.value && emailInput.checkValidity()) {
			// Simular envío
			submitBtn.textContent = '¡Enviado!';
			submitBtn.style.backgroundColor = '#00ffb3';
			
			setTimeout(() => {
				emailInput.value = '';
				submitBtn.textContent = 'Mantente Actualizado';
				submitBtn.style.backgroundColor = '';
			}, 2000);
		}
	});
}


function animateCounter(element, target, duration = 2000) {
	let current = 0;
	const increment = target / (duration / 16);
	const timer = setInterval(() => {
		current += increment;
		if (current >= target) {
			element.textContent = target.toLocaleString();
			clearInterval(timer);
		} else {
			element.textContent = Math.floor(current).toLocaleString();
		}
	}, 16);
}

const heroImage = document.querySelector('.container-hero img');

if (heroImage) {
	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset;
		const parallaxSpeed = 0.5;
		
		if (scrolled < window.innerHeight) {
			heroImage.style.transform = `translate(-50%, ${scrolled * parallaxSpeed}px)`;
		}
	});
}

/* ============================================ */
/*         FORMULARIO DE CONTACTO              */
/* ============================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
	// ⚠️ REEMPLAZA ESTA URL CON LA DE TU WEBHOOK EN MAKE
	const webhookURL = 'https://hook.eu2.make.com/TU_WEBHOOK_AQUI';

	const nameInput    = document.getElementById('contact-name');
	const phoneInput   = document.getElementById('contact-phone');
	const emailInput   = document.getElementById('contact-email');
	const messageInput = document.getElementById('contact-message');
	const charCount    = document.getElementById('charCount');
	const submitBtn    = document.getElementById('submitBtn');
	const btnText      = submitBtn.querySelector('.btn-text');
	const btnLoading   = submitBtn.querySelector('.btn-loading');
	const btnReset     = document.getElementById('btnReset');

	// Contador de caracteres
	messageInput.addEventListener('input', () => {
		const count = messageInput.value.length;
		if (count > 500) messageInput.value = messageInput.value.substring(0, 500);
		charCount.textContent = Math.min(count, 500);
		charCount.style.color = count > 400 ? '#e53935' : '';
	});

	// Validación en tiempo real
	[nameInput, phoneInput, emailInput, messageInput].forEach(input => {
		input.addEventListener('blur', () => validateField(input));
		input.addEventListener('input', () => {
			if (input.closest('.form-group').classList.contains('has-error')) {
				validateField(input);
			}
		});
	});

	function validateField(input) {
		const group   = input.closest('.form-group');
		const errorEl = document.getElementById('error-' + input.id.replace('contact-', ''));
		let message   = '';

		if (input.required && !input.value.trim()) {
			message = 'Este campo es obligatorio.';
		} else if (input.type === 'email' && input.value) {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
				message = 'Ingresa un correo electrónico válido.';
			}
		} else if (input.type === 'tel' && input.value) {
			if (!/^[\d\s\-\+\(\)]{7,15}$/.test(input.value)) {
				message = 'Ingresa un número de teléfono válido.';
			}
		} else if (input.tagName === 'TEXTAREA' && input.value.trim().length < 10) {
			message = 'Por favor escribe al menos 10 caracteres.';
		}

		if (message) {
			group.classList.add('has-error');
			errorEl.textContent = message;
			return false;
		}
		group.classList.remove('has-error');
		errorEl.textContent = '';
		return true;
	}

	function validateAll() {
		return [nameInput, phoneInput, emailInput, messageInput]
			.map(f => validateField(f))
			.every(Boolean);
	}

	function showSuccess() {
		const name = nameInput.value.trim().split(' ')[0];
		document.getElementById('successName').textContent = name;
		contactForm.style.display = 'none';
		formSuccess.style.display = 'flex';
		submitBtn.disabled = false;
		btnText.style.display  = 'flex';
		btnLoading.style.display = 'none';
	}

	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		if (!validateAll()) return;

		// Estado de carga
		submitBtn.disabled = true;
		btnText.style.display    = 'none';
		btnLoading.style.display = 'flex';

		const webhookURL = "https://hook.eu1.make.com/r3bf3iq2a9bx9ye98o3wbyo53p82i5i3";
		const data = {
			nombre:    nameInput.value.trim(),
			telefono:  phoneInput.value.trim(),
			correo:    emailInput.value.trim(),
			mensaje:   messageInput.value.trim(),
			fecha:     new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
		};

		try {
			// ✅ FIX CORS: Make requiere text/plain para evitar el preflight OPTIONS
			// Con application/json Make bloquea la request antes de recibirla
			await fetch(webhookURL, {
				method: 'POST',
				headers: { 'Content-Type': 'text/plain' },
				body: JSON.stringify(data)
			});
		} catch (_) {
			// Make sí recibe aunque el navegador reporte error de CORS en la respuesta
		} finally {
			showSuccess();
		}
	});

	// Reset del formulario
	if (btnReset) {
		btnReset.addEventListener('click', () => {
			contactForm.reset();
			charCount.textContent = '0';
			document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
			document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
			contactForm.style.display = 'flex';
			formSuccess.style.display = 'none';
		});
	}
}