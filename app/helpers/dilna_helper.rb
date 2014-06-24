module DilnaHelper
  def attach_threejs
    content_for :naradi, javascript_include_tag('/three.js/three.js')
    if block_given?
      args = yield
      if args.is_a? Array
        args.each{|file| content_for :naradi, javascript_include_tag(file)}
      end
    end
  end
end