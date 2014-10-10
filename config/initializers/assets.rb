
c = Rails.application.config
c.assets.paths << Rails.root.join('lib', 'games')
c.assets.precompile += %w(predhradi.css hrad.css predhradi.js hrad.js)
c.assets.precompile += %w(j3o.1.js j3o.2.js s3ocket.js games_data.js)
c.assets.precompile += %w(*/main.js */main.css)

# soubory s názvem bundled_base.js jsou uzavřeny do    (function(){ <kód> })();
Rails.application.assets.register_compressor 'application/javascript', :uglifier, NesselsburgSprockets::EnclosingCompressor