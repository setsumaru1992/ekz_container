module Application::Finder
  class ChoiceFinder < Bussiness::Base::Finder
    attribute :theme_id, :integer
    validates :theme_id, presence: true

    def fetch
      ::Choice
        .where(theme_id: theme_id)
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
        .joins("
          LEFT JOIN (
            SELECT
              choice_webpage_captures.choice_id
              , image
            FROM choice_webpage_captures
              JOIN (
                SELECT
                  choice_id
                  , MAX(created_at) latest_created_at
                FROM choice_webpage_captures
                GROUP BY choice_id
              ) latest_choice_webpage_captures
               ON choice_webpage_captures.choice_id = latest_choice_webpage_captures.choice_id
                AND choice_webpage_captures.created_at = latest_choice_webpage_captures.latest_created_at
          ) latest_choice_webpage_captures
            ON choices.id = latest_choice_webpage_captures.choice_id
        ")
        .select("
          choices.*
          , image_filename
          , image AS webpage_capture_image
        ")
        # .where(id: 988) # デバッグ choice_images
        # .where(id: 523) # デバッグ webcapture
        .order("created_at DESC")
      #       Traceback (most recent call last):
      #         1: from (irb):39
      #       NoMethodError (undefined method `url' for "screenshot_httpswww.google.com.png":String)
      # irb(main):040:0> Application::Finder::ChoiceFinder.call(theme_id: 50).first.webpage_capture_image.url
      # 現在上記エラーが出るので、ウェブキャプチャテーブルのurlが取れていない。これを何とかする
      # CarrierWaveと連動したActiveRecordを使わなければいけないからゴリゴリSQL JOINよりはActiveRecordを使う必要があるかな。
      # scope使うとか
    end
  end
end