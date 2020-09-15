class User < ApplicationRecord
  has_secure_password

  has_many :entities, dependent: :destroy
  # we can check user actions through the amount of entities the user has interacted with
  has_many :actions, through: :entities
  # adds foreign key from user to table
  has_many :user_one, class_name: :user_relationships, foreign_key: :user_one_id
  has_many :user_two, class_name: :user_relationships, foreign_key: :user_two_id
  has_many :last_user_action, class_name: :user_relationships, foreign_key: :last_user_action_id

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }

end
