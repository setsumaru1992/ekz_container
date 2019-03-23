class CreateRemindTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :remind_tokens do |t|
      t.integer :user_id
      t.string :remind_token

      t.timestamps
    end
  end
end
