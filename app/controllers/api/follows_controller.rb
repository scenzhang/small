class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new(follow_params)
    if @follow.save
      render 'api/follows/show'
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    # @follow = Follow.where(follow_params).first
    # @follow = Follow.find(params[:id])
    # @follow.destroy
    @follow = Follow.where(request.query_parameters).first
    @follow.destroy
    render 'api/follows/show'
  end

  def show
    # @follow = Follow.where(follow_params).first
    # @follow = Follow.find(params[:id])
    @follow = Follow.where(request.query_parameters).first
    if @follow
      render 'api/follows/show'
    else
      render json: ["User #{request.query_parameters['follower_id']} is not following #{request.query_parameters['followable_type']} #{request.query_parameters['followable_id']}"]
    end
  end

  def follow_params
    params.require(:follow).permit(:follower_id, :followable_id, :followable_type)
  end
end
