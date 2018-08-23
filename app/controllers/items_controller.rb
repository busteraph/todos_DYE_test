class ItemsController < ApplicationController
  before_action :fetch_todo

  # GET /todos/:todo_id/items
  def index
    json_response(@todo.items)
  end

  def fetch_todo
    @todo = Todo.find(params[:todo_id])
  end
end
