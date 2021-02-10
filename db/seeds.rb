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
image = Cloudinary::Uploader.unsigned_upload('test_photos/naomi-tamar-nud0w51mC00-unsplash.jpg', 'send-it')

@admin = User.create(username: 'admin', name:'admin', email: 'admin@email.com', password: 'aldair', user_self_img: image["url"])
# 2
@aldair = User.create(username: 'aldair', name:'Aldair',email: 'aldair@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/qDvVHCv.jpg')
# 3
@chris = User.create(username: 'IdontCareYaBoi', name:'chris', email: 'chris@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/huSgzp2.jpg')
# 4
@vasu = User.create(username: 'Vasectummie', name:'vasu', email: 'vasu@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/fooitwq.jpg')
# 5
@kelly = User.create(username: 'KittenLove', name:'kelly', email: 'kelly@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/6zgoENN.jpg')
# 6
@yomar = User.create(username: 'IloveChris', name:'yomar', email: 'yomar@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/DUTBARU.jpg')
# 7
@moises = User.create(username: 'SixPack', name:'moises', email: 'moises@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/oX6OY55.jpg')
# 8
@nate = User.create(username: 'SkaterBoy', name:'nate', email: 'nate@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/6EBcdvz.jpg')
# 9
@roffaden = User.create(username: 'MuscleBoy', name:'rof', email: 'ro@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/tFGwNHC.jpg')
# 10
@jordon = User.create(username: 'NumberOneDraftPick', name:'jordon', email: 'jordon@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/XhE2N3q.jpg')
# 11
@clive = User.create(username: 'RaceToTheFinish', name: 'clive', email: 'clive@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/Rf1n8LP.jpg')
puts "#{User.count} users created"

# entities
@post_one = Entity.create(name: 'Post', content: 'This is my first post', user: @admin)
@post_two = Entity.create(name: 'Post', content: 'Check out admin\'s first post', user: @vasu)
@post_three = Entity.create(name: 'Post', content: 'Third times the charm', user: @aldair)

@photo_four = Entity.create(name: 'Photo', content: 'Photo by Philip Veater. https://unsplash.com/photos/6AtkTnXqeiI' , url: 'https://i.imgur.com/y3AWTp0.jpg?1', user: @admin)
@photo_five = Entity.create(name: 'Photo', content: 'Photo by Severin Demchuk. https://unsplash.com/photos/yelIlsascr0', url: 'https://i.imgur.com/zFnJN48.jpg', user: @admin)
@photo_six = Entity.create(name: 'Photo', content: "Photo by Anton Jansson. https://unsplash.com/photos/10x5iT14PLQ", url: 'https://i.imgur.com/qAaqtJP.jpg', user: @admin)

@photo_seven = Entity.create(name: 'Photo', content: 'Photo by Zane Lee. https://unsplash.com/photos/srNRVuOR_ZM', url: 'https://i.imgur.com/oxfLidC.jpg', user: @jordon)
@photo_eight = Entity.create(name: 'Photo', content: 'Photo by Thijs Stoop. https://unsplash.com/photos/PebwygRbPCo', url: 'https://i.imgur.com/xKnpvOL.jpg', user: @jordon)
@photo_nine = Entity.create(name: 'Photo', content: 'Photo by Red Dot. https://unsplash.com/photos/iUVqTyyRQGc', url: 'https://i.imgur.com/BTRe0y8.jpg', user: @jordon)

@photo_ten = Entity.create(name: 'Photo', content: 'Photo by Scott Hewitt. https://unsplash.com/photos/8As6hrLM4Ec', url: 'https://i.imgur.com/zSfkjl1.jpg', user: @nate)
@photo_eleven = Entity.create(name: 'Photo', content: 'Photo by Inés Castellano. https://unsplash.com/photos/Hp6zYM9orZ4', url: 'https://i.imgur.com/bBawAgq.jpg', user: @nate)

@photo_twelve = Entity.create(name: 'Photo', content: 'Photo by Lerone Pieters. https://unsplash.com/photos/jRco0idtT0c', url: 'https://i.imgur.com/juhY3QN.jpg', user: @aldair)

@photo_thirteen = Entity.create(name: 'Photo', content: 'Photo by Harley-Davidson. https://unsplash.com/photos/-GE-xOGTt3w', url: 'https://i.imgur.com/eK85Eul.jpg', user: @moises)

@photo_fourteen = Entity.create(name: 'Photo', content: 'Photo by Jonathan Gallegos. https://unsplash.com/photos/5FGqfV6UjzI', url: 'https://i.imgur.com/cuaX8yF.jpg', user: @yomar)
@photo_fifteen = Entity.create(name: 'Photo', content: 'Photo by Lukasz Szmigiel. https://unsplash.com/photos/jFCViYFYcus', url: 'https://i.imgur.com/0gbqLxg.jpg', user: @yomar)

@photo_sixteen = Entity.create(name: 'Photo', content: 'Photo by Simon Goetz. https://unsplash.com/photos/jt8S_JhVn5A', url: 'https://i.imgur.com/oduW6uk.jpg', user: @kelly)
@photo_seventeen = Entity.create(name: 'Photo', content: 'Photo by Dave Lastovskiy. https://unsplash.com/photos/RygIdTavhkQ', url: 'https://i.imgur.com/yoL9hDh.jpg', user: @kelly)
@photo_eighteen = Entity.create(name: 'Photo', content: 'Photo by Clay Banks. https://unsplash.com/photos/0xma2ZlT_50', url: 'https://i.imgur.com/PjPxMD2.jpg', user: @kelly)

@photo_nineteen = Entity.create(name: 'Photo', content: 'Photo by Franz Schmitt. https://unsplash.com/photos/KiS25n89ph4', url: 'https://i.imgur.com/Ttjuph8.jpg', user: @roffaden)
@photo_twenty = Entity.create(name: 'Photo', content: 'Photo by Robert V. Ruggiero. https://unsplash.com/photos/ecPDSYAptqo', url: 'https://i.imgur.com/k4qQHAP.jpg', user: @roffaden)

@photo_twentyone = Entity.create(name: 'Photo', content: 'Photo by Sid Balachandran. https://unsplash.com/photos/hXttDVCwyRA', url: 'https://i.imgur.com/pnz4w6v.jpg', user: @vasu)
@photo_twentytwo = Entity.create(name: 'Photo', content: 'Photo by Boris Smokrovic. https://unsplash.com/photos/HWwF4OnXAdM', url: 'https://i.imgur.com/gQLOE3z.jpg', user: @vasu)
@photo_twentythree = Entity.create(name: 'Photo', content: 'Photo by Robert Thiemann. https://unsplash.com/photos/Feft9mrnxV0', url: 'https://i.imgur.com/vpOmt0r.jpg', user: @vasu)

@photo_twentythree = Entity.create(name: 'Photo', content: 'Photo by Juli Kosolapova. https://unsplash.com/photos/Zs7WT86Nu1I', url: 'https://i.imgur.com/oTU6M5J.jpg', user: @chris)
@photo_twentyfour= Entity.create(name: 'Photo', content: 'Photo by Arvid Høidahl. https://unsplash.com/photos/bP1PPCbzqKs', url: 'https://i.imgur.com/kmHIkEg.jpg', user: @chris)
@photo_twentyfive = Entity.create(name: 'Photo', content: 'Photo by Nick Abrams. https://unsplash.com/photos/FTKfX3xZIcc', url: 'https://i.imgur.com/kOSijjL.jpg', user: @chris)

@photo_twentysix = Entity.create(name: 'Photo', content: 'Photo by Nicolas Hoizey. https://unsplash.com/photos/-4trKf0Kbow', url: 'https://i.imgur.com/R2jACZe.jpg', user: @clive)

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
@user_following_four = UserRelationship.create(user_one: @admin, user_two: @clive, status: 'Accepted', last_user_action: @clive)

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







