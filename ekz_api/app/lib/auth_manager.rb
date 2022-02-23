module AuthManager
  class << self
    def generate_access_key(user_id)
      destroy_access_key(user_id)

      access_key = gen_access_key_str
      save_new_access_key(user_id, access_key)
      access_key
    end

    def authenticate(access_key)
      access_key_model = AccessKey.find_by(access_key: access_key)
      return if access_key_model.blank?
      update_access_key_expire(access_key_model)
      access_key_model.user_id
    end

    def destroy_access_key(access_key)
      access_key_model = AccessKey.find_by(access_key: access_key)
      if access_key_model.present?
        access_key_model.destroy!
      end
    end

    def remind_token_from(user_id)
      existing_remind_token_model = RemindToken.find_by(user_id: user_id)
      return existing_remind_token_model.remind_token if existing_remind_token_model.present?

      remind_token = gen_remind_token
      save_new_remind_key(user_id, remind_token)
      remind_token
    end

    def generate_access_key_from(remind_token)
      remind_token_model = RemindToken.find_by(remind_token: remind_token)
      return if remind_token_model.nil?
      generate_access_key(remind_token_model.user_id)
    end

    def destroy_remind_token(user_id)
      remind_token_model = RemindToken.find_by(user_id: user_id)
      if remind_token_model.present?
        remind_token_model.destroy!
      end
    end

    private

    def gen_access_key_str
      while true
        access_key = gen_random_str
        existing_access_key_model = AccessKey.find_by(access_key: access_key)
        break if existing_access_key_model.nil?
      end
      access_key
    end

    def save_new_access_key(user_id, access_key)
      access_key_model = AccessKey.new
      access_key_model.user_id = user_id
      access_key_model.access_key = access_key
      access_key_model.expire = gen_access_key_expire_datetime
      access_key_model.save!
      nil
    end

    def update_access_key_expire(access_key_model)
      access_key_model.expire = gen_access_key_expire_datetime
      access_key_model.save!
      nil
    end

    def gen_access_key_expire_datetime
      Time.now + 1.days
    end

    def gen_remind_token
      while true
        remind_token = gen_random_str
        existing_remind_token_model = RemindToken.find_by(remind_token: remind_token)
        break if existing_remind_token_model.nil?
      end
      remind_token
    end

    def save_new_remind_key(user_id, remind_token)
      remind_token_model = RemindToken.new
      remind_token_model.user_id = user_id
      remind_token_model.remind_token = remind_token
      remind_token_model.save!
    end

    def gen_random_str
      str_length = 16
      ((0..9).to_a + ("a".."z").to_a + ("A".."Z").to_a).sample(str_length).join
    end


  end
end
