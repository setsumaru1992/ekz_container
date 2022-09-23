module Application::Finder
  class EkzPicker < Bussiness::Base::Finder
    attribute :theme_id, :integer
    validates :theme_id, presence: true
    attribute :pre_picked_choice_id, :integer

    def fetch
      can_repick = Choice.where(theme_id: theme_id).where.not(id: pre_picked_choice_id).size > 0
      return unless can_repick

      while true
        # TODO: 取得するサイズが1つにfixしたから、v2移行したら1つしか取得しない前提のコードを書く
        ekz_list = Choice.ekz_pick(theme_id)
        if ekz_list.first.id != pre_picked_choice_id
          break
        end
      end

      ekz_choice_id = ekz_list.first
      ekz_choice = Choice.where(id: ekz_choice_id).eager_load_images.first
      result = ekz_choice.attributes
      result["image_url"] = ekz_choice.image_url
      result
    end
  end
end
