class CreateChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :choices do |t|
      t.string :name
      t.string :url
      t.text :description
      t.integer :evaluation
      t.integer :click_cnt
      t.datetime :click_at
      t.references :theme_domain, foreign_key: true

      t.timestamps
    end
  end
end
