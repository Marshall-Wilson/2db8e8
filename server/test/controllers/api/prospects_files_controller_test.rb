require "test_helper"

class Api::ProspectsFilesControllerTest < ActionDispatch::IntegrationTest
  test "should get input" do
    get api_prospects_files_input_url
    assert_response :success
  end

  test "should get progress" do
    get api_prospects_files_progress_url
    assert_response :success
  end
end
