class AddInfoToRoll < ActiveRecord::Migration[7.0]
  def change
    add_column :rolls, :info, :text
  end
end
