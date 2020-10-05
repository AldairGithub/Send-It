class UserMailer < ApplicationMailer
  # On user sign up, an email is sent to user
  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to Send It!')
  end

  # User forgot their password and needs an url to the reset component
  def forgot_password(user)
    @user = user
    # @url = `http://localhost:3001/reset_account/#{@user.reset_password_token}`
    mail(to: @user.email, subject: 'Send It Reset Password URL')
  end
end
