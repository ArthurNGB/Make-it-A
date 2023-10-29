$(document).ready(function(data){
    $.getJSON("main.json", function(data){
        console.log(data)

        $('.a-box-item-1').html(data.AtrNome);
        $('.a-box-item-2-1').html(data.AtrData);
        $('.sd-box-item-1').html(data.SdNome);
        $('.h-box-item-1').html(data.HjNome);
        $('.h-box-item-2').html(data.HjData);
        $('.em-box-item-1').html(data.EmNome);
        $('.em-box-item-2').html(data.EmData);

    }).fail(function(){
        console.log("Revise seu codigo")
    })
})