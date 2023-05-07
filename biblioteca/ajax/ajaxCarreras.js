$(document).ready(function () {
  $('#task-result').hide();
  cargarTabla();
  cargarSelectEscuelas();

  $('#busqueda').submit(function (e) {
      console.log('buscar');
      e.preventDefault();
  });

  //funcion de busqueda
  $('#search').keyup(function (e) {
      if ($('#search').val()) {
          let search = $("#search").val();
          $.ajax({
              url: 'http://localhost/biblioteca/ajax/carrerasAjax.php',
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
          });
      }
  });

  //funcion para agregar
  $('#task-form').submit(function (e) {
      console.log('agregar');
      e.preventDefault();
      const data = {
          nombreCarrera: $('#name').val(),
          asignaturas: $('#asignaturas').val(),
          idEscuelaCarrera:$('#escuelasOption').val(),
          opcion: "agregar"
      };

      $.post('http://localhost/biblioteca/ajax/carrerasAjax.php', data,
          function (response) {
              //console.log(response);
              $('#respuesta').html(response.replace(/\r?\n|\r/g, ''));
              setTimeout(function () {
                  $('#respuesta').html('');
              }, 2500);
              $('#task-form').trigger('reset');
              cargarTabla();
              cargarSelectEscuelas();
          });
  });

  function cargarTabla(){
      $.ajax({
          url: 'http://localhost/biblioteca/ajax/tablaCarreras.php',
          type: 'GET',
          success: function (response) {
              let tabla = JSON.parse(response);
              let template = '';
              tabla.forEach(
                carreras => {
                  template += `<tr idG="${carreras.idCarrera}" >
              <td>${carreras.idCarrera}</td>
              <td>${carreras.nombreCarrera}</td>
              <td>${carreras.nombreCarrera}</td>
              <td>${carreras.asignaturas}</td>
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

  function cargarSelectEscuelas() {
      const select = document.getElementById("escuelasOption");

      fetch("http://localhost/biblioteca/ajax/tablaCarrerasEscuelas.php")
        .then(response => response.json())
        .then(data => {
          data.forEach(escuela => {
            const option = document.createElement("option");
            option.value = escuela.idEscuela;
            option.text = escuela.nombre;
            select.appendChild(option);
          });
        })
        .catch(error => {
          console.error(error);
        });
  }

  $(document).on('click','.deleteBtn',function(){
      let element=$(this)[0].parentElement.parentElement;
      //console.log(elememt)
      let id=$(element).attr("idG");
      //console.log(id);
      const data = {
          id:id,
          opcion: "eliminar"
      }
      $.post('http://localhost/biblioteca/ajax/carrerasAjax.php', data,
          function (response) {
              $('#respuesta').html(response.replace(/\r?\n|\r/g ,''));
              setTimeout(function () {
                  $('#respuesta').html('');
              }, 2500);
              $('#task-form').trigger('reset');
              
              cargarTabla();
          });
  })


});




