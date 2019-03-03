class CreateAccessKeys < ActiveRecord::Migration[5.2]
  def change
    create_table :access_keys do |t|
      t.integer :user_id
      t.string :access_key
      t.timestamp :expire

      t.timestamps
    end
  end
end
