/* =========================================================
   FORMULARIO DE CONTACTO
   FatiGestión + Formspree
   ========================================================= */

const formulario = document.getElementById("formularioContacto");

if (formulario) {

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


    formulario.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

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

            const mensajeResultado =
                document.getElementById("mensajeFormulario");


            if (
                !nombreCampo ||
                !correoCampo ||
                !ayudaCampo ||
                !comentarioCampo
            ) {

                alert(
                    "❌ No se pudo realizar la consulta.\n\n" +
                    "Revisá que todos los campos estén correctamente configurados."
                );

                return;
            }


            const nombre =
                nombreCampo.value.trim();

            const correo =
                correoCampo.value.trim();

            const ayuda =
                ayudaCampo.value.trim();

            const comentario =
                comentarioCampo.value.trim();


            /* VALIDAR NOMBRE */

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


            /* VALIDAR CORREO */

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


            /* VALIDAR SERVICIO */

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


            /* VALIDAR CONSULTA */

            if (comentario === "") {

                alert(
                    "⚠️ Por favor, escribí tu comentario o consulta."
                );

                comentarioCampo.focus();

                return;
            }


            /* ENVIAR A FORMSPREE */

            const botonEnviar =
                formulario.querySelector(
                    'button[type="submit"]'
                );

            const textoOriginal =
                botonEnviar
                    ? botonEnviar.textContent
                    : "";


            if (botonEnviar) {

                botonEnviar.disabled = true;

                botonEnviar.textContent =
                    "Enviando...";

            }


            try {

                const respuesta =
                    await fetch(
                        "https://formspree.io/f/mbgraoak",
                        {
                            method: "POST",

                            body: new FormData(formulario),

                            headers: {
                                "Accept": "application/json"
                            }
                        }
                    );


                if (respuesta.ok) {

                    if (mensajeResultado) {

                        mensajeResultado.textContent =
                            "✅ ¡Consulta enviada correctamente! Te responderé a la brevedad.";

                        mensajeResultado.classList.add(
                            "exito"
                        );

                        mensajeResultado.classList.remove(
                            "error"
                        );

                    }


                    alert(
                        "✅ ¡Consulta enviada correctamente!\n\n" +
                        "Gracias por comunicarte con FatiGestión."
                    );


                    formulario.reset();


                } else {

                    if (mensajeResultado) {

                        mensajeResultado.textContent =
                            "❌ No se pudo enviar la consulta. Intentá nuevamente.";

                        mensajeResultado.classList.add(
                            "error"
                        );

                        mensajeResultado.classList.remove(
                            "exito"
                        );

                    }


                    alert(
                        "❌ No se pudo enviar la consulta.\n\n" +
                        "Intentá nuevamente en unos segundos."
                    );

                }


            } catch (error) {

                if (mensajeResultado) {

                    mensajeResultado.textContent =
                        "❌ No se pudo conectar con el servicio de envío.";

                    mensajeResultado.classList.add(
                        "error"
                    );

                    mensajeResultado.classList.remove(
                        "exito"
                    );

                }


                alert(
                    "❌ No se pudo enviar la consulta.\n\n" +
                    "Verificá tu conexión a Internet e intentá nuevamente."
                );

            }


            finally {

                if (botonEnviar) {

                    botonEnviar.disabled = false;

                    botonEnviar.textContent =
                        textoOriginal;

                }

            }

        }
    );

}
