class TodosController < ApplicationController
 before_action :fetch_todo, only: :show

 # GET /todos
  def index
    @todos = Todo.all
    json_response(@todos)
  end

  # GET /todos/:id
  def show
    json_response(@todo)
  end

  private

  def todo_params
    # whitelist params
    params.permit(:title, :created_by)
  end

  def fetch_todo
    @todo = Todo.find(params[:id])
  end
end
