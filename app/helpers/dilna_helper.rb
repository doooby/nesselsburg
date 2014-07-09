module DilnaHelper

  def vem_naradi(arr=nil)
    case arr
      when String
        content_for :hrad_head, javascript_include_tag(arr)
      when Array
        arr.each{|file| content_for :naradi, javascript_include_tag(file)}
    end
    content_for :hrad_head, yield if block_given?
  end

  def self_chat_okno(who)
    content_tag :div, class: 'self_chat', data: {who: who} do
      inner = content_tag :div, nil, class: 'vypis'
      inner += text_area_tag "#{who}_zapis", nil, class: 'zapis', size: '30x3'
      inner += select_tag 'to_whom', options_for_select([['všichni', 'a'],['server', 's']])
    end
  end
end