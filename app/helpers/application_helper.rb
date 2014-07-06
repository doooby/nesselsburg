module ApplicationHelper

  def backgroun_image_for(for_tag, path)
    content_tag :style, type: 'text/css' do
      "#{for_tag} {background-image: url(#{image_path path});}"
    end
  end

end
