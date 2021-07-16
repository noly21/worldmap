//login
$(document).on('click','#btn-login', function() {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        url : 'https://localhost/worldmap/api/login.php',
        type : 'POST',
        data : {
            username : username,
            password : password
        },
        success : function(data) {
            let parseData = JSON.parse(data);
            if(parseData.status == "matched") {
                if(parseData.role == 1) {
                    location.href = 'home-admin.html'; 
                }
                if(parseData.role == 2) {
                    location.href = 'home-user.html'; 
                }
            }
            else {
                alert('Invalid Credentials');
            }
        }
    });
});