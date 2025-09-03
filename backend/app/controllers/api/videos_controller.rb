module Api
    class VideosController < ApplicationController
        def index
            render json: Video.all
        end
    end
end