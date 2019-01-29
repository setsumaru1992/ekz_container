class AddIspublicToUserGroup < ActiveRecord::Migration[5.2]
  def change
    add_column :user_groups, :is_public, :boolean
  end
end
