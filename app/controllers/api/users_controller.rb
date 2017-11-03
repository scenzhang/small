
class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.where(id: params[:id]).includes(:articles, :responses).first
    if @user
      render "api/users/show"
    else
      render json: [404], status: 404
    end
  end

  # def feed_items
  #   @articles = Article
  #     .joins("join users on articles.user_id = users.id join follows on follows.followable_id = users.id")
  #     .where("follower_id = #{params[:id]}")
  #     .order(updated_at: :desc)
  #   render "api/articles/index"
  # end

  private

  def user_params
    params.require(:user).permit(:name, :password, :blurb, :email)
  end

end 