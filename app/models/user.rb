class User < ApplicationRecord
  validates :name, :email, :blurb, :session_token, :password_digest, 
            presence: true
  validates :email, uniqueness: true
  validates :blurb, length: { maximum: 140 }
  validates :password, length: { minimum: 6, allow_nil: true }
  has_many :articles
  attr_reader :password
  after_initialize :ensure_session_token


  def gen_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= gen_token
  end

  def reset_session_token
    self.session_token = gen_token
    save!
    self.session_token
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password)
    u = User.find_by(email: email)
    u && u.is_password?(password) ? u : nil 
  end


end