/* =========================================================
   FATIGESTIÓN - JAVASCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   ORGANIZADOR DE TAREAS
   ========================================================= */

function agregarTarea() {

    const input = document.getElementById("tareaInput");
    const lista = document.getElementById("listaTareas");

    if (!input || !lista) {
        return;
    }

    const texto = input.value.trim();

    if (texto === "") {
        alert("Por favor, escribí una tarea.");
        return;
    }

    const tarea = document.createElement("li");
    const textoTarea = document.createElement("span");
    const boton = document.createElement("button");

    textoTarea.textContent = texto;

    boton.type = "button";
    boton.textContent = "Eliminar";

    boton.addEventListener("click", function () {
        tarea.remove();
    });

    tarea.appendChild(textoTarea);
    tarea.appendChild(boton);
    lista.appendChild(tarea);

    input.value = "";
    input.focus();
}


function eliminarTarea(boton) {

    if (boton && boton.parentElement) {
        boton.parentElement.remove();
    }
}


/* =========================================================
   CALCULADORA DE CALIFICACIONES
   Aprobación: 7 o más
   ========================================================= */

function calcularPromedio() {

    const campo1 = document.getElementById("nota1");
    const campo2 = document.getElementById("nota2");
    const campo3 = document.getElementById("nota3");
    const resultado = document.getElementById("resultadoPromedio");

    if (!campo1 || !campo2 || !campo3 || !resultado) {
        return;
    }

    const nota1 = parseFloat(campo1.value);
    const nota2 = parseFloat(campo2.value);
    const nota3 = parseFloat(campo3.value);

    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        resultado.textContent = "Completá las tres notas.";
        return;
    }

    const promedio = (nota1 + nota2 + nota3) / 3;

    const porcentaje = promedio * 10;

    let estado;

    if (promedio >= 7) {
        estado = "✓ Promedio aprobado";
    } else {
        estado = "✗ Promedio menor a 7";
    }

    resultado.innerHTML =
        `Promedio: ${promedio.toFixed(2)}<br>` +
        `Porcentaje: ${porcentaje.toFixed(0)}%<br>` +
        `${estado}`;
}


/* =========================================================
   CALENDARIO DOCENTE
   Argentina + Provincia de Buenos Aires
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const calendario = document.getElementById("diasCalendario");
    const tituloMes = document.getElementById("mesActual");
    const botonAnterior = document.getElementById("mesAnterior");
    const botonSiguiente = document.getElementById("mesSiguiente");
    const fechaActual = document.getElementById("fechaActual");
    const informacion = document.getElementById("informacionFecha");

    if (calendario && tituloMes) {

        const hoy = new Date();

        let mes = hoy.getMonth();
        let año = hoy.getFullYear();

        const meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ];

        const eventos = {

            "2026-03-02": {
                titulo: "Inicio de clases",
                descripcion:
                    "Inicio del ciclo lectivo 2026 en la Provincia de Buenos Aires.",
                categoria: "escolar",
                icono: "🏫"
            },

            "2026-03-24": {
                titulo:
                    "Día Nacional de la Memoria por la Verdad y la Justicia",
                descripcion: "Feriado nacional.",
                categoria: "patria",
                icono: "🇦🇷"
            },

            "2026-04-02": {
                titulo:
                    "Día del Veterano y de los Caídos en la Guerra de Malvinas",
                descripcion: "Feriado nacional.",
                categoria: "patria",
                icono: "🇦🇷"
            },

            "2026-05-01": {
                titulo: "Día Internacional del Trabajo",
                descripcion: "Feriado nacional.",
                categoria: "feriado",
                icono: "🇦🇷"
            },

            "2026-05-25": {
                titulo: "Día de la Revolución de Mayo",
                descripcion:
                    "Feriado nacional y fecha patria.",
                categoria: "patria",
                icono: "🇦🇷"
            },

            "2026-06-20": {
                titulo: "Día de la Bandera",
                descripcion:
                    "Paso a la Inmortalidad del General Manuel Belgrano.",
                categoria: "patria",
                icono: "🇦🇷"
            },

            "2026-07-09": {
                titulo: "Día de la Independencia",
                descripcion:
                    "Feriado nacional y fecha patria.",
                categoria: "patria",
                icono: "🇦🇷"
            },

            "2026-07-20": {
                titulo: "Inicio del receso escolar de invierno",
                descripcion:
                    "Comienza el receso escolar de invierno en la Provincia de Buenos Aires.",
                categoria: "escolar",
                icono: "❄️"
            },

            "2026-07-31": {
                titulo: "Finalización del receso escolar de invierno",
                descripcion:
                    "Finaliza el receso escolar de invierno en la Provincia de Buenos Aires.",
                categoria: "escolar",
                icono: "❄️"
            },

            "2026-08-17": {
                titulo:
                    "Paso a la Inmortalidad del General José de San Martín",
                descripcion: "Feriado nacional.",
                categoria: "feriado",
                icono: "🇦🇷"
            },

            "2026-09-11": {
                titulo: "Día del Maestro y la Maestra",
                descripcion:
                    "Fecha educativa y docente.",
                categoria: "docente",
                icono: "👩‍🏫"
            },

            "2026-09-17": {
                titulo: "Día del Profesor",
                descripcion:
                    "Fecha importante para docentes.",
                categoria: "docente",
                icono: "👩‍🏫"
            },

            "2026-09-21": {
                titulo: "Día del Estudiante",
                descripcion: "Fecha educativa.",
                categoria: "educativa",
                icono: "🎓"
            },

            "2026-10-12": {
                titulo:
                    "Día del Respeto a la Diversidad Cultural",
                descripcion: "Feriado nacional.",
                categoria: "patria",
                icono: "🇦🇷"
            },

            "2026-11-20": {
                titulo: "Día de la Soberanía Nacional",
                descripcion:
                    "Feriado nacional y fecha patria.",
                categoria: "patria",
                icono: "🇦🇷"
            },

            "2026-12-08": {
                titulo:
                    "Día de la Inmaculada Concepción de María",
                descripcion: "Feriado nacional.",
                categoria: "feriado",
                icono: "🇦🇷"
            },

            "2026-12-22": {
                titulo: "Finalización de clases",
                descripcion:
                    "Finalización del ciclo lectivo 2026 en la Provincia de Buenos Aires.",
                categoria: "escolar",
                icono: "🏫"
            },

            "2026-12-25": {
                titulo: "Navidad",
                descripcion: "Feriado nacional.",
                categoria: "feriado",
                icono: "🇦🇷"
            }
        };


        function mostrarEvento(evento) {

            if (!informacion) {
                return;
            }

            informacion.innerHTML = `
                <strong>
                    ${evento.icono} ${evento.titulo}
                </strong>

                <span>
                    ${evento.descripcion}
                </span>
            `;
        }


        function mostrarFecha() {

            if (!fechaActual) {
                return;
            }

            const dia = String(hoy.getDate()).padStart(2, "0");

            const mesNumero =
                String(hoy.getMonth() + 1).padStart(2, "0");

            const añoNumero = hoy.getFullYear();

            fechaActual.textContent =
                `${dia}/${mesNumero}/${añoNumero}`;
        }


        function generarCalendario() {

            calendario.innerHTML = "";

            tituloMes.textContent =
                `${meses[mes]} ${año}`;


            let primerDia =
                new Date(año, mes, 1).getDay();


            if (primerDia === 0) {
                primerDia = 6;
            } else {
                primerDia = primerDia - 1;
            }


            const cantidadDias =
                new Date(año, mes + 1, 0).getDate();


            /* Espacios antes del primer día */

            for (let i = 0; i < primerDia; i++) {

                const espacio =
                    document.createElement("span");

                espacio.className =
                    "dia dia-otro-mes";

                calendario.appendChild(espacio);
            }


            /* Crear días */

            for (let dia = 1; dia <= cantidadDias; dia++) {

                const elemento =
                    document.createElement("span");

                elemento.className = "dia";

                elemento.textContent = dia;


                const mesTexto =
                    String(mes + 1).padStart(2, "0");

                const diaTexto =
                    String(dia).padStart(2, "0");

                const clave =
                    `${año}-${mesTexto}-${diaTexto}`;


                /* Fecha importante */

                if (eventos[clave]) {

                    const evento = eventos[clave];

                    elemento.classList.add("dia-evento");

                    elemento.classList.add(
                        "evento-" + evento.categoria
                    );

                    elemento.title = evento.titulo;

                    elemento.addEventListener(
                        "click",
                        function () {
                            mostrarEvento(evento);
                        }
                    );
                }


                /* Marcar hoy */

                if (
                    dia === hoy.getDate() &&
                    mes === hoy.getMonth() &&
                    año === hoy.getFullYear()
                ) {

                    elemento.classList.add("dia-hoy");
                }


                /* Días normales también se pueden tocar */

                if (!eventos[clave]) {

                    elemento.addEventListener(
                        "click",
                        function () {

                            if (informacion) {

                                informacion.innerHTML = `
                                    <strong>
                                        📅 ${dia} de ${meses[mes]} de ${año}
                                    </strong>

                                    <span>
                                        No hay una fecha importante registrada para este día.
                                    </span>
                                `;

                            }
                        }
                    );
                }


                calendario.appendChild(elemento);
            }
        }


        /* MES ANTERIOR */

        if (botonAnterior) {

            botonAnterior.addEventListener(
                "click",
                function () {

                    mes--;

                    if (mes < 0) {
                        mes = 11;
                        año--;
                    }

                    generarCalendario();
                }
            );
        }


        /* MES SIGUIENTE */

        if (botonSiguiente) {

            botonSiguiente.addEventListener(
                "click",
                function () {

                    mes++;

                    if (mes > 11) {
                        mes = 0;
                        año++;
                    }

                    generarCalendario();
                }
            );
        }


        mostrarFecha();
        generarCalendario();
    }


    /* =====================================================
       CHECKLIST DOCENTE
       ===================================================== */

    const checks =
        document.querySelectorAll(
            ".checklist input[type='checkbox']"
        );


    checks.forEach(function (check) {

        check.addEventListener(
            "change",
            function () {

                const contenedor =
                    this.parentElement;

                if (!contenedor) {
                    return;
                }

                if (this.checked) {

                    contenedor.style.textDecoration =
                        "line-through";

                    contenedor.style.opacity =
                        "0.6";

                } else {

                    contenedor.style.textDecoration =
                        "none";

                    contenedor.style.opacity =
                        "1";
                }
            }
        );
    });



/* =========================================================
   FORMULARIO DE CONTACTO
   FatiGestión
   ========================================================= */

const formulario = document.getElementById("formularioContacto");

if (formulario) {

    /* ==========================================
       NOMBRE: SOLO LETRAS Y ESPACIOS
       ========================================== */

    const nombreCampo =
        document.getElementById("nombre");

    if (nombreCampo) {

        nombreCampo.addEventListener(
            "input",
            function () {

                this.value = this.value.replace(
                    /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g,
                    ""
                );

            }
        );

    }


    /* ==========================================
       ENVIAR FORMULARIO
       ========================================== */

    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ==========================================
               OBTENER CAMPOS
               ========================================== */

            const nombreCampo =
                document.getElementById("nombre");


            const correoCampo =
                document.getElementById("email") ||
                document.getElementById("correo");


            const ayudaCampo =
                document.getElementById("servicio");


            const comentarioCampo =
                document.getElementById("mensaje") ||
                document.getElementById("consulta");


            /* ==========================================
               COMPROBAR QUE EXISTAN
               ========================================== */

            if (
                !nombreCampo ||
                !correoCampo ||
                !ayudaCampo ||
                !comentarioCampo
            ) {

                alert(
                    "❌ No se pudo realizar la consulta.\n\n" +
                    "Revisá que todos los campos del formulario estén correctamente configurados."
                );

                return;
            }


            /* ==========================================
               OBTENER VALORES
               ========================================== */

            const nombre =
                nombreCampo.value.trim();

            const correo =
                correoCampo.value.trim();

            const ayuda =
                ayudaCampo.value.trim();

            const comentario =
                comentarioCampo.value.trim();


            /* ==========================================
               1. VALIDAR NOMBRE
               SOLO LETRAS
               ========================================== */

            if (nombre === "") {

                alert(
                    "⚠️ Por favor, ingresá tu nombre."
                );

                nombreCampo.focus();

                return;
            }


            const nombreValido =
                /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;


            if (!nombreValido.test(nombre)) {

                alert(
                    "❌ El nombre solo puede contener letras y espacios."
                );

                nombreCampo.focus();

                return;
            }


            /* ==========================================
               2. VALIDAR CORREO
               DEBE TENER @ Y .
               ========================================== */

            if (correo === "") {

                alert(
                    "⚠️ Por favor, ingresá tu correo electrónico."
                );

                correoCampo.focus();

                return;
            }


            const correoValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!correoValido.test(correo)) {

                alert(
                    "❌ El correo electrónico no es válido.\n\n" +
                    "Debe contener @ y un punto.\n\n" +
                    "Ejemplo: ejemplo@gmail.com"
                );

                correoCampo.focus();

                return;
            }


            /* ==========================================
               3. VALIDAR ¿EN QUÉ NECESITÁS AYUDA?
               ========================================== */

            if (
                ayuda === "" ||
                ayuda === "0" ||
                ayuda === "Seleccioná una opción"
            ) {

                alert(
                    "⚠️ Por favor, seleccioná en qué necesitás ayuda."
                );

                ayudaCampo.focus();

                return;
            }


            /* ==========================================
               4. VALIDAR COMENTARIO
               ========================================== */

            if (comentario === "") {

                alert(
                    "⚠️ Por favor, escribí tu comentario o consulta."
                );

                comentarioCampo.focus();

                return;
            }


            /* ==========================================
               TODO CORRECTO
               ========================================== */

            alert(
                "✅ ¡Consulta realizada satisfactoriamente!\n\n" +
                "Gracias por comunicarte con FatiGestión."
            );


            /* ==========================================
               LIMPIAR FORMULARIO
               ========================================== */

            formulario.reset();

        }
    );

}
    /* =====================================================
       ANIMACIÓN DE TARJETAS
       ===================================================== */

    const tarjetas =
        document.querySelectorAll(
            ".herramienta-card, .servicio-grande, .gestion-card"
        );


    tarjetas.forEach(function (tarjeta) {

        tarjeta.addEventListener(
            "mouseenter",
            function () {

                this.style.transition =
                    "0.3s ease";
            }
        );
    });


    /* =====================================================
       MENSAJES DE CONSOLA
       ===================================================== */

    console.log(
        "FatiGestión - Página cargada correctamente."
    );

    console.log(
        "JavaScript funcionando correctamente."
    );

});
