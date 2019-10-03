$(document).ready(function () {
    var checks = document.querySelectorAll('.check'),
        saveValue,
        output = document.querySelector('.output');

    checks.forEach(function (el) {
        el.addEventListener('click', function () {
            if (el.value == 0) {
                toggleChecks(el.checked);
                output.value = el.checked || saveValue == undefined ? 0 : saveValue;
            } else {
                var data = $('form').serialize();
                $.ajax({
                    type: 'POST',
                    url: 'output.php',
                    data: data,
                    success: function (response) {
                        var res = JSON.parse(response);
                        saveValue = output.value = res.sum;
                        
                    }
                });
            }
        });
    });

    output.addEventListener('input', function () {
        flags = {};
        checks.forEach(function(el){
            flags[el.name] = el.value;
        });
        saveValue = this.value;
        $.ajax({
            type: 'POST',
            url: 'output.php',
            data: {input:this.value, data:flags},
            success: function (response) {
                try {
                var res = JSON.parse(response);
                setChecks(res);
                } catch (err){
                   alert(response);
                   output.value = null;
                   UnsetChecks();
                   
                }
            }
        });
    });

    function toggleChecks(boolean) {
        checks.forEach(function (elem) {
            if (elem.value != 0) {
                elem.disabled = boolean ? true : false;
            }
        });
    }

    function setChecks (arr){
       
        checks.forEach(function(elem){
            let res = arr.find( el => el == elem.name);
            if (res !=  undefined) {
                elem.checked = true;
            } else {
                elem.checked = false;
            }
        });
    }

    function UnsetChecks(){
        checks.forEach(function(elem){
           elem.checked = false;
        });
    }
});