/**
 * Created by doooby on 5.4.15.
 */

JNES.views.Nadvori = Backbone.View.extend({
    el: '#container',
    initialize: function () {
        this.template = Handlebars.compile($('#nadvori-template').html());
    },
    render: function () {
        this.$el.html(this.template());
    }
});