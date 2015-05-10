
JNES.views.Menu = Backbone.View.extend({
    el: '#menu',
    initialize: function () {
        this.template = Handlebars.compile($('#menu-template').html());
        this.render();
    },
    render: function () {
        this.$el.html(this.template());
    }
});


