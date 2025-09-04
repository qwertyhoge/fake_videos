module Api
    class VideosController < ApplicationController
        before_action :set_video, only: %i[ show update destroy]

        def index
            render json: Video.all.as_json(include: :tags)
        end
        def show
            render json: Video.find(params[:id]).as_json(include: :tags)
        end
        def create
            @video = Video.new(video_params)

            if @video.save
                render json: @video
            else
                render :new, status: :unprocessable_entity
            end
        end
        def update
            if @video.update(video_params)
                render json: @video
            else
                render :edit, status: :unprocessable_entity
            end
        end
        def destroy
            @video.destroy
            render json: @video
        end

        private
            def set_video
                @video = Video.find(params[:id])
            end

            def video_params
                params.require(:video).permit(:user_id, :title, :length, tag_ids: [])
            end

    end
end