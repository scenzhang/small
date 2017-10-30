class Api::ResponsesController < ApplicationController
  before_action :ensure_logged_in, except: :show
  
  def create
    @response = Response.new(response_params)
    @response.user_id = current_user.id

    if @response.save
      render "api/responses/show"
    else
      render json: @response.errors.full_messages, status: 422
    end

  end

  def show
    @response = Response.find(params[:id])
    render "api/responses/show"
  end

  def update
    @response = Response.find(params[:id])
    if @response.update_attributes(response_params)
      render "api/responses/show"
    else
      render json: @response.errors.full_messages, status: 422
    end
  end

  def destroy
    @response = Response.find(params[:id])
    @response.destroy
    render "api/responses/show"                                
  end

  private

  def response_params
    params.require(:response)
      .permit(:body, :article_id, :parent_response_id)
  end

end
