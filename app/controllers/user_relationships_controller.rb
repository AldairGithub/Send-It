class UserRelationshipsController < ApplicationController
  before_action :set_user_relationship, only: [:show, :update, :destroy]

  # GET /user_relationships
  def index
    @user_relationships = UserRelationship.all

    render json: @user_relationships
  end

  # GET /user_relationships/1
  def show
    render json: @user_relationship
  end

  # POST /user_relationships
  def create
    @user_relationship = UserRelationship.new(user_relationship_params)

    if @user_relationship.save
      render json: @user_relationship, status: :created, location: @user_relationship
    else
      render json: @user_relationship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_relationships/1
  def update
    if @user_relationship.update(user_relationship_params)
      render json: @user_relationship
    else
      render json: @user_relationship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_relationships/1
  def destroy
    @user_relationship.destroy
  end

  def send_request
    @user = User.find(params[:id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_relationship
      @user_relationship = UserRelationship.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_relationship_params
      params.require(:user_relationship).permit(:user_one_id, :user_two_id, :status, :last_user_action_id)
    end
end
