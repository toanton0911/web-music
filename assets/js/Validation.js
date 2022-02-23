// Constructor Function
function Validator (options) {
    // hàm lấy thẻ cha được chọn
    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    var selectorRules = {}

    // hàm thực hiện việc validate
    function validate (inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroup).querySelector(options.errorMessage)
        // var errorElement = inputElement.parentElement.querySelector(options.errorMessage)
        var errorMessage

        // Lấy ra rules của các selector
        var rules = selectorRules[rule.selector]
        // Lặp qua từng rules của các selector
        for (let i = 0; i < rules.length; i++) {

            switch(inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](inputElement.value)
                    break
                default: errorMessage = rules[i](inputElement.value)
            }
            if (errorMessage) break; // nếu có lỗi thì break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroup).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroup).classList.remove('invalid')
        }

        return !errorMessage
    }
    var formElement =  document.querySelector(options.form)
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true
            // validate tất cả các trường khi bấm nút submit
            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false
                }
            })

            

            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        values[input.name] = input.value
                        return values
                    }, {})
                    options.onSubmit(formValues)
                }
            }
        }

        // Xử lí lập qua mỗi rule và xử lí (lắng nghe sự kiện blur, input)
        options.rules.forEach(function (rule) {

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            // Lưu lại các rule cho mỗi input
            // selectorRules[rule.selector] = rule.test

            var inputElement = formElement.querySelector(rule.selector)
            
            if (inputElement) {
                // Xử lí trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                // Xử lí trường hợp đang nhập vào ô input
                inputElement.oninput = function (event) {
                    var errorElement = getParent(inputElement, options.formGroup).querySelector('.form-message')
                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroup).classList.remove('invalid')
                }
            }
        })
    }
}   

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || 'Please add this field'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Please add your email'
        }
    }
}

Validator.minLength = function(selector , min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Password must be ${min} characters long`
        }
    }
}

Validator.isConfirmed = (selector, getConfirmValue, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value === getConfirmValue() ? undefined : message || 'Password is not correct'
        }
    }
}