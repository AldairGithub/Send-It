require 'test_helper'

class UserRelationshipsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_relationship = user_relationships(:one)
  end

  test "should get index" do
    get user_relationships_url, as: :json
    assert_response :success
  end

  test "should create user_relationship" do
    assert_difference('UserRelationship.count') do
      post user_relationships_url, params: { user_relationship: { last_user_action_id: @user_relationship.last_user_action_id, status: @user_relationship.status, user_one_id: @user_relationship.user_one_id, user_two_id: @user_relationship.user_two_id } }, as: :json
    end

    assert_response 201
  end

  test "should show user_relationship" do
    get user_relationship_url(@user_relationship), as: :json
    assert_response :success
  end

  test "should update user_relationship" do
    patch user_relationship_url(@user_relationship), params: { user_relationship: { last_user_action_id: @user_relationship.last_user_action_id, status: @user_relationship.status, user_one_id: @user_relationship.user_one_id, user_two_id: @user_relationship.user_two_id } }, as: :json
    assert_response 200
  end

  test "should destroy user_relationship" do
    assert_difference('UserRelationship.count', -1) do
      delete user_relationship_url(@user_relationship), as: :json
    end

    assert_response 204
  end
end
