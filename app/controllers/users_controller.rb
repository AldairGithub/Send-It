class UsersController < ApplicationController
  before_action :set_user, only: [:update, :destroy, :update_password, :user_list]
  before_action :authorize_request, except: [:create, :index, :user_list, :delete_avatar_from_cloud]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

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

  def delete_avatar_from_cloud
    @url = params[:user][:user_self_img]
    first = @url.index('send-it')
    last = @url.index(@url.split(//).last(5).join)
    @delete_this_url = @url[first..last]

    result = Cloudinary::Api.delete_resources([@delete_this_url])

    render json: result
  end
  
  # GET /users/1/user_list
  # .where returns all objects, while find_by returns the first one
  # where does not support an or argument inside of it
  # Ruby on Rails Docs suggest that variables must not go inside arguments or users can request anything from the database
  def user_list
    @user_list = UserRelationship.where("user_one_id = ? or user_two_id = ?", @user, @user)
    # ? is replaced by the variable
    render json: @user_list
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
