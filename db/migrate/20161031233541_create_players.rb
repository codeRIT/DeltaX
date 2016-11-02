class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.string :code
      t.integer :x
      t.integer :y
      t.integer :z

      t.timestamps
    end
  end
end
