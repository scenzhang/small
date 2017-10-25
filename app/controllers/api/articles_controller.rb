class Api::ArticlesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @article = Article.new(article_params)
    @article.user_id = current_user.id
    if @article.save
      render "api/articles/show"
    else
      render json: @article.errors.full_messages, status: 422
    end
  end      

  def show
    @article = Article.find(params[:id])
    render "api/articles/show"
  end

  def index
    @articles = Article.all
    render "api/articles/index"
  end

  def update
    @article = Article.find(params[:id])
    if @article.update_attributes(article_params)
      render "api/articles/show"
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    render "api/articles/show"                                
  end

  private
  def article_params
    params.require(:article).permit(:title, :body, :blurb)
  end

  def ensure_logged_in
    if !logged_in?
      render json: {error: "must be logged in"}, status: 401 and return
    end
  end
end
