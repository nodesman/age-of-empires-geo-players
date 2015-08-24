class ChangeToString < ActiveRecord::Migration
  def change
    change_column :players, :steam_id, :string
  end
end