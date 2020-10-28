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
  validates :name, format: {with: /\A[a-zA-Z]+\z/}, length: {minimum: 2}, allow_blank: true, allow_nil: true
  validates :bio, length: { maximum: 500}, allow_blank: true, allow_nil: true
  validates :user_self_img, allow_blank: true, allow_nil: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  # when a reset_password_token was created, it was validating for a password,
  # on: :create makes it so it validates only when :create is called
  validates :password, presence: true, length: { minimum: 6 }, on: :create

  def generate_password_token!
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.now.utc
    save!
  end
    
  def password_token_valid?
    (self.reset_password_sent_at + 4.hours) > Time.now.utc
  end
  
  def reset_password!(password)
    self.reset_password_token = nil
    self.reset_password_sent_at = nil
    self.password = password
    save!
  end

  private
  def generate_token
    SecureRandom.hex(10)
  end

end
