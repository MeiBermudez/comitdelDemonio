$(document).ready(function () {
    $('#task-result').hide();
    cargarTabla();

    $('#busqueda').submit(function (e) {
        console.log('buscar');
        e.preventDefault();

    })
    //funcion de busqueda
    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $("#search").val();
            $.ajax({
                url: 'http://localhost/biblioteca/ajax/escuelasAjax.php',
                type: 'POST',
                data: { search, opcion: "buscar" },
                success: function (response) {
                    console.log(response)
                    let tabla = JSON.parse(response);
                    let template = "";
                    tabla.forEach(tabla => {
                        template += `<tr>
                                        <td>${tabla.nombre}</td>
                                        <td>${tabla.idEscuela}</td>
                                    </tr>`;
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            })
        }
    });

    //funcion para agregar
    $('#task-form').submit(function (e) {
        console.log('agregar');
        e.preventDefault();
        const data = {
            nombre: $('#name').val(),
            director: $('#director').val(),
            opcion: "agregar"
        }

        $.post('http://localhost/biblioteca/ajax/escuelasAjax.php', data,
            function (response) {
                //console.log(response);
                $('#respuesta').html(response.replace(/\r?\n|\r/g, ''));
                setTimeout(function () {
                    $('#respuesta').html('');
                }, 2500);
                $('#task-form').trigger('reset');
                cargarTabla();
            });

    })

    function cargarTabla(){
        $.ajax({
            url: 'http://localhost/biblioteca/ajax/tablaEscuelas.php',
            type: 'GET',
            success: function (response) {
                let tabla = JSON.parse(response);
                let template = '';
                tabla.forEach(
                    escuelas => {
                        template += `<tr idG="${escuelas.idEscuela}" >
                    <td>${escuelas.idEscuela}</td>
                    <td>${escuelas.nombre}</td>
                    <td>${escuelas.director}</td>
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
    $(document).on('click','.deleteBtn',function(){
        let element=$(this)[0].parentElement.parentElement;
        //console.log(elememt)
        let id=$(element).attr("idG");
        //console.log(id);
        const data = {
            cod:id,
            opcion: "eliminar"
        }
        $.post('http://localhost/biblioteca/ajax/escuelasAjax.php', data,
            function (response) {
                $('#respuesta').html(response.replace(/\r?\n|\r/g, ''));
                setTimeout(function () {
                    $('#respuesta').html('');
                }, 2500);
                $('#task-form').trigger('reset');
                
                cargarTabla();
            });
    })


});

