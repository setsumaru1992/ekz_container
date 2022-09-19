module Bussiness::Choice
  class Command::DeleteCommand < Bussiness::Base::Command
    attribute :id, :integer
    validates :id, presence: true

    def call
      choice = Repository.find(id)
      raise "指定した選択肢は存在しません。" if choice.blank?

      Repository.remove(id)
      nil
    end
  end
end