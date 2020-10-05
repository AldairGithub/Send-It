class ApplicationMailer < ActionMailer::Base
  # need to change default email or else it will not work
  default from: 'send.ittttttttt@gmail.com'
  layout 'mailer'
end
