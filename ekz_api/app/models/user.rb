class User < ApplicationRecord
  has_many :user_groups, through: :user_relation_group
  has_many :group_users
  has_secure_password
end
