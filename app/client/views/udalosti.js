
JNES.views.Udalosti = Backbone.View.extend({
    el: '#udalosti',
    initialize: function () {
        this.template = Handlebars.compile($('#udalosti-template').html());
        this.render();
        this.$vypis = this.$el.find('#vypis');
    },
    render: function () {
        this.$el.html(this.template());
    },
    vypis: function (udalost) {

        this.$vypis.prepend('<div class="'+udalost.class+'">'+udalost.text+'</div>');

//        printout_tag.append(div);
//        printout_tag.scrollTop(printout_tag.prop('scrollHeight'));
    }
});


