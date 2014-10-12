
c = Rails.application.config
c.assets.paths << Rails.root.join('lib', 'games')
c.assets.precompile += %w(predhradi.css hrad.css predhradi.js hrad.js)
c.assets.precompile += %w(*/main.js */main.css */graphics/*)

NonStupidDigestAssets.whitelist << /\w+\/graphics\/.*/

# soubory s názvem main.js jsou uzavřeny do    (function(){ <kód> })();
Rails.application.assets.register_compressor 'application/javascript', :uglifier, NesselsburgSprockets::EnclosingCompressor