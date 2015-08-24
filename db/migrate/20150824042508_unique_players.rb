class UniquePlayers < ActiveRecord::Migration
  def change
    add_index :players, :steam_id, :unique => true
  end
end