$(document).ready(function () {
    cargarSelectEscuelas();
    $('#task-result').hide();
    cargarTabla();

  
    $('#busqueda').submit(function (e) {
        console.log('buscar');
        e.preventDefault();
    });
  
    //funcion de busqueda
    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $("#search").val();
            $.ajax({
                url: 'http://localhost/biblioteca/ajax/alumnosAjax.php',
                type: 'POST',
                data: { search, opcion: "buscar" },
                success: function (response) {
                    console.log(response)
                    let tabla = JSON.parse(response);
                    let template = "";
                    tabla.forEach(tabla => {
                        template += `<tr>
                                        <td>${tabla.idAlumno}</td>
                                        <td>${tabla.nombres}</td>
                                        <td>${tabla.apellidos}</td>
                                        <td>${tabla.direccion}</td>
                                        <td>${tabla.telefonos}</td>
                                    </tr>`;
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
    });
  
    //funcion para agregar
    $('#task-form').submit(function (e) {
        console.log('agregar');
        e.preventDefault();
        const data = {
            nombres: $('#name').val(),
            apellidos: $('#apellido').val(),
            direccion: $('#direccion').val(),
            telefonos: $('#telefono').val(),
            idCarreraAlumno: $('#carrerasOption').val(),
            opcion: "agregar"
        };
  
        $.post('http://localhost/biblioteca/ajax/alumnosAjax.php', data,
            function (response) {
                //console.log(response);
                $('#respuesta').html(response.replace(/\r?\n|\r/g, ''));
                setTimeout(function () {
                    $('#respuesta').html('');
                }, 2500);
                $('#task-form').trigger('reset');
                cargarTabla();
            });
    });
  
    function cargarTabla(){
        $.ajax({
            url: 'http://localhost/biblioteca/ajax/tablaAlumnos.php',
            type: 'GET',
            success: function (response) {
                let tabla = JSON.parse(response);
                let template = '';
                tabla.forEach(
                  alumno => {
                    template += `<tr idG="${alumno.idAlumno}" >
                <td>${alumno.idAlumno}</td>
                <td>${alumno.nombres}</td>
                <td>${alumno.apellidos}</td>
                <td>${alumno.direccion}</td>
                <td>${alumno.telefonos}</td>
                <td>${alumno.idCarreraAlumno}</td>
                <td>
                    <button class="deleteBtn btn btn-danger">
                    Borrar
                    </button>
                    </td>
                                </tr>`;
                    });
                    //console.log(template);
                    $('#tasks').html(template);
            }
        });
    }
   
    $(document).on('click','.deleteBtn',function(){
        let element=$(this)[0].parentElement.parentElement;
        //console.log(elememt)
        let id=$(element).attr("idG");
        //console.log(id);
        const data = {
            cod:id,
            opcion: "eliminar"
        }
        $.post('http://localhost/biblioteca/ajax/alumnosAjax.php', data,
            function (response) {
                $('#respuesta').html(response.replace(/\r?\n|\r/g ,''));
                setTimeout(function () {
                    $('#respuesta').html('');
                }, 2500);
                $('#task-form').trigger('reset');
                
                cargarTabla();
            });
    })
    function cargarSelectEscuelas() {
        const select = document.getElementById("carrerasOption");
  
        fetch("http://localhost/biblioteca/ajax/tablaAlumnosCarreras.php")
          .then(response => response.json())
          .then(data => {
            data.forEach(escuela => {
              const option = document.createElement("option");
              option.value = escuela.idCarrera;
              option.text = escuela.nombreCarrera;
              select.appendChild(option);
            });
          })
          .catch(error => {
            console.error(error);
          });
    }
});


  
  
  
  
  
  
  
  