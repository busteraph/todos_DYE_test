class ItemsController < ApplicationController
  before_action :fetch_todo
before_action :fetch_todo_item, only: [:show, :update]

  # GET /todos/:todo_id/items
  def index
    json_response(@todo.items)
  end

  # GET /todos/:todo_id/items/:id
  def show
    json_response(@item)
  end

  # POST /todos/:todo_id/items
  def create
    @todo.items.create!(item_params)
    json_response(@todo, :created)
  end

  # PUT /todos/:todo_id/items/:id
  def update
    @item.update(item_params)
    head :no_content
  end

  private

  def item_params
    params.permit(:name, :done)
  end

  def fetch_todo
    @todo = Todo.find(params[:todo_id])
  end

  def fetch_todo_item
    @item = @todo.items.find_by!(id: params[:id]) if @todo
  end
end
