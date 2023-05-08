
$(document).ready(function() {
    // Agregar evento submit al formulario con id "busqueda"
    $("#busqueda").submit(function(event) {
      event.preventDefault();
      // Obtener valor de búsqueda y fecha de devolución
      let search = $("#search").val();
      let fechaDevolucion = $("#fechaDevolucion").val();
      // Llamar a la función para hacer la búsqueda usando AJAX
      buscarPrestamos(search, fechaDevolucion);
    });
  });
  
  // Función para hacer la búsqueda de préstamos usando AJAX
  function buscarPrestamos(search, fechaDevolucion) {
    $.ajax({
      url: "tu_archivo_php.php",
      type: "POST",
      data: {
        search: search,
        fechaDevolucion: fechaDevolucion
      },
      success: function(response) {
        // Manejar la respuesta del servidor
      },
      error: function(xhr, status, error) {
        // Manejar errores
      }
    });
  }
  

  // busqueda por fecha
  function buscarPorFecha() {
    let fechaDevolucion = $("#fechaDevolucion").val();
  
    $.ajax({
      url: 'http://localhost/biblioteca/ajax/prestamosAjax.php',
      type: 'POST',
      data: { 
        fechaDevolucion: fechaDevolucion,
        opcion: "buscar-fecha" 
      },
      success: function (response) {
        // ...
      }
    });
  }

function cargarTabla() {
    $.ajax({
        url: 'http://localhost/biblioteca/ajax/tablaPrestamos.php',
        type: 'GET',
        success: function (response) {
            let tabla = JSON.parse(response);
            let template = '';
            tabla.forEach(
                prestamos => {
                    template += `<tr idG="${prestamos.id}" >
                <td>${prestamos.id}</td>
                <td>${prestamos.alumno}</td>
                <td>${prestamos.libro}</td>
                <td>${prestamos.fechaDevolucion}</td>
                <td>${prestamos.estado}</td>
                <td>
                <button class="deleteBtn btn btn-danger">
                Borrar
                </button>
                </td>
                            </tr>`
                })
            //console.log(template);
            $('#tasks').html(template);
        }
    })
}