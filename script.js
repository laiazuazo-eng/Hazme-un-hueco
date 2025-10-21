const form = document.getElementById('formCita');
const confirmacion = document.getElementById('confirmacion');
const respuesta = document.getElementById('respuesta');
const listaCitas = document.getElementById('citasList');
const emergencia = document.getElementById('emergencia');
let citas = JSON.parse(localStorage.getItem('citasPandita')) || [];

// Verifica si la cita es hoy
function esHoy(fecha) {
    const hoy = new Date().toISOString().split('T')[0];
    return fecha === hoy;
}

function mostrarCitas() {
    listaCitas.innerHTML = '';
    if (citas.length === 0) {
        listaCitas.innerHTML = '<p>¡No hay citas aún! ¿Esperando a que Pandita te sorprenda? 😏</p>';
        return;
    }
    citas.forEach(cita => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${cita.motivo}</strong><br>${cita.fecha} a las ${cita.hora}<br>Estado: ${cita.estado}<br>Notas: ${cita.notas || 'Solo amor y sushi 🍣'}`;
        if (esHoy(cita.fecha)) {
            li.classList.add('recordatorio');
            li.innerHTML += '<br>🚨 ¡Recordatorio: ESTA CITA ES HOY! 🚨';
        }
        listaCitas.appendChild(li);
    });
}

// Respuestas personalizadas
const respuestas = {
    'peli y manta': '¡Aprobado! Pero si es otra peli mala de Nicolas Cage, me duermo 😴',
    'peli y pizza': 'Pizza y peli? Ok, pero tiene que ser una de Nicolas Cage, amor 🍕🎬',
    'cine': 'Cine confirmado, pero si es *Ghost Rider* otra vez, Pandita se rebela 🎥',
    'ir de compras': 'Compras? Solo si me dejas llevar el carrito y un sushi de premio 🛍️',
    'fiesta loca': '¡Fiesta loca activada! Pandita ya está practicando sus pasos 🕺',
    'hablar de la boda': 'Boda? Ok, pero primero practicamos el baile nupcial 💃🐼',
    'comprar cosas de la boda': 'Aceptado, pero si compramos anillos, que sean de pizza 🍕💍',
    'planificar luna de miel': 'Luna de miel? ¡Aprobado! Pero que haya sushi y playa 🌴🍣',
    'ver una serie': 'Serie? Ok, pero nada de documentales, que Pandita quiere acción 😎',
    'salir a cenar': 'Cena confirmada, pero si no hay sushi, Pandita se pone gruñón 🍽️',
    'ir al cine': 'Cine otra vez? Ok, pero elijo yo o es Nicolas Cage por defecto 🎞️',
    'salir de telde': '¡Porfi porfi APROBADO! Escapada de Telde con Pandita 🚗💨',
    default: 'En revisión... Pandita está ocupado comiendo sushi. Sobórnalo con pizza 🍕😉'
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const motivo = document.getElementById('motivo').value.toLowerCase();
    const nuevaCita = {
        nombre: document.getElementById('nombre').value,
        motivo: document.getElementById('motivo').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        notas: document.getElementById('notas').value,
        estado: 'Pendiente (Pandita te ama)'
    };
    citas.push(nuevaCita);
    localStorage.setItem('citasPandita', JSON.stringify(citas));
    mostrarCitas();

    const respKey = Object.keys(respuestas).find(key => motivo.includes(key)) || 'default';
    respuesta.innerHTML = respuestas[respKey].replace('[Tu nombre]', document.getElementById('nombre').value);
    form.style.display = 'none';
    confirmacion.style.display = 'block';
});

emergencia.addEventListener('click', () => {
    respuesta.innerHTML = '¡Emergencia activada! Pandita corre con sushi y abrazos en 3...2...1 🍣💕';
    confirmacion.style.display = 'block';
    form.style.display = 'none';
});

function volverForm() {
    form.style.display = 'block';
    confirmacion.style.display = 'none';
    form.reset();
}

mostrarCitas();