const modalSignUp = $('.modal-signup')
        const modalSignUpBtn = $('.register__login-signup')
        const modalSignUpExit = $('.modal-signup .form-exit')
        const modalLoginBtn = $('.register__login-login')
        const modalLogin = $('.modal-login')
        const modalLoginSubmit = $('.modal-login .form-submit')
        const modalLoginExit = $('.modal-login .form-exit')
        const modalSwitchLogin = $('.modal-signup .switch-form a')
        const modalSwitchSignUp = $('.modal-login .switch-form a')
        // Switch on/off Sign Up Form
        modalSignUpBtn.onclick = function() {
            modalSignUp.classList.toggle('modal-signup--active')
        }

        modalSignUpExit.onclick = function(e) {
            modalSignUp.classList.remove('modal-signup--active')
        }

        modalSwitchSignUp.onclick = function() {
            modalLogin.classList.remove('modal-login--active')
            modalSignUp.classList.add('modal-signup--active')
        }

        //  Switch on/off Login Form
        modalLoginBtn.onclick = function() {
            modalLogin.classList.toggle('modal-login--active')
        }

        modalLoginSubmit.onclick = function(e) {
            e.preventDefault();
        }

        modalSwitchLogin.onclick = function() {
            modalSignUp.classList.remove('modal-signup--active')
            modalLogin.classList.add('modal-login--active')
        }

        modalLoginExit.onclick = function() {
            modalLogin.classList.remove('modal-login--active')
        }

        Validator({
            form : '#form-1',
            formGroup : '.form-group',
            errorMessage : '.form-message',
            rules : [
                Validator.isRequired('#fullname','Please add your name'),
                Validator.isRequired('#email','Please add your email'),
                Validator.isEmail('#email','Email is not vaild'),
                Validator.minLength('#password',6),
                Validator.isRequired('#password_confirmation'),
                Validator.isConfirmed('#password_confirmation', () => {
                    return document.querySelector('#form-1 #password').value
                }) 
            ],
            onSubmit: function (data) {
                console.log(data)
            },
        })