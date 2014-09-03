module NesselsburgSprockets
  class EnclosingCompressor < Sprockets::UglifierCompressor

    def prepare; end

    def evaluate(scope, locals, &block)
      opts = {comments: :none}
      opts[:enclose] = {} if @file=~/\/bundled_base[^\/]*$/
      Uglifier.compile data, opts
    end

  end
end