
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# config.assets.precompile = ['*.css', '**/*.css']
precompile_arr = Rails.application.config.assets.precompile
precompile_arr += %w(predhradi.css hrad.css)
precompile_arr += %w(games/*.css)
precompile_arr += %w(predhradi.js hrad.js)
precompile_arr += %w(games/*/base.js games/*/bundled_base.js)
Rails.application.config.assets.precompile =  precompile_arr

# soubory s názvem bundled_base.js jsou uzavřeny do    (function(){ <kód> })();
Rails.application.assets.register_compressor 'application/javascript', :uglifier, NesselsburgSprockets::EnclosingCompressor