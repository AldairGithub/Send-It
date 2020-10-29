class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :update_password, :user_list, :user_friends]
  before_action :authorize_request, except: [:create, :index, :user_list, :user_friends]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  # def show
  #   render json: @user
  # end

  # POST /users
  def create
    @user = User.new(user_params)
    # render json: @user, status: :created, location: @user
    if @user.save
      UserMailer.welcome_email(@user).deliver_now
      @token = encode({id: @user.id})
      render json: {
        user: @user.attributes.except("password_digest"),
        token: @token
      }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end
  
  # GET /users/1/user_list
  # .where returns all objects, while find_by returns the first one
  def user_list
    @user_list = UserRelationship.where(user_one_id: @user)

    render json: @user_list
  end

  # GET /users/1/user_friends
  def user_friends
    @user_friends = UserRelationship.where(user_one_id: @user, status: 'Accepted')

    render json: @user_friends
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password, :name, :bio, :user_self_img)
    end

end
