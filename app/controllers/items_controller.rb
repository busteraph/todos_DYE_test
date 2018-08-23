class ItemsController < ApplicationController
  before_action :fetch_todo
  before_action :fetch_todo_item, only: :show

  # GET /todos/:todo_id/items
  def index
    json_response(@todo.items)
  end

  # GET /todos/:todo_id/items/:id
  def show
    json_response(@item)
  end

  private


  def fetch_todo
    @todo = Todo.find(params[:todo_id])
  end

  def fetch_todo_item
    @item = @todo.items.find_by!(id: params[:id]) if @todo
  end
end
