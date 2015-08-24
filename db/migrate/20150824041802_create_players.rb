class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :steam_id
      t.string :name
      t.integer :last_seen
      t.integer :elo
      t.string :country
      t.timestamps null: false
    end
  end
end
