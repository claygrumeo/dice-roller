class CreateRolls < ActiveRecord::Migration[7.0]
  def change
    create_table :rolls do |t|
      t.integer :value
      t.string :die_type
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
