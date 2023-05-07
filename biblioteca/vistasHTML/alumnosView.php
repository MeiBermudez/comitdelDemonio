<title>Alumnos</title>
<!--cremos toda la vista de escuelas para el formulario de agregar-->
<h1>Registrar Alumno</h1>

<div class="container">
    <div class="row p-4">
        <div class="col-md-5">
            <div class="card">
                <div class="card-body">
                    <!-- FORM TO ADD TASKS -->
                    <form id="task-form">
                        <div class="form-group">
                            <input type="text" id="name" placeholder="Nombre del Alumno" class="form-control">
                        </div><div class="form-group">
                            <input type="text" id="apellido" placeholder="Apellido del alumno" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="direccion" placeholder="direccion" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" id="telefono" placeholder="telefono" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="xd" class=form-label>escuela:</label>
                            <select name="xd" class="form-control" id="carrerasOption"></select>
                        </div>
                        <input type="hidden" id="taskId">
                        <button type="submit" class="btn btn-primary btn-block text-center">
                            Agregar
                        </button>
                    </form>
                    <div id="respuesta"></div>
                </div>
            </div>
        </div>

        <!-- TABLE  -->

        <div class="col-md-7">
            <form id="busqueda" class="form-inline my-2 my-lg-0">
                <input name="search" id="search" class="form-control mr-sm-2" type="search" placeholder="Search"
                    aria-label="Search">
                <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div class="card my-4" id="task-result">
                <div class="card-body">
                    <!-- SEARCH -->

                    <ul id="container"></ul>
                </div>
            </div>

            <table class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>Direccion</td>
                        <td>Telefono</td>
                        <td>ID Carrera</td>
                        <td>acciones</td>

                    </tr>
                </thead>
                <tbody id="tasks"></tbody>
            </table>
        </div>
    </div>
</div>
<script src="<?php URL ?>ajax/ajaxAlumnos.js"></script>