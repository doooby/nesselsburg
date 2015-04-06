
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
        console.log(this.$vypis[0]);
        this.$vypis.prepend('<div>'+udalost.text+'</div>');
    }
});


