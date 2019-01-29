class UserGroup < ApplicationRecord
  has_many :users, through: :user_relation_group
  has_many :user_relation_group
  accepts_nested_attributes_for :user_relation_group
end
