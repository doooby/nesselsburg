/**
 * Created by doooby on 5.4.15.
 */

JNES.views.Dilna = Backbone.View.extend({
    el: '#container',
    initialize: function () {
        this.template = Handlebars.compile($('#dilna-template').html());
    },
    render: function () {
        this.$el.html(this.template());
    },
    nactiHru: function (id) {
        var _this = this;
        $.getScript('/assets/'+id+'/main.js', function () {
            JNES.trigger('get_game', function (hra) {
                if (typeof hra ==='object' && hra.id===id) {
                    hra.attachGame(_this.$el, JNES.utils);
                }
            });
        });
    }
});