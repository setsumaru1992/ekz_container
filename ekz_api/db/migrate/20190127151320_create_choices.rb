class CreateChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :choices do |t|
      t.string :name
      t.string :url
      t.text :description
      t.integer :evaluation
      t.integer :click_cnt
      t.datetime :click_at
      t.references :themes, foreign_key: true

      t.timestamps
    end
  end
end
