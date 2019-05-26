class ChoiceImage < ApplicationRecord
  belongs_to :choice
  mount_uploader :image_filename, ChoiceImageUploader
end
