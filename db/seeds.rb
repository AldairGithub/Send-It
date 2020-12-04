# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
UserRelationship.destroy_all
Action.destroy_all
Tag.destroy_all
Entity.destroy_all
User.destroy_all

# users
# 1
@admin = User.create(username: 'admin', name:'admin', email: 'admin@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/FFn7QzH.jpg')
# 2
@aldair = User.create(username: 'aldair', name:'aldair',email: 'aldair@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/qDvVHCv.jpg')
# 3
@chris = User.create(username: 'Abattoir', name:'chris', email: 'chris@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/huSgzp2.jpg')
# 4
@vasu = User.create(username: 'Luminous', name:'vasu', email: 'vasu@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/fooitwq.jpg')
# 5
@kelly = User.create(username: 'Pyknometer', name:'kelly', email: 'kelly@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/6zgoENN.jpg')
# 6
@yomar = User.create(username: 'Recumbent', name:'yomar', email: 'yomar@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/DUTBARU.jpg')
# 7
@moises = User.create(username: 'Bressummer', name:'moises', email: 'moises@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/oX6OY55.jpg')
# 8
@nate = User.create(username: 'Tarantas', name:'nate', email: 'nate@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/6EBcdvz.jpg')
# 9
@roffaden = User.create(username: 'Acrimony', name:'rof', email: 'ro@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/tFGwNHC.jpg')
# 10
@jordon = User.create(username: 'Abderian', name:'jordon', email: 'jordon@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/XhE2N3q.jpg')
puts "#{User.count} users created"

# entities
@post_one = Entity.create(name: 'Post', content: 'This is my first post', user: @admin)
@post_two = Entity.create(name: 'Post', content: 'Check out admin\'s first post', user: @vasu)
@post_three = Entity.create(name: 'Post', content: 'Third times the charm', user: @aldair)

@photo_one = Entity.create(name: 'Photo', content: 'First Photo' , url: 'https://i.imgur.com/Tu1cfB0.jpg', user: @admin)
@photo_two = Entity.create(name: 'Photo', content: 'Second Photo', url: 'https://i.imgur.com/zAP8jQt.jpg', user: @admin)
@photo_three = Entity.create(name: 'Photo', content: 'Third Photo', url: 'https://i.imgur.com/hV2Ohdf.jpg', user: @admin)
@photo_four = Entity.create(name: 'Photo', content: 'Fourth Photo', url: 'https://i.imgur.com/KSlSLjG.jpg', user: @admin)
@photo_five = Entity.create(name: 'Photo', content: 'Fifth Photo', url: 'https://i.imgur.com/kqQpLzy.jpg', user: @admin)
@photo_six = Entity.create(name: 'Photo', content: 'Sixth Photo', url: 'https://i.imgur.com/70YkoE0.jpg', user: @admin)

@photo_seven = Entity.create(name: 'Photo', content: 'Roadtrip to the desert', url: 'https://i.imgur.com/7ltXTAq.jpg', user: @aldair)
@photo_eight = Entity.create(name: 'Photo', content: 'Garden crown got rusty', url: 'https://i.imgur.com/p6YMG2O.jpg', user: @aldair)
@photo_nine = Entity.create(name: 'Photo', content: 'learning to play', url: 'https://i.imgur.com/qilptGI.jpg', user: @aldair)

@article_one = Entity.create(name: 'Article', content: 'This is my first article! Loving this database so far for sureeeee', user: @kelly)
puts "#{Entity.count} entities created"

# tags
# need to be created first for their id to show on actions table
@tagname_one = Tag.create(name: '#FirstPost')
@tagname_two = Tag.create(name: '#hardAF')
puts "#{Tag.count} tags created"

# actions
# like
@like_one = Action.create(type_of_entity: 'Post', type_of_action: 'Like', user: @aldair, entity: @firstPost)
@like_two = Action.create(type_of_entity: 'Post', type_of_action: 'Like', user: @chris, entity: @firstPost)
@like_three = Action.create(type_of_entity: 'Post', type_of_action: 'Like', user: @vasu, entity: @firstPost)
@like_four = Action.create(type_of_entity: 'Post', type_of_action: 'Like', user: @kelly, entity: @firstPost)
@like_six = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @aldair, entity: @photo_one)
@like_seven = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_one)
@like_eight = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @vasu, entity: @photo_one)
@like_nine = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @kelly, entity: @photo_one)
@like_ten = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @aldair, entity: @photo_two)
@like_eleven = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_two)
@like_twelve = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @vasu, entity: @photo_two)
@like_thirteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @aldair, entity: @photo_three)
@like_fourteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_three)
@like_fifteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @aldair, entity: @photo_four)
# comment
@comment_one = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Welcome to the best up and comming social media app!', user: @aldair, entity: @photo_one)
@comment_two = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'AY its lit', user: @chris, entity: @photo_one)
@comment_three = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Let me get on this', user: @vasu, entity: @photo_one)
@comment_four = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Testinggg', user: @aldair, entity: @photo_two)
# tag
@tag_one = Action.create(type_of_entity: 'Post', type_of_action: 'Tag', user: @vasu, tag: @testingTag, entity: @secondPost)
@tag_two = Action.create(type_of_entity: 'Post', type_of_action: 'Tag', user: @aldair, tag: @why_is_tagging_so_hard, entity: @third_post)
puts "#{Action.count} actions created"

# user relationships
@user_following_one = UserRelationship.create!(user_one: @admin, user_two: @aldair, status: 'Pending', last_user_action: @admin)
@user_following_two = UserRelationship.create(user_one: @admin, user_two: @nate, status: 'Pending', last_user_action: @admin)
@user_following_three = UserRelationship.create(user_one: @admin, user_two: @vasu, status: 'Accepted', last_user_action: @vasu)

@user_follower_two = UserRelationship.create(user_one: @yomar, user_two: @admin, status: 'Pending', last_user_action: @yomar)
@user_follower_three = UserRelationship.create(user_one: @moises, user_two: @admin, status: 'Accepted', last_user_action: @admin)

@user_follower_denied_one = UserRelationship.create(user_one: @admin, user_two: @chris, status: 'Denied', last_user_action: @admin)
@user_follower_denied_two = UserRelationship.create(user_one: @admin, user_two: @kelly, status: 'Denied', last_user_action: @kelly)
@user_follower_denied_three = UserRelationship.create(user_one: @roffaden, user_two: @admin, status: 'Denied', last_user_action: @roffaden)
@user_follower_denied_four = UserRelationship.create(user_one: @jordon, user_two: @admin, status: 'Denied', last_user_action: @admin)


@accepted_five = UserRelationship.create(user_one: @kelly, user_two: @jordon, status: 'Accepted', last_user_action: @jordon)
@denied_one = UserRelationship.create(user_one: @kelly, user_two: @yomar, status: 'Denied', last_user_action: @yomar)
@denied_two = UserRelationship.create(user_one: @roffaden, user_two: @moises, status: 'Denied', last_user_action: @moises)
@blocked_one = UserRelationship.create(user_one: @kelly, user_two: @moises, status: 'Blocked', last_user_action: @moises)
@blocked_two = UserRelationship.create(user_one: @jordon, user_two: @roffaden, status: 'Blocked', last_user_action: @roffaden)
puts "#{UserRelationship.count} user relationships created"







