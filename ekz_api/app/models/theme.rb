class Theme < ApplicationRecord
  include Theme::Finder

  has_many :choices
end
