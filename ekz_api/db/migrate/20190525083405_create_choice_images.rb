class CreateChoiceImages < ActiveRecord::Migration[5.2]
  def change
    create_table :choice_images do |t|
      t.string :url
      t.references :choice, foreign_key: true

      t.timestamps
    end
  end
end
