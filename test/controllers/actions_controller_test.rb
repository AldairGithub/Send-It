require 'test_helper'

class ActionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @action = actions(:one)
  end

  test "should get index" do
    get actions_url, as: :json
    assert_response :success
  end

  test "should create action" do
    assert_difference('Action.count') do
      post actions_url, params: { action: { content: @action.content, entity_id: @action.entity_id, tag_id: @action.tag_id, typeOfAction: @action.typeOfAction, typeOfEntity: @action.typeOfEntity, user_id: @action.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show action" do
    get action_url(@action), as: :json
    assert_response :success
  end

  test "should update action" do
    patch action_url(@action), params: { action: { content: @action.content, entity_id: @action.entity_id, tag_id: @action.tag_id, typeOfAction: @action.typeOfAction, typeOfEntity: @action.typeOfEntity, user_id: @action.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy action" do
    assert_difference('Action.count', -1) do
      delete action_url(@action), as: :json
    end

    assert_response 204
  end
end
