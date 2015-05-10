module Nesselsburg
  module GamesAssets

    def self.templates_hash(from_file)
      game_path = game_path_for from_file
      Dir["#{game_path}/templates/*.hb"].inject({}) do |h, file|
        key = file[/templates\/(\w+)\.hb/, 1]
        h[key] = File.read file
        h
      end
      end

    def self.shaders_hash(from_file)
      game_path = game_path_for from_file
      Dir["#{game_path}/shaders/*"].inject({}) do |h, file|
        key = file[/shaders\/(\w+)/, 1]
        h[key] = File.read file
        h
      end
    end

    private

    def self.game_path_for(file)
      file[/^(.+\/app\/games\/\w+).*/, 1]
    end

  end
end