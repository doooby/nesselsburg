module Nesselsburg
  module ShadersLoader

    def self.add(key, file_path, shader)
      project = project_from_path file_path
      cp = projects_shaders_cache project
      raise "A shader associated with #{key} key already added." if cp.key? key
      cp[key] = shader.gsub("\n", '')
    end

    def self.[](key, file_path)
      project = project_from_path file_path
      projects_shaders_cache(project)[key]
    end

    private

    def self.shaders_cache
      @shaders_cache ||= {}
    end

    def self.project_from_path(file_path)
      file_path.match(/\/games\/(\w+)/)[1] || raise("Can't figure out the game directory from #{file_path}")
    end

    def self.projects_shaders_cache(project)
      pc = shaders_cache[project]
      unless pc
        shaders_cache[project] = {}
        load_for_project project
        pc = shaders_cache[project]
      end
      pc
    end

    def self.load_for_project(project)
      Dir[Rails.root.join(*%W(lib games #{project} shaders *.rb)).to_s].entries.each{|file| load file}
    end

  end
end