function init(){
   
}

$(document).ready(function(){
    var tick_id = getUrlParameter('ID');
    listardetalle(tick_id);
    console.log(tick_id);

    $('#tick_estre').on('rating.change', function() {
        console.log($('#tick_estre').val());
    });

});

function listardetalle(tick_id){
    $.post("../../controller/ticket.php?op=mostrar", { tick_id : tick_id }, function (data) {
        data = JSON.parse(data);
        $('#lblestado').val(data.tick_estado_texto);
        $('#lblnomusuario').val(data.usu_nom +' '+data.usu_ape);
        $('#lblfechcrea').val(data.fech_crea);
        $('#lblnomidticket').val(data.tick_id);
        $('#cat_nom').val(data.cat_nom);
        $('#cats_nom').val(data.cats_nom);
        $('#tick_titulo').val(data.tick_titulo);

        if (data.tick_estado_texto=='Abierto') {
            window.open('http://localhost:90/HELPDESK/','_self');
        }else{
            if (data.tick_estre==null){

            }else{
                $('#panel1').hide();
            }
        }
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).on("click","#btnguardar", function(){
    var tick_id = getUrlParameter('ID');
    var tick_estre = $('#tick_estre').val(); 
    var tick_coment = $('#tick_coment').val();

    $.post("../../controller/ticket.php?op=encuesta", { tick_id : tick_id,tick_estre:tick_estre,tick_coment:tick_coment}, function (data) {
        console.log(data);
        $('#panel1').hide();
        swal("Correcto!", "Gracias por su Tiempo", "success");
    }); 
});