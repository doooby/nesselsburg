# Dir[Rails.root.join('app', 'assets', '*.rb')].each{|file| require file}
require Rails.root.join('app', 'assets', 'enclosing_compressor.rb')


c = Rails.application.config
c.assets.paths << Rails.root.join('app', 'client')
c.assets.paths << Rails.root.join('app', 'games')
c.assets.precompile += %w(predhradi.css hrad.css predhradi.js hrad.js)
c.assets.precompile += %w(games/*/main.js games/*/main.css games/*/graphics/*)

NonStupidDigestAssets.whitelist << /app\/games\/.*/

# soubory s názvem app.js jsou uzavřeny do    (function(){ <kód> })();
Rails.application.assets.register_compressor 'application/javascript', :uglifier, Sprockets::EnclosingCompressor