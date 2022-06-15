window.addEventListener('load', function()  {
    let form = document.querySelector('.form-complete');
    let firstName = document.querySelector('#first_name');
    let lastName = document.querySelector('#last_name');
    let email = document.querySelector('#email');
    let image = document.querySelector('#avatar');
    let password = document.querySelector('#password');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let valor = email.value;
        let mailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        let testeoMail = mailRegExp.test(valor);
            if(testeoMail == false) {
             return alert('Ingrese un email valido');
            };

        if(password.value.length < 8) {
            return alert("Ingrese una contraseña valida, minimo 8 caracteres");
        };
        
        if ( testeoMail == true && password.value.length >= 8) {
            form.submit();
        }
    });

});

