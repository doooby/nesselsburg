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

  def self_chat_okno(who)
    content_tag :div, class: 'self_chat', data: {who: who} do
      inner = content_tag :div, nil, class: 'vypis'
      inner += text_area_tag "#{who}_zapis", nil, class: 'zapis', size: '30x3'
      inner += select_tag 'to_whom', options_for_select([['všichni', 'a'],['server', 's']])
    end
  end
end