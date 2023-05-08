//ajax para agregar campos a cualquier tabla
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.FormularioAjax').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var url = form.getAttribute('action');
            var method = form.getAttribute('method');
            var data = new FormData(form);
            var respuestaSelector = form.getAttribute('data-respuesta');
            var respuesta = document.querySelector(respuestaSelector);
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    respuesta.innerHTML = xhr.responseText;
                }
            };
            xhr.send(data);
        });
    });
});
