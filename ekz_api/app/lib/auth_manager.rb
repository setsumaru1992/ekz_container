module AuthManager
  class << self
    def generate_access_key(user_id)
      destroy_access_key(user_id)

      access_key = gen_access_key_str
      save_new_access_key(user_id, access_key)
      access_key
    end

    def authenticate(access_key)
      access_key_model = fetch_access_key_model_by_access_key(access_key)
      return false if access_key_model.blank?
      update_access_key_expire(access_key_model)
      access_key_model.user_id
    end

    def destroy_access_key(access_key)
      access_key_model = AccessKey.find_by(access_key: access_key)
      if access_key_model.present?
        access_key_model.destroy!
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
      access_key_model.expire = gen_expire_datetime
      access_key_model.save!
      nil
    end

    def fetch_access_key_model_by_access_key(access_key)
      access_key_model = AccessKey.find_by(access_key: access_key)
      access_key_model
    end

    def update_access_key_expire(access_key_model)
      access_key_model.expire = gen_expire_datetime
      access_key_model.save!
      nil
    end

    def gen_random_str
      str_length = 16
      ((0..9).to_a + ("a".."z").to_a + ("A".."Z").to_a).sample(str_length).join
    end

    def gen_expire_datetime
      Time.now + 1.days
    end


  end
end