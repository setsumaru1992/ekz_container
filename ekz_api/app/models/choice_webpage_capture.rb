class ChoiceWebpageCapture < ApplicationRecord
  belongs_to :choice
  mount_uploader :image, ChoiceWebpageCaptureUploader
end
