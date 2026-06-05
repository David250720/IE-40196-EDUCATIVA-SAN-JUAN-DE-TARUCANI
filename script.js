/**
 * ==========================================================================
 * LÓGICA DE INTERACTIVIDAD - COLEGIO SAN JUAN BAUTISTA DE TARUCANI
 * Autor: Antigravity AI
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. CABECERA PEGAJOSA Y BOTÓN VOLVER ARRIBA (STICKY HEADER & SCROLL TO TOP)
    // --------------------------------------------------------------------------
    const mainHeader = document.getElementById('mainHeader');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        // Añadir sombreado y compresión al header tras hacer scroll
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }

        // Mostrar u ocultar el botón de scroll hacia arriba
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Acción para volver al inicio suavemente
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // --------------------------------------------------------------------------
    // 2. MENÚ MÓVIL (MOBILE MENU)
    // --------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            
            // Prevenir scroll en el fondo al abrir menú móvil
            if (navMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú móvil automáticamente al hacer clic en un enlace de sección
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }


    // --------------------------------------------------------------------------
    // 3. NAVEGACIÓN ACTIVA AUTOMÁTICA EN SCROLL (SCROLLSPY)
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180; // Ajuste por la altura del header
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --------------------------------------------------------------------------
    // 4. PESTAÑAS INTERACTIVAS (TABS) - SECCIÓN NOSOTROS / IDENTIDAD
    // --------------------------------------------------------------------------
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetTab = trigger.getAttribute('data-tab');

            // Quitar clase activa a todos los disparadores y paneles
            tabTriggers.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => p.classList.remove('active'));

            // Agregar clase activa al disparador seleccionado y a su panel
            trigger.classList.add('active');
            trigger.setAttribute('aria-selected', 'true');
            
            const targetPanel = document.getElementById(`panel-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });


    // --------------------------------------------------------------------------
    // 5. ACORDEÓN INTERACTIVO (ACCORDIONS) - PROPUESTA ACADÉMICA
    // --------------------------------------------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isActive = currentItem.classList.contains('active');

            // Cerrar todos los items del acordeón
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
                const icon = item.querySelector('.accordion-icon i');
                if (icon) icon.className = 'fas fa-plus';
            });

            // Si el item pulsado no estaba activo, lo abrimos
            if (!isActive) {
                currentItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                
                const content = currentItem.querySelector('.accordion-content');
                // Asignar dinámicamente la altura del contenido interno para la transición fluida
                content.style.maxHeight = content.scrollHeight + 'px';
                
                const icon = header.querySelector('.accordion-icon i');
                if (icon) icon.className = 'fas fa-minus';
            }
        });
    });

    // Ajustar el acordeón si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        const activeAccordion = document.querySelector('.accordion-item.active');
        if (activeAccordion) {
            const content = activeAccordion.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });


    // --------------------------------------------------------------------------
    // 6. GALERÍA FILTRABLE DE TALLERES (WORKSHOP GALLERY FILTER)
    // --------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workshopCards = document.querySelectorAll('.workshop-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Actualizar botones de filtro
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrar las tarjetas de talleres con transición
            workshopCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Re-iniciar la animación CSS
                    card.style.animation = 'none';
                    card.offsetHeight; // Forzar reflow del navegador para reiniciar animación
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --------------------------------------------------------------------------
    // 7. SIMULADOR DE COSTOS / PENSIONES (Paso 2 del Wizard)
    // --------------------------------------------------------------------------
    const selectNivel = document.getElementById('select-nivel');
    const discountHermano = document.getElementById('discount-hermano');
    const discountExcelencia = document.getElementById('discount-excelencia');
    const discountResidente = document.getElementById('discount-residente');

    // Outputs
    const outMatricula = document.getElementById('sim-out-matricula');
    const outPensionBase = document.getElementById('sim-out-pension-base');
    const discountRow = document.getElementById('sim-discount-row');
    const outDescuentoVal = document.getElementById('sim-out-descuento');
    const outPensionFinal = document.getElementById('sim-out-pension-final');
    const outTotalAnual = document.getElementById('sim-out-total-anual');

    // Matriz de Costos Comunitarios por Nivel (Público/APAFA)
    const costosBase = {
        inicial: { apafa: 30, utiles: 120, privadoComparativo: 3250 },
        primaria: { apafa: 40, utiles: 150, privadoComparativo: 3800 },
        secundaria: { apafa: 50, utiles: 200, privadoComparativo: 4350 }
    };

    function calcularPresupuesto() {
        if (!selectNivel) return;

        const nivel = selectNivel.value;
        const costos = costosBase[nivel];
        
        const costApafa = costos.apafa;
        const costUtiles = costos.utiles;

        let apafaDescuento = 0;
        let utilesDescuento = 0;

        // 1. Subsidio por hermano en cuota de APAFA (30%)
        if (discountHermano && discountHermano.checked) {
            apafaDescuento += costApafa * 0.30;
        }
        
        // 2. Exoneración por Excelencia Académica (100% de la cuota de APAFA)
        if (discountExcelencia && discountExcelencia.checked) {
            apafaDescuento = costApafa; // Exoneración total
        }

        // 3. Subsidio Municipal por Residente local en uniformes/útiles (50%)
        if (discountResidente && discountResidente.checked) {
            utilesDescuento += costUtiles * 0.50;
        }

        const apafaFinal = costApafa - apafaDescuento;
        const utilesFinal = costUtiles - utilesDescuento;

        const totalGastoBase = costApafa + costUtiles;
        const totalGastoNeto = apafaFinal + utilesFinal;
        const totalAhorroFamiliar = costos.privadoComparativo - totalGastoNeto;

        // Renderizar salidas en la interfaz
        outMatricula.textContent = "S/. 0.00 (Gratuito)";
        outPensionBase.textContent = `S/. ${totalGastoBase.toFixed(2)}`;

        const totalDescuento = apafaDescuento + utilesDescuento;
        if (totalDescuento > 0) {
            outDescuentoVal.textContent = `-S/. ${totalDescuento.toFixed(2)}`;
            discountRow.style.display = 'flex';
        } else {
            discountRow.style.display = 'none';
        }

        outPensionFinal.textContent = `S/. ${totalGastoNeto.toFixed(2)}`;
        outTotalAnual.textContent = `S/. ${totalAhorroFamiliar.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Registrar eventos para el simulador
    if (selectNivel) {
        selectNivel.addEventListener('change', calcularPresupuesto);
        discountHermano.addEventListener('change', calcularPresupuesto);
        discountExcelencia.addEventListener('change', calcularPresupuesto);
        discountResidente.addEventListener('change', calcularPresupuesto);

        // Inicializar simulador con los valores por defecto al cargar
        calcularPresupuesto();
    }


    // --------------------------------------------------------------------------
    // 8. ASISTENTE DE MATRÍCULA INTERACTIVO (WIZARD NAVIGATION)
    // --------------------------------------------------------------------------
    let wizardStepIndex = 1;
    const maxSteps = 3;
    
    const wizardStepIndicators = document.querySelectorAll('.wizard-step-indicator');
    const wizardPanes = document.querySelectorAll('.wizard-pane');
    const wizardProgressBar = document.getElementById('wizardProgressBar');
    
    const wizardBtnPrev = document.getElementById('wizardBtnPrev');
    const wizardBtnNext = document.getElementById('wizardBtnNext');
    const wizardBtnSubmit = document.getElementById('wizardBtnSubmit');

    function actualizarWizardUI() {
        // Mostrar pane correspondiente al paso actual
        wizardPanes.forEach(pane => {
            pane.classList.remove('active');
            if (parseInt(pane.getAttribute('data-step')) === wizardStepIndex) {
                pane.classList.add('active');
            }
        });

        // Actualizar indicadores (círculos de paso)
        wizardStepIndicators.forEach((ind, idx) => {
            const stepNum = idx + 1;
            ind.classList.remove('active', 'completed');

            if (stepNum === wizardStepIndex) {
                ind.classList.add('active');
            } else if (stepNum < wizardStepIndex) {
                ind.classList.add('completed');
            }
        });

        // Actualizar barra de progreso superior
        const progressPercent = ((wizardStepIndex - 1) / (maxSteps - 1)) * 100;
        wizardProgressBar.style.width = `${progressPercent}%`;

        // Control de visibilidad de los botones de navegación
        if (wizardStepIndex === 1) {
            wizardBtnPrev.style.visibility = 'hidden';
            wizardBtnNext.style.display = 'inline-flex';
            wizardBtnSubmit.style.display = 'none';
        } else if (wizardStepIndex === maxSteps) {
            wizardBtnPrev.style.visibility = 'visible';
            wizardBtnNext.style.display = 'none';
            wizardBtnSubmit.style.display = 'inline-flex';
        } else {
            wizardBtnPrev.style.visibility = 'visible';
            wizardBtnNext.style.display = 'inline-flex';
            wizardBtnSubmit.style.display = 'none';
        }
    }

    if (wizardBtnNext && wizardBtnPrev) {
        wizardBtnNext.addEventListener('click', () => {
            if (wizardStepIndex < maxSteps) {
                // Sincronizar el nivel educativo seleccionado en el simulador con el del formulario final
                if (wizardStepIndex === 2) {
                    const simLevelVal = selectNivel.value;
                    const formLevelVal = document.getElementById('estudiante-nivel');
                    if (formLevelVal) {
                        formLevelVal.value = simLevelVal;
                        // Actualizar los grados dinámicamente según el nivel seleccionado
                        actualizarGradosDinamicamente(simLevelVal);
                    }
                }
                
                wizardStepIndex++;
                actualizarWizardUI();
                
                // Hacer scroll suave hacia la cabecera de la sección matrícula
                document.getElementById('matriculas').scrollIntoView({ behavior: 'smooth' });
            }
        });

        wizardBtnPrev.addEventListener('click', () => {
            if (wizardStepIndex > 1) {
                wizardStepIndex--;
                actualizarWizardUI();
                document.getElementById('matriculas').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Permitir navegación haciendo clic directo en los círculos de pasos completados
    wizardStepIndicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
            const selectedStep = idx + 1;
            // Permitir ir atrás, o avanzar sólo 1 paso a la vez (evita saltarse pasos sin verlos)
            if (selectedStep <= wizardStepIndex || selectedStep === wizardStepIndex + 1) {
                if (wizardStepIndex === 2 && selectedStep === 3) {
                    // Sincronizar nivel si avanza
                    const formLevelVal = document.getElementById('estudiante-nivel');
                    if (formLevelVal) {
                        formLevelVal.value = selectNivel.value;
                        actualizarGradosDinamicamente(selectNivel.value);
                    }
                }
                wizardStepIndex = selectedStep;
                actualizarWizardUI();
            }
        });
    });


    // --------------------------------------------------------------------------
    // 9. FORMULARIO DINÁMICO Y VALIDACIONES (FORM VALIDATION & SUCCESS SCREEN)
    // --------------------------------------------------------------------------
    const formLevelSelect = document.getElementById('estudiante-nivel');
    const formGradeSelect = document.getElementById('estudiante-grado');

    // Estructura de grados escolares por nivel
    const gradosPorNivel = {
        inicial: [
            { val: 'inicial-3', txt: 'Inicial 3 años' },
            { val: 'inicial-4', txt: 'Inicial 4 años' },
            { val: 'inicial-5', txt: 'Inicial 5 años' }
        ],
        primaria: [
            { val: 'primaria-1', txt: '1° de Primaria' },
            { val: 'primaria-2', txt: '2° de Primaria' },
            { val: 'primaria-3', txt: '3° de Primaria' },
            { val: 'primaria-4', txt: '4° de Primaria' },
            { val: 'primaria-5', txt: '5° de Primaria' },
            { val: 'primaria-6', txt: '6° de Primaria' }
        ],
        secundaria: [
            { val: 'secundaria-1', txt: '1° de Secundaria' },
            { val: 'secundaria-2', txt: '2° de Secundaria' },
            { val: 'secundaria-3', txt: '3° de Secundaria' },
            { val: 'secundaria-4', txt: '4° de Secundaria' },
            { val: 'secundaria-5', txt: '5° de Secundaria' }
        ]
    };

    function actualizarGradosDinamicamente(nivel) {
        if (!formGradeSelect) return;
        
        // Limpiar opciones previas
        formGradeSelect.innerHTML = '';
        
        // Agregar nuevas opciones correspondientes al nivel
        const opciones = gradosPorNivel[nivel];
        opciones.forEach(op => {
            const optElem = document.createElement('option');
            optElem.value = op.val;
            optElem.textContent = op.txt;
            formGradeSelect.appendChild(optElem);
        });
    }

    if (formLevelSelect) {
        formLevelSelect.addEventListener('change', () => {
            actualizarGradosDinamicamente(formLevelSelect.value);
        });
    }

    // Lógica de validación
    const matriculaForm = document.getElementById('matriculaForm');
    const studentName = document.getElementById('estudiante-nombre');
    const studentDni = document.getElementById('estudiante-dni');
    const parentName = document.getElementById('apoderado-nombre');
    const parentPhone = document.getElementById('apoderado-telefono');
    const parentEmail = document.getElementById('apoderado-correo');
    const consentCheck = document.getElementById('consent-data');

    function validarRegexCampo(inputEl, regex, errorId, errorMsg) {
        const errorEl = document.getElementById(errorId);
        const value = inputEl.value.trim();
        const isValid = regex.test(value);

        if (!isValid) {
            errorEl.textContent = errorMsg;
            errorEl.style.display = 'block';
            inputEl.style.borderColor = 'var(--color-error)';
            return false;
        } else {
            errorEl.style.display = 'none';
            inputEl.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            return true;
        }
    }

    // Asignar validaciones en tiempo real (al perder el foco / Blur)
    if (studentName) {
        studentName.addEventListener('blur', () => {
            validarRegexCampo(studentName, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{6,80}$/, 'estudiante-nombre-error', 'Ingrese el nombre completo (mínimo 6 letras).');
        });
        studentDni.addEventListener('blur', () => {
            validarRegexCampo(studentDni, /^\d{8}$/, 'estudiante-dni-error', 'El DNI debe contener exactamente 8 números.');
        });
        parentName.addEventListener('blur', () => {
            validarRegexCampo(parentName, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{6,80}$/, 'apoderado-nombre-error', 'Ingrese el nombre completo del apoderado.');
        });
        parentPhone.addEventListener('blur', () => {
            validarRegexCampo(parentPhone, /^9\d{8}$/, 'apoderado-telefono-error', 'El teléfono celular debe tener 9 dígitos y empezar con 9.');
        });
        parentEmail.addEventListener('blur', () => {
            validarRegexCampo(parentEmail, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'apoderado-correo-error', 'Ingrese un correo electrónico válido.');
        });
    }

    // Acción del botón enviar
    if (wizardBtnSubmit) {
        wizardBtnSubmit.addEventListener('click', (e) => {
            e.preventDefault();

            // Validar todos los campos del formulario antes de procesar
            const isStudentNameVal = validarRegexCampo(studentName, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{6,80}$/, 'estudiante-nombre-error', 'Ingrese el nombre completo del estudiante.');
            const isStudentDniVal = validarRegexCampo(studentDni, /^\d{8}$/, 'estudiante-dni-error', 'El DNI debe contener exactamente 8 números.');
            const isParentNameVal = validarRegexCampo(parentName, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{6,80}$/, 'apoderado-nombre-error', 'Ingrese el nombre del apoderado.');
            const isParentPhoneVal = validarRegexCampo(parentPhone, /^9\d{8}$/, 'apoderado-telefono-error', 'Celular inválido (debe tener 9 dígitos y empezar con 9).');
            const isParentEmailVal = validarRegexCampo(parentEmail, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'apoderado-correo-error', 'Correo electrónico inválido.');
            
            // Validar check de consentimiento
            const consentError = document.getElementById('consent-data-error');
            const isConsentVal = consentCheck.checked;
            if (!isConsentVal) {
                consentError.style.display = 'block';
            } else {
                consentError.style.display = 'none';
            }

            if (isStudentNameVal && isStudentDniVal && isParentNameVal && isParentPhoneVal && isParentEmailVal && isConsentVal) {
                // Todo válido: mostrar pantalla de éxito
                procesarMatrículaExitosa();
            } else {
                // Hacer scroll al primer error visual en pantalla
                const activeError = document.querySelector('.error-msg[style*="display: block"]');
                if (activeError) {
                    activeError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    function procesarMatrículaExitosa() {
        const wizardContent = document.getElementById('wizardContent');
        const wizardBtnPrev = document.getElementById('wizardBtnPrev');
        const wizardBtnSubmit = document.getElementById('wizardBtnSubmit');
        const wizardSteps = document.getElementById('wizardSteps');
        
        // Generar un código de trámite aleatorio único
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const matriculaCode = `MAT-${randomNum}`;
        const sName = studentName.value.trim();
        const sNivel = formLevelSelect.value.toUpperCase();

        const successHTML = `
            <div class="success-screen">
                <div class="success-icon-wrapper">
                    <i class="fas fa-circle-check"></i>
                </div>
                <h3>¡Solicitud Recibida Correctamente!</h3>
                <p>La preinscripción para el estudiante <strong>${sName}</strong> en el nivel de <strong>${sNivel}</strong> ha sido procesada con éxito en el sistema.</p>
                
                <div class="code-box">
                    CÓDIGO DE TRÁMITE: ${matriculaCode}
                </div>
                
                <p style="font-size: 0.88rem; line-height: 1.5; color: rgba(255,255,255,0.7); max-width: 500px; margin: 0 auto 25px;">
                    Se ha enviado un correo electrónico con los requisitos pendientes de entrega y la fecha programada para la entrevista psicopedagógica al correo registrado del apoderado.
                </p>
                
                <button class="btn btn-primary" id="btnReiniciarWizard" style="margin-top: 15px;">
                    <i class="fas fa-redo-alt"></i> Registrar Nueva Matrícula
                </button>
            </div>
        `;

        // Ocultar indicadores y botones inferiores del asistente
        wizardSteps.style.display = 'none';
        wizardBtnPrev.style.display = 'none';
        wizardBtnSubmit.style.display = 'none';

        // Insertar HTML de éxito en el cuerpo del wizard
        wizardContent.innerHTML = successHTML;

        // Reiniciar la página al hacer clic en el botón de reset
        document.getElementById('btnReiniciarWizard').addEventListener('click', () => {
            location.reload();
        });

        // Posicionar scroll
        document.getElementById('matriculas').scrollIntoView({ behavior: 'smooth' });
    }


    // --------------------------------------------------------------------------
    // 10. MODAL DE INTRANET & AULA VIRTUAL (INTRANET MODAL POP-UP)
    // --------------------------------------------------------------------------
    const openIntranetBtns = document.querySelectorAll('.open-intranet-btn');
    const intranetModal = document.getElementById('intranetModal');
    const modalClose = document.getElementById('modalClose');
    const intranetLoginForm = document.getElementById('intranetLoginForm');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');

    if (intranetModal) {
        // Abrir Modal
        openIntranetBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                intranetModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Bloquear scroll de la página de fondo
            });
        });

        const cerrarModal = () => {
            intranetModal.classList.remove('open');
            document.body.style.overflow = ''; // Habilitar scroll de fondo
            intranetLoginForm.reset();
        };

        // Cerrar al pulsar la cruz (x)
        modalClose.addEventListener('click', cerrarModal);

        // Cerrar al hacer clic en el fondo oscuro translúcido fuera del modal
        intranetModal.addEventListener('click', (e) => {
            if (e.target === intranetModal) {
                cerrarModal();
            }
        });

        // Simulación de Envío de Login
        if (intranetLoginForm) {
            intranetLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const userVal = document.getElementById('login-username').value.trim();
                const passVal = document.getElementById('login-password').value.trim();

                if (userVal === '' || passVal === '') return;

                // Animación visual de carga en el botón
                const originalContent = loginSubmitBtn.innerHTML;
                loginSubmitBtn.disabled = true;
                loginSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validando usuario...';

                setTimeout(() => {
                    loginSubmitBtn.disabled = false;
                    loginSubmitBtn.innerHTML = originalContent;
                    
                    alert(`¡Acceso Permitido!\n\nBienvenido(a) a la Intranet del Colegio San Juan de Tarucani.\nAcceso temporal validado para el usuario: ${userVal}.\nEl sistema de calificaciones completo se activará al iniciar las clases.`);
                    cerrarModal();
                }, 1800);
            });
        }
    }


    // --------------------------------------------------------------------------
    // 11. FORMULARIO DE CONTACTO GENERAL & SUSCRIPCIÓN BOLETÍN
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const contactBtnSubmit = document.getElementById('contactBtnSubmit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const cName = document.getElementById('contact-nombre').value.trim();
            const cEmail = document.getElementById('contact-correo').value.trim();
            const cMessage = document.getElementById('contact-mensaje').value.trim();

            if (cName === '' || cEmail === '' || cMessage === '') {
                alert('Por favor complete todos los campos obligatorios del formulario de contacto.');
                return;
            }

            // Cambiar estado visual del botón
            const origText = contactBtnSubmit.innerHTML;
            contactBtnSubmit.disabled = true;
            contactBtnSubmit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';

            setTimeout(() => {
                alert(`¡Mensaje Enviado con Éxito!\n\nEstimado(a) ${cName}, hemos recibido su consulta en nuestra mesa de soporte. Nos comunicaremos con usted al correo ${cEmail} a la brevedad.`);
                contactForm.reset();
                contactBtnSubmit.disabled = false;
                contactBtnSubmit.innerHTML = origText;
            }, 1500);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputEmail = newsletterForm.querySelector('.newsletter-input');
            const emailValue = inputEmail.value.trim();

            if (emailValue === '') return;

            alert(`¡Suscripción de Boletín Confirmada!\n\nEl correo ${emailValue} ha sido añadido a la lista oficial de comunicados del Colegio San Juan Bautista de Tarucani.`);
            newsletterForm.reset();
        });
    }


    // --------------------------------------------------------------------------
    // 12. ANIMACIONES CON OBSERVADOR DE INTERSECCIÓN (REVEAL ON SCROLL)
    // --------------------------------------------------------------------------
    const observerSettings = {
        root: null, // Relativo al viewport
        rootMargin: '0px',
        threshold: 0.15 // Iniciar animación cuando el 15% del elemento sea visible
    };

    const scrollAnimationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar tras activarse
            }
        });
    }, observerSettings);

    // Identificar y registrar elementos para animar
    const elementsToReveal = document.querySelectorAll(
        '.value-card, .news-card, .workshop-card, .contact-info, .contact-form-card, .identity-img, .academic-img'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        scrollAnimationObserver.observe(el);
    });

});
