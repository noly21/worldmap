//register
$(document).on('click','#btn-register', function() {
    let username = $('#reg_username').val();
    let password = $('#reg_password').val();

    $.ajax({
        url : 'https://localhost/worldmap/api/register.php',
        type : 'POST',
        data : {
            username : username,
            password : password
        },
        success : function(data) {
            let parseData = JSON.parse(data);
            if(parseData.status == "inserted") {
                alert('register successfully');
                location.href = 'home-user.html'; 
            }
            else {
                alert('Failed to Register');
            }
        }
    });
});