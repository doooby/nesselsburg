class GameData < ActiveRecord::Base

  validate :validate_uniqueness

  def validate_uniqueness
    errors.add :base, "Combination game=#{game} & key=#{key} id not unique." if self.class.exists? game: game, key: key
  end

  scope :game, -> (game) { where game: game }
  scope :key, -> (key) { where key: key }
  scope :key_begins, -> (prefix) { where GameData.arel_table[:key].matches("#{prefix}%") }

end