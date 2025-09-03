module Api
    class TagsController < ApplicationController
        def index
            render json: Tag.all
        end
        def create
            @tag = Tag.new(tag_params)
            if @tag.save
                render json: @tag
            else
                render :new, status: :unprocessable_entity
            end
        end
        def destroy
            @tag = Tag.find(params[:id])
            render json: @tag
        end

        private
            def tag_params
                params.require(:tag).permit(:name)
            end

    end
end