class Choice < ApplicationRecord
  include Choice::Finder

  belongs_to :theme
  has_many :comments, dependent: :destroy
  has_many :choice_images, dependent: :destroy
  has_many :choice_tags, dependent: :destroy
  has_one :choice_webpage_capture, dependent: :destroy

  scope :eager_load_images, -> {
    # CarrierWaveでの他モデルの関連付け時にn+1問題が起こらないよう、先回りして関連付けSQL発行
    eager_load(:choice_webpage_capture)
      .eager_load(:choice_images).merge(ChoiceImage.with_latest_image)
  }

  def image_url
    if choice_images.present?
      choice_images.first.image_filename.url
    elsif choice_webpage_capture.present?
      choice_webpage_capture.image.url
    else
      'https://ekz-images.s3-ap-northeast-1.amazonaws.com/static/no_image.png'
    end
  end
end
