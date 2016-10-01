Rails.application.routes.draw do
  post 'wishes/create'

  put 'wishes/update'

  get 'wishes/show'

  delete 'wishes/delete'

  get 'wishes/index'

  get 'photos/index'

	get 'welcome/index'
	root 'welcome#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
