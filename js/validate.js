(function() {
    var form = document.forms.form;
    var elems = form.elements;



    // фокус
    elems.email.onfocus = function () {
        document.querySelector('input[name="email"] + label').classList.add('filled_field');
        resetError(elems.email);
        if (elems.email.classList.contains('correct_data')) {
            elems.email.classList.remove('correct_data');
        }
    };

    // потеря фокуса
    elems.email.onblur = function () {
        if (this.value == "") {
            document.querySelector('input[name="email"] + label').classList.remove('filled_field');
            document.querySelector('input[name="email"] ~ .reset').style.display = "none";
        }

    };

    // фокус
    elems.name.onfocus = function () {
        document.querySelector('input[name="name"] + label').classList.add('filled_field');
        resetError(elems.name);
        if (elems.name.classList.contains('correct_data')) {
            elems.name.classList.remove('correct_data');
        }
    };

    // потеря фокуса
    elems.name.onblur = function () {
        if (this.value == "") {
            document.querySelector('input[name="name"] + label').classList.remove('filled_field');
            document.querySelector('input[name="name"] ~ .reset').style.display = "none";
        }

    };



    // нажатие клавиши
    elems.email.onkeydown = function () {
      document.querySelector('input[name="email"] ~ .reset').style.display="block";

    };

    elems.name.onkeydown = function () {
        document.querySelector('input[name="name"] ~ .reset').style.display="block";
    };

    // клик на кнопке очистить поле
    document.querySelector('input[name="email"] ~ .reset').onclick = function () {
        this.style.display = "none";
        document.querySelector('input[name="email"]').value = "";
        document.querySelector('input[name="email"]').focus();

    };


    document.querySelector('input[name="name"] ~ .reset').onclick = function () {
        this.style.display = "none";
        document.querySelector('input[name="name"]').value = "";
        document.querySelector('input[name="name"]').focus();

    };

    // клик по селекту
    elems.country.onclick = function () {
      if (this.classList.contains('incorrect_data')) {
          this.classList.remove('incorrect_data');
          elems.country.parentNode.removeChild(elems.country.parentNode.lastChild);
      }

      if (this.classList.contains('correct_data')) {
          this.classList.remove('correct_data');
      }
    };

    elems.agreement.onclick = function () {
        if (document.querySelector('.checkbox_block label').classList.contains('incorrect_checkbox')) {
            document.querySelector('.checkbox_block label').classList.remove('incorrect_checkbox');
        }
        if (document.querySelector('.checkbox_block label').classList.contains('correct_checkbox')) {
            document.querySelector('.checkbox_block label').classList.remove('correct_checkbox');
        }
    };


    // выводит сообщение об ошибке
    function showMessage(text, container) {
        var msgElem = document.createElement('span');
        msgElem.innerHTML = text;
        msgElem.className = "header_form__message";
        container.parentNode.appendChild(msgElem);
    }

    // удалет сообщение об ошибке
    function resetError(container) {
        if (container.classList.contains('incorrect_data')) {
            container.classList.remove('incorrect_data');
            container.parentNode.removeChild(container.parentNode.lastChild);
        }

    }

    
    // функция валидации
    function validate() {
        var sent = true;


        // name
        var nameRe = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/;
        if (!nameRe.test(elems.name.value)) {
            if (!elems.name.classList.contains('incorrect_data')) {
                if (elems.name.classList.contains('correct_data')) {
                    elems.name.classList.remove('correct_data');
                }

                elems.name.classList.add('incorrect_data');
                showMessage('Enter correct name', elems.name);
            }

            sent = false;

        }
        else {
            if (!elems.name.classList.contains('correct_data')) {
                elems.name.classList.add('correct_data');
            }
        }




        // email
        var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRe.test(elems.email.value)) {
            if (!elems.email.classList.contains('incorrect_data')) {
                if (elems.email.classList.contains('correct_data')) {
                    elems.email.classList.remove('correct_data');
                }

                elems.email.classList.add('incorrect_data');
                showMessage('Enter correct E-Mail', elems.email);
            }
            sent = false;
        }
        else {
            if (!elems.email.classList.contains('correct_data')) {
                elems.email.classList.add('correct_data');
            }
        }


        // select
        if (elems.country.value == "0") {
            if (!elems.country.classList.contains('incorrect_data')) {
                if (elems.country.classList.contains('correct_data')) {
                    elems.country.classList.remove('correct_data');
                }

                elems.country.classList.add('incorrect_data');
                showMessage('Select the country', elems.country);
            }
            sent = false;
        }
        else {
            if (!elems.country.classList.contains('correct_data')) {
                elems.country.classList.add('correct_data');
            }
        }


        // checkbox
        if(!elems.agreement.checked) {
            if (!document.querySelector('.checkbox_block label').classList.contains('incorrect_checkbox')) {
                if (document.querySelector('.checkbox_block label').classList.contains('correct_checkbox')) {
                    document.querySelector('.checkbox_block label').classList.remove('correct_checkbox');
                }

                document.querySelector('.checkbox_block label').classList.add('incorrect_checkbox');
            }
            sent = false;
        }
        else {
            if (!document.querySelector('.checkbox_block label').classList.contains('correct_checkbox')) {
                document.querySelector('.checkbox_block label').classList.add('correct_checkbox');
            }
        }

        // отправление данных, очистка формы через 1 секунду
        if (sent) {
            setTimeout(function() {
                elems.email.value = "";
                document.querySelector('input[name="email"] + label').classList.remove('filled_field');
                document.querySelector('input[name="email"] ~ .reset').style.display="none";
                if (elems.email.classList.contains('correct_data')) {
                    elems.email.classList.remove('correct_data');
                }

                elems.name.value = "";
                document.querySelector('input[name="name"] + label').classList.remove('filled_field');
                document.querySelector('input[name="name"] ~ .reset').style.display="none";
                if (elems.name.classList.contains('correct_data')) {
                    elems.name.classList.remove('correct_data');
                }


                elems.country.value = "0";
                if (elems.country.classList.contains('correct_data')) {
                    elems.country.classList.remove('correct_data');
                }

                elems.agreement.click();

                if (document.querySelector('.checkbox_block label').classList.contains('correct_checkbox')) {
                    document.querySelector('.checkbox_block label').classList.remove('correct_checkbox');
                }
            }, 1000);
        }
    }


    // нажатие кнопки - запуск валидации формы
    var btnForm = document.getElementsByClassName('btnForm')[0];
    btnForm.onclick = validate;
})();