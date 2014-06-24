class J3O.TextureHolder
    constructor: (opts) ->
        @warehouse = {}
        @prefix = '/assets' + (opts['prefix'] || '')
        @suffix = opts['suffix'] || ''
    get: (name, cb) ->
        t = @warehouse[name]
        if t==undefined
            t = cb(@prefix + '/' + name + @suffix)
            @warehouse[name] = t
        t
