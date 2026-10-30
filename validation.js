const form = document.querySelector('#patient-enquiry');
const languageButtons = document.querySelectorAll('[data-set-language]');
let currentLanguage = new URLSearchParams(window.location.search).get('lang') === 'es' ? 'es' : 'en';

const messages = {
  en: {
    first_name: 'First name must contain only letters and be at least 2 characters',
    last_name: 'Last name must contain only letters and be at least 2 characters',
    date_of_birth: 'Enter a valid date of birth. Patient must be between 0 and 120 years old',
    email: 'Enter a valid email address (example: name@provider.com)',
    phone: 'Phone must include a country code (example: +1 305 555 0191)',
    preferred_language: 'Select your preferred language',
    preferred_clinic: 'Select the clinic you would like to visit',
    preferred_date: 'Select a date at least 1 business day from today and no more than 60 days ahead',
    preferred_time: 'Select your preferred time of day',
    service_type: 'Select the type of care you are looking for',
    paediatric: 'Paediatric Care is available for patients under 18. Please check the date of birth or select a different service.',
    new_patient: 'Please indicate whether this is your first visit to HealthCore',
    has_insurance: 'Please indicate whether you have health insurance',
    insurance_provider: 'Please enter your insurance provider name',
    insurance_provider_length: 'Insurance provider must be no more than 100 characters',
    insurance_member_id: 'Member ID must be between 6 and 20 alphanumeric characters',
    patient_id: 'Patient ID must use HC- followed by 6 alphanumeric characters (example: HC-A3F291)',
    health_concern: 'Please describe your health concern in at least 20 characters (X characters remaining)',
    contact_consent: 'You must consent to being contacted before submitting this form',
    clinic_warning: 'This clinic closes before 8pm. Your evening preference may not be available; our team will confirm by phone.',
    count: (length) => `${length} / 500 characters`
  },
  es: {
    first_name: 'El nombre debe contener solo letras y tener al menos 2 caracteres',
    last_name: 'El apellido debe contener solo letras y tener al menos 2 caracteres',
    date_of_birth: 'Introduce una fecha de nacimiento válida. La persona debe tener entre 0 y 120 años',
    email: 'Introduce un correo electrónico válido (ejemplo: nombre@proveedor.com)',
    phone: 'El teléfono debe incluir el código de país (ejemplo: +1 305 555 0191)',
    preferred_language: 'Selecciona tu idioma preferido',
    preferred_clinic: 'Selecciona la clínica que quieres visitar',
    preferred_date: 'Selecciona una fecha al menos 1 día hábil a partir de hoy y no más de 60 días adelante',
    preferred_time: 'Selecciona el horario que prefieres',
    service_type: 'Selecciona el tipo de atención que necesitas',
    paediatric: 'La atención pediátrica es para menores de 18 años. Revisa la fecha de nacimiento o selecciona otro servicio.',
    new_patient: 'Indica si es tu primera visita a HealthCore',
    has_insurance: 'Indica si tienes seguro médico',
    insurance_provider: 'Escribe el nombre de tu aseguradora',
    insurance_provider_length: 'El nombre de la aseguradora no puede superar los 100 caracteres',
    insurance_member_id: 'El número de miembro debe tener entre 6 y 20 caracteres alfanuméricos',
    patient_id: 'El ID debe tener el formato HC- seguido de 6 caracteres alfanuméricos (ejemplo: HC-A3F291)',
    health_concern: 'Describe tu motivo de consulta con al menos 20 caracteres (te faltan X caracteres)',
    contact_consent: 'Debes aceptar que HealthCore te contacte antes de enviar el formulario',
    clinic_warning: 'Esta clínica cierra antes de las 8 p. m. Es posible que no tenga disponibilidad en ese horario; el equipo lo confirmará por teléfono.',
    count: (length) => `${length} / 500 caracteres`
  }
};

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-lang]').forEach((element) => {
    element.classList.toggle('hidden', element.dataset.lang !== language);
  });
  languageButtons.forEach((button) => {
    const active = button.dataset.setLanguage === language;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('bg-[#1f5145]', active);
    button.classList.toggle('text-white', active);
  });
  document.querySelector('#language-switch').setAttribute('aria-label', language === 'es' ? 'Elegir idioma' : 'Choose language');
  document.querySelector('[data-home-link]').setAttribute('aria-label', 'H HealthCore');
  document.querySelectorAll('option[data-en][data-es]').forEach((option) => {
    option.textContent = language === 'es' ? option.dataset.es : option.dataset.en;
  });
  document.querySelectorAll('[data-page]').forEach((link) => {
    link.href = `${link.dataset.page}?lang=${language}`;
  });
  document.title = language === 'es' ? 'Consulta de paciente | HealthCore' : 'Patient enquiry | HealthCore';
  document.querySelector('meta[name="description"]').content = language === 'es'
    ? 'Envía una consulta de paciente a HealthCore e indica cómo puede contactarte nuestro equipo.'
    : 'Send HealthCore a patient enquiry and tell us how our team can reach you.';
  updateCount();
  updateClinicWarning();
  document.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
    const name = field.name;
    if (name) showError(name, validateField(name));
  });
}

function localDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateLimits() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const earliest = new Date(today);
  earliest.setDate(earliest.getDate() + 1);
  while (earliest.getDay() === 0 || earliest.getDay() === 6) {
    earliest.setDate(earliest.getDate() + 1);
  }
  const latest = new Date(today);
  latest.setDate(latest.getDate() + 60);
  return { earliest: localDateString(earliest), latest: localDateString(latest), today: localDateString(today) };
}

function setDateBounds() {
  const { earliest, latest, today } = dateLimits();
  document.querySelector('#date_of_birth').max = today;
  const preferredDate = document.querySelector('#preferred_date');
  preferredDate.min = earliest;
  preferredDate.max = latest;
}

function ageAtDate(dateString) {
  const birthDate = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age;
}

function selectedRadio(name) {
  return form.querySelector(`input[name="${name}"]:checked`)?.value ?? '';
}

function validateField(name) {
  const value = form.elements.namedItem(name)?.value?.trim() ?? '';
  const text = messages[currentLanguage];
  const letterCount = (value.match(/\p{L}/gu) ?? []).length;

  if (name === 'first_name' || name === 'last_name') {
    return value.length < 2 || value.length > 50 || letterCount < 2 || !/^[\p{L} ]+$/u.test(value)
      ? text[name]
      : '';
  }
  if (name === 'date_of_birth') {
    const age = ageAtDate(value);
    return age === null || age < 0 || age > 120 ? text.date_of_birth : '';
  }
  if (name === 'email') {
    return !form.elements.namedItem('email').validity.valid ? text.email : '';
  }
  if (name === 'phone') {
    return !/^\+\d{1,3}(?:[\s.-]?\d){6,14}$/.test(value) ? text.phone : '';
  }
  if (name === 'preferred_language') return value ? '' : text.preferred_language;
  if (name === 'preferred_clinic') return value ? '' : text.preferred_clinic;
  if (name === 'preferred_date') {
    const { earliest, latest } = dateLimits();
    return value >= earliest && value <= latest ? '' : text.preferred_date;
  }
  if (name === 'preferred_time') return value ? '' : text.preferred_time;
  if (name === 'service_type') {
    if (!value) return text.service_type;
    if (value === 'Paediatric Care' && ageAtDate(form.elements.namedItem('date_of_birth').value) >= 18) return text.paediatric;
    return '';
  }
  if (name === 'new_patient') return selectedRadio(name) ? '' : text.new_patient;
  if (name === 'has_insurance') return selectedRadio(name) ? '' : text.has_insurance;
  if (name === 'insurance_provider') {
    if (selectedRadio('has_insurance') !== 'Yes') return '';
    if (!value) return text.insurance_provider;
    return value.length > 100 ? text.insurance_provider_length : '';
  }
  if (name === 'insurance_member_id') {
    if (selectedRadio('has_insurance') !== 'Yes') return '';
    return !/^[a-z\d]{6,20}$/i.test(value) ? text.insurance_member_id : '';
  }
  if (name === 'patient_id') {
    return selectedRadio('new_patient') !== 'No' || !value || /^HC-[a-z\d]{6}$/i.test(value) ? '' : text.patient_id;
  }
  if (name === 'health_concern') {
    if (value.length >= 20 && value.length <= 500) return '';
    const remaining = Math.max(20 - value.length, 0);
    return text.health_concern.replace('X', String(remaining));
  }
  if (name === 'contact_consent') return form.elements.namedItem('contact_consent').checked ? '' : text.contact_consent;
  return '';
}

function showError(name, message) {
  const error = document.querySelector(`#${name}-error`);
  if (!error) return;
  error.textContent = message;
  const fields = form.querySelectorAll(`[name="${name}"]`);
  fields.forEach((field) => field.setAttribute('aria-invalid', String(Boolean(message))));
}

function validateAll() {
  const names = [
    'first_name', 'last_name', 'date_of_birth', 'email', 'phone', 'preferred_language',
    'preferred_clinic', 'preferred_date', 'preferred_time', 'service_type', 'new_patient',
    'has_insurance', 'insurance_provider', 'insurance_member_id', 'patient_id',
    'health_concern', 'contact_consent'
  ];
  let firstInvalid = null;
  names.forEach((name) => {
    const error = validateField(name);
    showError(name, error);
    if (error && !firstInvalid) {
      firstInvalid = form.querySelector(`[name="${name}"]`);
    }
  });
  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }
  return true;
}

function updateConditionalFields() {
  const insuranceFields = document.querySelector('#insurance-fields');
  const insuranceRequired = selectedRadio('has_insurance') === 'Yes';
  insuranceFields.classList.toggle('hidden', !insuranceRequired);
  ['insurance_provider', 'insurance_member_id'].forEach((name) => {
    const field = form.elements.namedItem(name);
    field.required = insuranceRequired;
    if (!insuranceRequired) {
      field.value = '';
      showError(name, '');
    }
  });

  const patientField = document.querySelector('#patient-id-field');
  const returningPatient = selectedRadio('new_patient') === 'No';
  patientField.classList.toggle('hidden', !returningPatient);
  if (!returningPatient) {
    form.elements.namedItem('patient_id').value = '';
    showError('patient_id', '');
  }
}

function updateCount() {
  const length = form.elements.namedItem('health_concern').value.length;
  document.querySelector('#concern-count').textContent = messages[currentLanguage].count(length);
}

function updateClinicWarning() {
  const clinic = document.querySelector('#preferred_clinic').selectedOptions[0];
  const closeHour = Number(clinic?.dataset.close ?? 0);
  const evening = form.elements.namedItem('preferred_time').value === 'Evening';
  const warning = document.querySelector('#clinic-warning');
  const showWarning = evening && closeHour > 17 && closeHour < 20;
  warning.textContent = showWarning ? messages[currentLanguage].clinic_warning : '';
  warning.classList.toggle('hidden', !showWarning);
}

function clearValuesAndShowSuccess() {
  form.reset();
  updateConditionalFields();
  updateCount();
  updateClinicWarning();
  form.classList.add('hidden');
  const success = document.querySelector('#success-message');
  success.classList.remove('hidden');
  success.focus();
}

languageButtons.forEach((button) => button.addEventListener('click', () => {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', button.dataset.setLanguage);
  window.history.replaceState({}, '', url);
  setLanguage(button.dataset.setLanguage);
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateAll()) clearValuesAndShowSuccess();
});

document.querySelector('[data-clear-form]').addEventListener('click', () => {
  form.reset();
  form.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
  form.querySelectorAll('[id$="-error"]').forEach((error) => {
    error.textContent = '';
  });
  updateConditionalFields();
  updateCount();
  updateClinicWarning();
  form.elements.namedItem('first_name').focus();
});

form.addEventListener('change', (event) => {
  if (event.target.name === 'has_insurance' || event.target.name === 'new_patient') updateConditionalFields();
  if (event.target.name === 'preferred_clinic' || event.target.name === 'preferred_time') updateClinicWarning();
  if (event.target.name) showError(event.target.name, validateField(event.target.name));
});

form.addEventListener('input', (event) => {
  if (event.target.name === 'health_concern') updateCount();
  if (event.target.name) showError(event.target.name, validateField(event.target.name));
});

form.addEventListener('focusout', (event) => {
  if (event.target.name) showError(event.target.name, validateField(event.target.name));
});

setDateBounds();
setLanguage(currentLanguage);
updateConditionalFields();
updateCount();
