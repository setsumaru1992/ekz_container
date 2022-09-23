module Application::Finder
  class ChoiceFinder < Bussiness::Base::Finder
    attribute :theme_id, :integer
    validates :theme_id, presence: true

    def fetch
      choices = ::Choice
        .where(theme_id: theme_id)
        # 後述のCarrierWaveでの他モデルの関連付け時にn+1問題が起こらないよう、先回りして関連付けSQL発行
        .eager_load(:choice_webpage_capture)
        .joins("
          LEFT JOIN (
            SELECT
              choice_images.choice_id
              , image_filename
            FROM choice_images
              JOIN (
                SELECT
                  choice_id
                  , MAX(created_at) latest_created_at
                FROM choice_images
                GROUP BY choice_id
              ) latest_choice_images
               ON choice_images.choice_id = latest_choice_images.choice_id
                AND choice_images.created_at = latest_choice_images.latest_created_at
          ) latest_choice_images
            ON choices.id = latest_choice_images.choice_id
        ")
        # .where(id: 988) # デバッグ choice_images
        .where(id: [523, 891]) # デバッグ webcapture
        .order("choices.created_at DESC")
      #       Traceback (most recent call last):
      #         1: from (irb):39
      #       NoMethodError (undefined method `url' for "screenshot_httpswww.google.com.png":String)
      # irb(main):040:0> Application::Finder::ChoiceFinder.call(theme_id: 50).first.webpage_capture_image.url
      # 現在上記エラーが出るので、ウェブキャプチャテーブルのurlが取れていない。これを何とかする
      # CarrierWaveと連動したActiveRecordを使わなければいけないからゴリゴリSQL JOINよりはActiveRecordを使う必要があるかな。
      # scope使うとか

      choices.map do |choice|
        result_choice = choice.attributes
        result_choice["webpage_capture_url"] = if choice.choice_webpage_capture.present?
                                                 choice.choice_webpage_capture.image.url
                                               end

        result_choice
      end
    end
  end
end