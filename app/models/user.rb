class User < ApplicationRecord

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :address, presence: true
  validates :password, length: { minimum: 6 }
end
