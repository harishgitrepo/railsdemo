class AddNameToWishes < ActiveRecord::Migration[5.0]
  def change
    add_column :wishes, :name, :string
  end
end
