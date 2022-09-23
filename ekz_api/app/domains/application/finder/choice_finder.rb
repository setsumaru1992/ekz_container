module Application::Finder
  class ChoiceFinder < Bussiness::Base::Finder
    attribute :theme_id, :integer
    validates :theme_id, presence: true

    def fetch
      choices = ::Choice
        .where(theme_id: theme_id)
        # 後述のCarrierWaveでの他モデルの関連付け時にn+1問題が起こらないよう、先回りして関連付けSQL発行
        .eager_load(:choice_webpage_capture)
        .eager_load(:choice_images).merge(ChoiceImage.with_latest_image)
        # .where(id: 988) # デバッグ choice_images
        # .where(id: [523, 891]) # デバッグ webcapture
        .order("choices.created_at DESC")

      choices.map do |choice|
        result_choice = choice.attributes
        result_choice["webpage_capture_url"] = if choice.choice_webpage_capture.present?
                                                 choice.choice_webpage_capture.image.url
                                               end
        result_choice["uploaded_image_url"] = if choice.choice_images.present?
                                                choice.choice_images.first.image_filename.url
                                              end

        result_choice
      end
    end
  end
end