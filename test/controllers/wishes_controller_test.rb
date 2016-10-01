require 'test_helper'

class WishesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get wishes_create_url
    assert_response :success
  end

  test "should get update" do
    get wishes_update_url
    assert_response :success
  end

  test "should get show" do
    get wishes_show_url
    assert_response :success
  end

  test "should get delete" do
    get wishes_delete_url
    assert_response :success
  end

  test "should get index" do
    get wishes_index_url
    assert_response :success
  end

end
