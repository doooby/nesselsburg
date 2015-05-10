Dir[Rails.root.join('app', 'assets', '*.rb')].each{|file| require file}


c = Rails.application.config
c.assets.paths << Rails.root.join('app', 'client')
c.assets.paths << Rails.root.join('app', 'games')
c.assets.precompile += %w(predhradi.css hrad.css predhradi.js hrad.js */graphics/*)
# c.assets.precompile += %w(games/*/main.js games/*/main.css games/*/graphics/*)
c.assets.precompile += %w(kerkel/main.js)

NonStupidDigestAssets.whitelist << /\w+\/main\.js/
NonStupidDigestAssets.whitelist << /\w+\/graphics\//

# soubory s názvem app.js jsou uzavřeny do    (function(){ <kód> })();
Rails.application.assets.register_compressor 'application/javascript', :uglifier, Sprockets::EnclosingCompressor