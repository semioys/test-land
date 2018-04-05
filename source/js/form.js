(function() {
  var me = {};
  var form = document.querySelector('.form-container');
  var closeButton = null;

  function onClose() {
    me.close();
    closeButton.removeEventListener('click', onClose);
  }

  me.open = function() {
    form.classList.remove('is-hidden');

    closeButton = document.querySelector('.form__close--button');
    closeButton.addEventListener('click', onClose);
  };

  me.close = function() {
    form.classList.add('is-hidden');
  };

  me.isValid = function() {
    var requiredFields = {
      allFields: document.querySelectorAll('[data-valid="required"]'),
      email: document.querySelector('[data-email]').value,
      phone: document.querySelector('[data-number]').value
    };

    if(!me.isAllCompleted(requiredFields.allFields)) {
      console.log('Заполните все поля');
      return false;
    } else if(!wyless.validation.isEmail(requiredFields.email)) {
      console.log('Wrong email');
      return false;
    } else if(!wyless.validation.isNumber(requiredFields.phone)) {
      console.log('Wrong phone number');
      return false;
    }
    return true;
  };

  me.isAllCompleted = function(data) {
    var result = true;

    for (var i = 0; i < data.length; i++) {
      if (!wyless.validation.isNotEmpty(data[i].value)) {
        result = false;
        break;
      }
    }

    return result;
  }

  wyless.form = me;
}());