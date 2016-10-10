Rails.application.routes.draw do
  post 'wishes/create'

  put 'wishes/update'

  get 'wishes/show'

  delete 'wishes/delete'

  get 'wishes/index', :as => :wishes

  get 'wishes/query'

  get 'photos/index', :as => :photos

	get 'welcome/index', :as => :welcome
	root 'welcome#index'


	get 'wishes/list'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
