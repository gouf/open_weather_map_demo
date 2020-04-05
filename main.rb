require 'faraday'
require 'dotenv/load'
require 'json'

class OpenWeatherMapClient
  API_VERSION = '2.5'
  BASE_URL = "https://api.openweathermap.org/data/#{API_VERSION}"
  API_KEY = ENV['OPEN_WEATHER_MAP_API_KEY']

  class << self
    def weather_at(city_name)
      params =
        {
          q: city_name,
          appid: API_KEY
        }

      response_body =
        Faraday.get("#{BASE_URL}/weather", params)
               .body

      JSON.parse(response_body)
    end
  end
end

pp json = OpenWeatherMapClient.weather_at('yokohama')
puts '-' * 10
pp json['main']
pp json.dig('main', 'temp') # 気温 (華氏)
pp json.dig('weather', 0, 'main') # 天気 (英語)
pp json.dig('weather', 0, 'description') # 天気詳細 (英語)
