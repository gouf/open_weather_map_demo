class WeathersController < ApplicationController
  def index
    @cities = %w[Tokyo Nagoya Osaka Fukuoka Hokkaido Okinawa]
  end
end
