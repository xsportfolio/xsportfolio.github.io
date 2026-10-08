    function aForms() {


        let form = $('form');

        form.each(function () {

            let $this = $(this),
                input = $this.find(":input");


            input.on('focus', function () {

                let $this = $(this),
                    fieldWrap = $this.parent('div');

                fieldWrap.addClass('focus')


            })

            input.on('focusout', function () {

                let $this = $(this),
                    fieldWrap = $this.parent('div');

                if (!$(this).val()) {
                    fieldWrap.removeClass('focus')

                }






            })

        })


    }


    /** Forms **/


    /** Number Counter **/

