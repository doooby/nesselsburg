Dir[Rails.root.join('lib', 'assets', '*.rb')].each{|file| require file}


c = Rails.application.config
c.assets.paths << Rails.root.join('lib', 'games')
c.assets.precompile += %w(predhradi.css hrad.css predhradi.js hrad.js)
c.assets.precompile += %w(*/main.js */main.css */graphics/*)

NonStupidDigestAssets.whitelist << /\w+\/graphics\/.*/

# soubory s názvem app.js jsou uzavřeny do    (function(){ <kód> })();
Rails.application.assets.register_compressor 'application/javascript', :uglifier, Sprockets::EnclosingCompressor