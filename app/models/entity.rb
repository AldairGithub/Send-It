class Entity < ApplicationRecord
  
  belongs_to :user
  
  has_and_belongs_to_many :actions, dependent: :destroy

end
