class CreateChoiceWebpageCaptures < ActiveRecord::Migration[5.2]
  def change
    create_table :choice_webpage_captures do |t|
      t.references :choice, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
