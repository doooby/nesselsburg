class Dilna::Naradi
  attr_reader :cinnost

  def initialize(cinnost)
    @cinnost = cinnost
  end

  def self.from_params(params)
    ret = self.new params[:cinnost]

    ret
  end

  def to_params
    "?cinnost=#{@cinnost}"
  end

  def path
    "/dilna/prostranstvi#{to_params}"
  end
end