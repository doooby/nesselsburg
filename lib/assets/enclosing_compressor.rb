class Sprockets::EnclosingCompressor < Sprockets::UglifierCompressor

  def prepare; end

  def evaluate(scope, locals, &block)
    opts = {comments: :none}
    opts[:enclose] = {} if @file=~/\/app\.js$/
    Uglifier.compile data, opts
  end

end
