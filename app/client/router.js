Object.defineProperty(JNES, 'router', {
    enumerable: true,
    value: new (Backbone.Router.extend({
        routes: {
            '': function () {this.prejdi('nadvori');},
            'hra/:id': 'nactiHru',
            '*kam': 'prejdi'
        },

        nactiHru: function (id) {
            (new JNES.views.Dilna).nactiHru(id);
        },
        prejdi: function (kam) {
            var view = null;
            switch (kam) {
                case 'nadvori':
                    view = 'Nadvori';
                    break;
                case 'dilna':
                    view = 'Dilna';
                    break;
            }
            if (typeof view==='string') {
                (new JNES.views[view]).render();
            }
        }
    }))()
});