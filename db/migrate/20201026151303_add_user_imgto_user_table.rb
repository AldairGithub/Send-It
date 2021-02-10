class AddUserImgtoUserTable < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :user_self_img, :string
  end
end
