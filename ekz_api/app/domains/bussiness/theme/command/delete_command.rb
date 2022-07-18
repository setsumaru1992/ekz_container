module Bussiness::Theme
  class Command::DeleteCommand < Bussiness::Base::Command
    # HACK: 複数同時削除をするユースケースができたら、これを使うBatchDeleteCommandを作って、独自定義してあるintegers型を使用する
    attribute :id, :integer
    validates :id, presence: true

    def call
      theme = Repository.find(id)
      raise "" if theme.blank?

      Repository.remove(id)
      nil
    end
  end
end