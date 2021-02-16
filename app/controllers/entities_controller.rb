class EntitiesController < ApplicationController
  before_action :set_entity, only: [:show, :update, :destroy, :entity_actions]

  # GET /entities
  def index
    @entities = Entity.all

    render json: @entities
  end

  # GET /entities/1
  def show
    render json: @entity
  end

  # POST /entities
  def create
    @entity = Entity.new(entity_params)

    if @entity.save
      render json: @entity, status: :created, location: @entity
    else
      render json: @entity.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /entities/1
  def update
    if @entity.update(entity_params)
      render json: @entity
    else
      render json: @entity.errors, status: :unprocessable_entity
    end
  end

  # DELETE /entities/1
  def destroy
    @entity.destroy
  end

  # Photos
  # GET /entities/user/1
  def user_entities
    @user = User.find(params[:id])

    # using map allowed us to select the entity id that we can call again on a different array using the action table
    # need to add as_json to every variable as it returns Active Record relation instead of json, which is how we are working on our front
    @user_entities = Entity.where(user_id: @user, name: 'Photo').map{|entity| 
      [[entity.as_json][0], [Action.where(entity_id: entity.id).as_json][0]]
    }

    render json: @user_entities
    
  end

  # GET /entities/1/actions
  def entity_actions
    @entity_actions = Action.where(entity_id: @entity)
    render json: @entity_actions
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entity
      @entity = Entity.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def entity_params
      params.require(:entity).permit(:name, :content, :url, :user_id)
    end
end
