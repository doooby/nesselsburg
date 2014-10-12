module DilnaHelper

  def vem_projekt(nazev)
    content_for :hrad_head, [
        javascript_include_tag("#{nazev}/main"),
        stylesheet_link_tag("#{nazev}/main")
    ].join.html_safe
  end

  def link_na_prostranstvi(napis, projekt)
    link_to napis, dilna_prostranstvi_path(projekt: projekt)
  end

end