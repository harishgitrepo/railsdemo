Rails.application.routes.draw do
  post 'wishes/create'

  put 'wishes/update'

  get 'wishes/show'

  delete 'wishes/delete'

  match 'wishes' => 'wishes#index', :as => :wishes, :via => :get

  get 'wishes/query'

  match 'photos' => 'photos#index', :as => :photos, :via => :get

	match 'welcome' => 'welcome#index', :as => :welcome, :via => :get
	root 'welcome#index'


	get 'wishes/list'
  


  match 'howwemet' => 'howwemet#index', :as => :howwemet, :via => :get
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
