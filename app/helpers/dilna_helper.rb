module DilnaHelper

  def vem_naradi(arr=nil)
    case arr
      when String
        content_for :hrad_head, javascript_include_tag(arr)
      when Array
        content_for :hrad_head, arr.each{|file| javascript_include_tag(file)}.join.html_safe
    end
    content_for :hrad_head, yield if block_given?
  end

  def link_na_prostranstvi(napis, projekt)
    link_to napis, dilna_prostranstvi_path(projekt: projekt)
  end

end