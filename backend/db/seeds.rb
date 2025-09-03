# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

["Education", "Cooking", "Gameplay"].each do |tag_name|
    Tag.find_or_create_by!(name: tag_name)
end

["Taro", "Hanako"].each do |user_name|
    User.find_or_create_by!(name: user_name)
end

[
    {tags: ["Education"], title: "#1 How to make RoR app", user: "Taro", length: 300},
    {tags: ["Cooking", "Education"], title: "Delicious omelette", user: "Hanako", length: 600},
    {tags: ["Gameplay"], title: "Black Souls RTA", user: "Hanako", length: 12400}
].each do |video_data|
    user = User.find_by(name: video_data[:user])

    video = Video.find_or_create_by!(
        user_id: user[:id],
        title: video_data[:title],
        length: video_data[:length]
    )

    video_data[:tags].each do |tag_name|
        tag = Tag.find_by(name: tag_name)
        video.tags << tag unless video.tags.include?(tag)
    end
end
