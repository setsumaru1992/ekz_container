class CreateUserGroupRelations < ActiveRecord::Migration[5.2]
  def change
    create_table :user_group_relations do |t|
      t.references :user, foreign_key: true
      t.references :user_group, foreign_key: true

      t.timestamps
    end
  end
end
