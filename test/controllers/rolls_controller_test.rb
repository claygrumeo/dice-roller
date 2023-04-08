require "test_helper"

class RollsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get rolls_index_url
    assert_response :success
  end
end
