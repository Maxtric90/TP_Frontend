class Vida{
    constructor(nombre, sexo, documento, fechaNacimiento, estado){
        this.nombre=nombre;
        this.sexo=sexo;
        this.documento=documento;
        this.fechaNacimiento=fechaNacimiento;
        this.estado=estado;
    }
}

const nomina=[];

nomina.push(new Vida("Maximiliano Ortiz", "Masculino", 34567890, "02/07/1990", "Stock"));
nomina.push(new Vida("Matias Ortiz", "Masculino", 43456789, "02/07/1990", "Stock"));

displayVisualizarNomina();


function displayModificarNomina(){
    const seccionPrincipal = document.getElementById("seccionPrincipal");
    seccionPrincipal.innerHTML=`
    <h3>Actualización manual de nómina</h3>
    <p class="textoExplicativo">Aquí podrá revisar la nómina actual y agregar personas a la misma. Al finalizar debe clikear sobre el botón "Descargar CSV" para generar el archivo con el formato apropiado.</p>
    <div id="containerNomina">
    </div>
    <br>
    <button id="descargarCSV" onclick="descargarCSV()">Descargar CSV</button>`;

    recargaTablaNomina();
}

function displayVisualizarNomina(){
    const seccionPrincipal = document.getElementById("seccionPrincipal");
    seccionPrincipal.innerHTML=`
    <h3>Visualización de nómina</h3>
    <p class="textoExplicativo">Esta es la cartera de asegurados que dispone:</p>
    <div id="containerCards">
    </div>`;

    const divContainerCards = document.getElementById("containerCards");

    let cards="";
    nomina.forEach((persona,indice)=> {
        cards+=`
        <div class="cardPersona" id="persona${indice}">
            <div class="cardPersonaImagen">
                <img src="imgs/person.png" width="100%">
            </div>
            <div class="cardPersonaTexto">
                <strong>Nombre:</strong>${persona.nombre}<br>
                <strong>Sexo:</strong> ${persona.sexo}<br>
                <strong>DNI:</strong> ${persona.documento}<br>
                <strong>Fec. Nacimiento:</strong> ${persona.fechaNacimiento}<br>
            </div>
        </div>
        `        
    })

    divContainerCards.innerHTML=cards;
}

function displayConsultas(){
    const seccionPrincipal = document.getElementById("seccionPrincipal");
    seccionPrincipal.innerHTML=`
    <h3>Contáctenos</h3>
    <p class="textoExplicativo">Para contactarse con nosotros por favor ingrese los siguientes datos: </p>
    <div id="formularioConsulta">
        <form action="#" name="formularioConsulta">
            <label for="formName">Nombre </label>
            <input type="text" id="formName" name="nombre" value="" autofocus="true">
            <label for="formApellido">Apellido </label>
            <input type="text" id="formApellido" name="apellido" value=""><br>
            <label for="formEmail">E-mail </label>
            <input type="email" id="formEmail" name="email" value="" size="50"><br>
            <label for="formMotivo">Motivo </label>
            <select id="formMotivo" name="motivo">
                <option value="Solicitar facturación">Solicitar Facturación</option>
                <option value="Errores en la nómina">Errores en la nómina</option>
                <option value="Otro motivo">Otro Motivo</option>
            </select><br>
            <label for="formComentarios">Comentarios: </label><br>
            <textarea id="formComentarios" name="comentarios" cols="60" rows="10"></textarea><br>
            <input type="submit" id="formSubmit" value="Enviar">
        </form>
    </div>`;

    document.getElementById("formSubmit").addEventListener("click", function(event){
        event.preventDefault()
        let formulario = document.forms["formularioConsulta"];
        if(formulario.nombre.value ==="" || formulario.apellido.value ==="" || formulario.email.value ===""){
            alert("Debe completar todos los campos de contacto para continuar.")
        }else alert("Consulta enviada con éxito");
    });
}

function addVida(){
    let nombre=document.getElementById("inputNombre").value;
    let sexo=document.getElementById("inputSexo").value;
    let documento=document.getElementById("inputDocumento").value;
    let fechaNacimiento=document.getElementById("inputFechaNacimiento").value;
    if(nombre==="" || documento==="" || fechaNacimiento==="" || isNaN(documento)){
        alert("Debe completar todos los campos adecuadamente para continuar")
    }else{
        nomina.push(new Vida(nombre,sexo,parseInt(documento),fechaNacimiento, "Alta"));
        recargaTablaNomina();
    }
}

//Esto es para borrar vidas en un futuro
function deleteVida(){
    //nomina.splice(event.srcElement.id.match(/\d+/g)[0]-1,1);
    nomina[event.srcElement.id.match(/\d+/g)[0]-1].estado="Baja";
    recargaTablaNomina();
}

function recargaTablaNomina(){
    const tablaNomina=document.querySelector("#containerNomina");
    tablaNomina.innerHTML="";

    tablaNomina.innerHTML+=`
    <div class="filaNomina">
        <div class="headerNomina nominaOrdinal">#</div>
        <div class="headerNomina nominaNombre">Nombre</div>
        <div class="headerNomina nominaSexo">Sexo</div>
        <div class="headerNomina nominaDNI">DNI</div>
        <div class="headerNomina nominaFechaNacimiento">Fecha Nac.</div>
        <div class="headerNomina nominaEstado">Estado</div>
        <div class="headerNomina nominaAccion"></div>
    </div>`;

    let interiorTabla="";
    let index=1;
    for (let element of nomina){
        interiorTabla+=`
        <div id="fila${index}" class="filaNomina">
            <div class="contenidoNomina nominaOrdinal">${index}</div>
            <div class="contenidoNomina nominaNombre">${element.nombre}</div>
            <div class="contenidoNomina nominaSexo">${element.sexo}</div>
            <div class="contenidoNomina nominaDNI">${element.documento}</div>
            <div class="contenidoNomina nominaFechaNacimiento">${element.fechaNacimiento}</div>
            <div class="contenidoNomina nominaEstado">${element.estado}</div>
            <div class="contenidoNomina nominaAccion"></div>
        </div>`;
        index++;
    }

    tablaNomina.innerHTML+=interiorTabla;

    tablaNomina.innerHTML+=`
    <div id="add" class="filaNomina">
        <div class="filaAgregar nominaOrdinal"></div>
        <div class="filaAgregar nominaNombre"><input id="inputNombre"></div>
        <div class="filaAgregar nominaSexo">
            <select id="inputSexo">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            </select>
        </div>
        <div class="filaAgregar nominaDNI"><input id="inputDocumento"></div>
        <div class="filaAgregar nominaFechaNacimiento"><input type="date" id="inputFechaNacimiento"></div>
        <div class="filaAgregar nominaEstado"></div>
        <div class="filaAgregar nominaAccion"><a href="#" id="addButton"><i class="fa-solid fa-circle-plus"></i></a></div>
    </div>`


    const addButton=document.getElementById("addButton");
    addButton.addEventListener("click", addVida);

    //Esto es para agregar en un futuro la posibilidad de borrar vidas
    // const deleteButtons=document.querySelectorAll(".deleteButton");
    // for(let element of deleteButtons){
    //     element.addEventListener("click", deleteVida);
    // }
    // console.log(nomina);
}

function descargarCSV(){
    
    let contenido="data:text/csv;charset=utf-8,";

    contenido+=`RAZON SOCIAL: ;;;;;;;;;;;\nCUIT:;DDD;;;;;;;;;;\n;;;;;;;;;;;\nT I T U L A R;;;;;;;;;Estado;Fecha Novedad;
Legajo;Apellido;Nombre;Sexo;Fecha Nacimiento;Tipo Doc.;Nro. Doc.;CUIL;CATEGORIA ;;;Observaciones\n`
    nomina.forEach(vida =>{
        contenido+=`;${vida.nombre};;${vida.sexo};${vida.fechaNacimiento};DNI;${vida.documento};;\n`
    })

    console.log(contenido);
    var encodedUri = encodeURI(contenido);
    window.open(encodedUri);
}

function toggleMenu(){
    let barraSecundaria=document.getElementById("barraSecundaria");
    if(barraSecundaria.style.visibility==="hidden"){
        barraSecundaria.style.visibility="visible";
    }else{
        barraSecundaria.style.visibility="hidden"
    }
}