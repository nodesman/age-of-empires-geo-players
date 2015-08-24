class PlayerController < ApplicationController
  def index
  end

  def country
    country = params[:country]
    country = country.upcase
    @players = Player.where(:country => country)
  end
end