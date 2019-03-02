class CreateThemes < ActiveRecord::Migration[5.2]
  def change
    create_table :themes do |t|
      t.string :name
      t.text :description
      t.integer :accesible_group
      t.integer :created_by
      t.integer :updated_by

      t.timestamps
    end
  end
end
