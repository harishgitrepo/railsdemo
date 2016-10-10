class WishesController < ApplicationController
  def create
    @wish = Wish.new(wishes_params)
    @wish.save
  end

  def update
  end

  def show
  end

  def delete
  end

  def index
    
    @wishes = Wish.paginate(:page => 1)
  end


  def list
    params[:page] ||= 1
    @wishes = Wish.paginate(:page => params[:page]).order('updated_at DESC')
    pagecount = 1
    if @wishes.length == 0
      pagecount = 0
    else
      pagecount = Wish.count <= Wish.per_page ? pagecount : pagecount + (Wish.count / Wish.per_page)
    end
    output = {
      :totalpages => pagecount,
      :currentpage => params[:page],
      :wishes => @wishes
    }
    respond_to do |format|
      format.json {
        render :json => output
      }
    end
  end


  private
    def wishes_params
      params.require(:wish).permit(:name, :message, :link)
    end
end