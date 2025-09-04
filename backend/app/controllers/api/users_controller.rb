module Api
    class UsersController < ApplicationController
        before_action :set_user, only: %i[ show update destroy videos]

        def index
            render json: User.all
        end
        def show
            render json: User.find(params[:id])
        end
        def create
            @user = User.new(user_params)

            if @user.save
                render json: @user
            else
                render :new, status: :unprocessable_entity
            end
        end
        def update
            if @user.update(user_params)
                render json: @user
            else
                render :edit, status: :unprocessable_entity
            end
        end
        def destroy
            @user.destroy
            render json: @user
        end
        
        def videos
            render json: @user.videos
        end

        private
            def set_user
                @user = User.find(params[:id])
            end

            def user_params
                params.require(:user).permit(:name)
            end

    end
end