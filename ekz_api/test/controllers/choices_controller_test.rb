require 'test_helper'

class ChoicesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get choices_show_url
    assert_response :success
  end

  test "should get random" do
    get choices_random_url
    assert_response :success
  end

  test "should get new" do
    get choices_new_url
    assert_response :success
  end

  test "should get update" do
    get choices_update_url
    assert_response :success
  end

  test "should get destroy" do
    get choices_destroy_url
    assert_response :success
  end

end
