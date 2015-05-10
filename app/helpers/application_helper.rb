module ApplicationHelper

  def backgroun_image_for(for_tag, path)
    content_tag :style, type: 'text/css' do
      "#{for_tag} {background-image: url(#{image_path path});}"
    end
  end

  def templates_bundle(rel_path)
    rel_path = "/#{rel_path}/" unless rel_path=='/'
    rel_path = "app/templates#{rel_path}*.hb"
    Dir[Rails.root.join *rel_path.split('/')].each do |template|
      concat content_tag(:script, File.read(template),
                         {id: "#{template[/\/(\w+)\.hb$/, 1]}-template",
                          type: 'text/x-handlebars-template'}, false)

    end
    nil
  end

end
