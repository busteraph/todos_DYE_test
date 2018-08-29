Rails.application.routes.draw do
  # namespace the controllers without affecting the URI
  scope module: :v1, constraints: ApiVersion.new('v1', true) do
    resources :todos do
      resources :items
    end
  end	

  mount_ember_app :EmberTodosDye, to: "/"
end
