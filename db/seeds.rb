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
image = Cloudinary::Uploader.unsigned_upload('test_photos/IMG_1610.jpeg', 'send-it')

@admin = User.create(username: 'admin', name:'admin', email: 'admin@email.com', password: 'aldair', user_self_img: image["url"], bio: "All images come from unsplash.com")
# 2
@aldair = User.create(username: 'aldair', name:'Aldair',email: 'aldair@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/GVOQm5c.jpg', bio: 'Photo by Erik Mclean on https://unsplash.com/photos/ZRns2R5azu0')
# 3
@chris = User.create(username: 'IdontCareYaBoi', name:'chris', email: 'chris@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/2RESNzV.jpg', bio: 'Photo by Сергей Орловский on https://unsplash.com/photos/1OfPse1qVLM')
# 4
@vasu = User.create(username: 'Vasectummie', name:'vasu', email: 'vasu@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/CtQSVZo.jpg', bio: 'Photo by LOGAN WEAVER on https://unsplash.com/photos/Apejl7P4-vk')
# 5
@kelly = User.create(username: 'KittenLove', name:'kelly', email: 'kelly@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/PPZWjTg.jpg', bio: 'Photo by Tran Mau Tri Tam on https://unsplash.com/photos/FbhNdD1ow2g')
# 6
@yomar = User.create(username: 'IloveChris', name:'yomar', email: 'yomar@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/CHMIxWH.jpg', bio: 'Photo by Raoul Droog on https://unsplash.com/photos/yMSecCHsIBc')
# 7
@moises = User.create(username: 'SixPack', name:'moises', email: 'moises@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/0smEQKu.jpg', bio:'Photo by Katerina Jerabkova on https://unsplash.com/photos/nV7WA07ikI4')
# 8
@nate = User.create(username: 'SkaterBoy', name:'nate', email: 'nate@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/INfUlXp.jpg', bio: 'Photo by Stefan Lehner on https://unsplash.com/photos/qJnmO3qi9ek')
# 9
@roffaden = User.create(username: 'MuscleBoy', name:'rof', email: 'ro@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/b0dNe1l.jpg', bio: 'Photo by Nathan Dumlao on https://unsplash.com/photos/pzLbV-NFT40')
# 10
@jordon = User.create(username: 'NumberOneDraftPick', name:'jordon', email: 'jordon@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/jSAyvdC.jpg', bio: 'Photo by Courtney Schroedel on https://unsplash.com/photos/v1SS8Wiz-uI')
# 11
@clive = User.create(username: 'RaceToTheFinish', name: 'clive', email: 'clive@email.com', password: 'aldair', user_self_img: 'https://i.imgur.com/OI6pd1i.jpg', bio: 'Photo by Photo by SwapnIl Dwivedi on https://unsplash.com/photos/Xcmfp0gBukI')

@noLogo = User.create(username: 'noAvatar', name: 'noavatar', email: 'noavatar@email.com', password: 'noAvatar', user_self_img: 'null', bio: 'testing in case no avatar is present')
puts "#{User.count} users created"

# entities

@photo_one = Entity.create(name: 'Photo', content: 'Photo by Philip Veater. https://unsplash.com/photos/6AtkTnXqeiI' , url: 'https://i.imgur.com/y3AWTp0.jpg?1', user: @admin)
@photo_two = Entity.create(name: 'Photo', content: 'Photo by Severin Demchuk. https://unsplash.com/photos/yelIlsascr0', url: 'https://i.imgur.com/zFnJN48.jpg', user: @admin)
@photo_three = Entity.create(name: 'Photo', content: "Photo by Anton Jansson. https://unsplash.com/photos/10x5iT14PLQ", url: 'https://i.imgur.com/qAaqtJP.jpg', user: @admin)

@photo_four = Entity.create(name: 'Photo', content: 'Photo by Zane Lee. https://unsplash.com/photos/srNRVuOR_ZM', url: 'https://i.imgur.com/oxfLidC.jpg', user: @jordon)
@photo_five = Entity.create(name: 'Photo', content: 'Photo by Thijs Stoop. https://unsplash.com/photos/PebwygRbPCo', url: 'https://i.imgur.com/xKnpvOL.jpg', user: @jordon)
@photo_six = Entity.create(name: 'Photo', content: 'Photo by Red Dot. https://unsplash.com/photos/iUVqTyyRQGc', url: 'https://i.imgur.com/BTRe0y8.jpg', user: @jordon)

@photo_seven = Entity.create(name: 'Photo', content: 'Photo by Scott Hewitt. https://unsplash.com/photos/8As6hrLM4Ec', url: 'https://i.imgur.com/zSfkjl1.jpg', user: @nate)
@photo_eight = Entity.create(name: 'Photo', content: 'Photo by Inés Castellano. https://unsplash.com/photos/Hp6zYM9orZ4', url: 'https://i.imgur.com/bBawAgq.jpg', user: @nate)

@photo_nine = Entity.create(name: 'Photo', content: 'Photo by Lerone Pieters. https://unsplash.com/photos/jRco0idtT0c', url: 'https://i.imgur.com/juhY3QN.jpg', user: @aldair)

@photo_ten = Entity.create(name: 'Photo', content: 'Photo by Harley-Davidson. https://unsplash.com/photos/-GE-xOGTt3w', url: 'https://i.imgur.com/eK85Eul.jpg', user: @moises)

@photo_eleven = Entity.create(name: 'Photo', content: 'Photo by Jonathan Gallegos. https://unsplash.com/photos/5FGqfV6UjzI', url: 'https://i.imgur.com/cuaX8yF.jpg', user: @yomar)
@photo_twelve = Entity.create(name: 'Photo', content: 'Photo by Lukasz Szmigiel. https://unsplash.com/photos/jFCViYFYcus', url: 'https://i.imgur.com/0gbqLxg.jpg', user: @yomar)

@photo_thirteen = Entity.create(name: 'Photo', content: 'Photo by Simon Goetz. https://unsplash.com/photos/jt8S_JhVn5A', url: 'https://i.imgur.com/oduW6uk.jpg', user: @kelly)
@photo_fourteen = Entity.create(name: 'Photo', content: 'Photo by Dave Lastovskiy. https://unsplash.com/photos/RygIdTavhkQ', url: 'https://i.imgur.com/yoL9hDh.jpg', user: @kelly)
@photo_fifteen = Entity.create(name: 'Photo', content: 'Photo by Clay Banks. https://unsplash.com/photos/0xma2ZlT_50', url: 'https://i.imgur.com/PjPxMD2.jpg', user: @kelly)

@photo_sixteen = Entity.create(name: 'Photo', content: 'Photo by Franz Schmitt. https://unsplash.com/photos/KiS25n89ph4', url: 'https://i.imgur.com/Ttjuph8.jpg', user: @roffaden)
@photo_seventeen = Entity.create(name: 'Photo', content: 'Photo by Robert V. Ruggiero. https://unsplash.com/photos/ecPDSYAptqo', url: 'https://i.imgur.com/k4qQHAP.jpg', user: @roffaden)

@photo_eighteen = Entity.create(name: 'Photo', content: 'Photo by Sid Balachandran. https://unsplash.com/photos/hXttDVCwyRA', url: 'https://i.imgur.com/pnz4w6v.jpg', user: @vasu)
@photo_nineteen = Entity.create(name: 'Photo', content: 'Photo by Boris Smokrovic. https://unsplash.com/photos/HWwF4OnXAdM', url: 'https://i.imgur.com/gQLOE3z.jpg', user: @vasu)
@photo_twenty = Entity.create(name: 'Photo', content: 'Photo by Robert Thiemann. https://unsplash.com/photos/Feft9mrnxV0', url: 'https://i.imgur.com/vpOmt0r.jpg', user: @vasu)

@photo_twentyone = Entity.create(name: 'Photo', content: 'Photo by Juli Kosolapova. https://unsplash.com/photos/Zs7WT86Nu1I', url: 'https://i.imgur.com/oTU6M5J.jpg', user: @chris)
@photo_twentytwo = Entity.create(name: 'Photo', content: 'Photo by Arvid Høidahl. https://unsplash.com/photos/bP1PPCbzqKs', url: 'https://i.imgur.com/kmHIkEg.jpg', user: @chris)
@photo_twentythree = Entity.create(name: 'Photo', content: 'Photo by Nick Abrams. https://unsplash.com/photos/FTKfX3xZIcc', url: 'https://i.imgur.com/kOSijjL.jpg', user: @chris)

@photo_twentyfour = Entity.create(name: 'Photo', content: 'Photo by Nicolas Hoizey. https://unsplash.com/photos/-4trKf0Kbow', url: 'https://i.imgur.com/R2jACZe.jpg', user: @clive)

puts "#{Entity.count} entities created"

# tags
# need to be created first for their id to show on actions table
@tagname_one = Tag.create(name: '#FirstPost')
@tagname_two = Tag.create(name: '#hardAF')
puts "#{Tag.count} tags created"

# actions
# like
@like_one = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @admin, entity: @photo_nine)
@like_two = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_nine)
@like_three = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @vasu, entity: @photo_nine)
@like_four = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @kelly, entity: @photo_nine)
@like_five = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @jordon, entity: @photo_nine)

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

@like_sixteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @admin, entity: @photo_thirteen)
@like_seventeen = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_thirteen)
@like_eighteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @jordon, entity: @photo_thirteen)
@like_nineteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @clive, entity: @photo_thirteen)
@like_twenty = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @yomar, entity: @photo_thirteen)

@like_twentyone = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @yomar, entity: @photo_fourteen)

@like_twentytwo = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @yomar, entity: @photo_fifteen)

@like_twentythree = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_eighteen)
@like_twentyfour = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @clive, entity: @photo_eighteen)
@like_twentyfive = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @nate, entity: @photo_eighteen)

@like_twentysix = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_nineteen)
@like_twentyseven = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @clive, entity: @photo_nineteen)
@like_twentyeight = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @nate, entity: @photo_nineteen)

@like_twentynine = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @chris, entity: @photo_twenty)
@like_thirty = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @clive, entity: @photo_twenty)
@like_thirtyone = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @nate, entity: @photo_twenty)

@like_thirtytwo = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @moises, entity: @photo_twentyone)
@like_thirtythree = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @nate, entity: @photo_twentyone)

@like_thirtyfour = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @moises, entity: @photo_twentytwo)
@like_thirtyfive = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @nate, entity: @photo_twentytwo)

@like_thirtysix = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @moises, entity: @photo_twentythree)
@like_thirtyseven = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @nate, entity: @photo_twentythree)

@like_thirtyeight = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @aldair, entity: @photo_eleven)
@like_thirtynine = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @aldair, entity: @photo_twelve)
@like_forty = Action.create(type_of_entity: 'Photo', type_of_action: 'Like', user: @kelly, entity: @photo_twelve)


# comment
# admin photos
@comment_one = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Welcome to the best up and comming social media app!', user: @aldair, entity: @photo_one)
@comment_two = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'AY its lit', user: @chris, entity: @photo_one)
@comment_three = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Let me get on this', user: @vasu, entity: @photo_one)
@comment_four = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Nice pic!', user: @aldair, entity: @photo_two)

# vasu photos
@comment_five = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Oh snap', user: @chris, entity: @photo_eighteen)
@comment_six = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Such beauty, resplendent!', user: @clive, entity: @photo_eighteen)
@comment_seven = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Cool bird', user: @chris, entity: @photo_nineteen)
@comment_eight = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Where at?', user: @nate, entity: @photo_nineteen)
@comment_nine = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Coruscating!', user: @clive, entity: @photo_twenty)

# chris photos
@comment_ten = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'The rabbit cannot win!', user: @nate, entity: @photo_twentyone)
@comment_eleven = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Looks like the owner lol', user: @moises, entity: @photo_twentyone)
@comment_twelve = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'im faster!', user: @clive, entity: @photo_twentyone)

# yomar photos
@comment_thirteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Fast', user: @aldair, entity: @photo_eleven)
@comment_thirteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'SO GREEN', user: @kelly, entity: @photo_twelve)

# kelly photos
@comment_fourteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'nightlifeee <3', user: @roffaden, entity: @photo_fifteen)
@comment_fifteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'been there done that', user: @yomar, entity: @photo_fifteen)
@comment_sixteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'where at tho?', user: @moises, entity: @photo_fifteen)
@comment_seventeen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'yo no invite? lol', user: @chris, entity: @photo_fifteen)
@comment_eighteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'Indeed no invite', user: @nate, entity: @photo_fifteen)

# roffaden photos
@comment_nineteen = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'boatLife', user: @kelly, entity: @photo_sixteen)
@comment_twenty = Action.create(type_of_entity: 'Photo', type_of_action: 'Comment', content: 'where does the sea take ya', user: @jordon, entity: @photo_sixteen)
# tag
@tag_one = Action.create(type_of_entity: 'Post', type_of_action: 'Tag', user: @vasu, tag: @testingTag, entity: @secondPost)
@tag_two = Action.create(type_of_entity: 'Post', type_of_action: 'Tag', user: @aldair, tag: @why_is_tagging_so_hard, entity: @third_post)
puts "#{Action.count} actions created"

# user relationships
@admin_accepted_aldair = UserRelationship.create(user_one: @admin, user_two: @aldair, status: 'Pending', last_user_action: @admin)
@admin_pending_chris = UserRelationship.create(user_one: @admin, user_two: @chris, status: 'Pending', last_user_action: @admin)
@admin_accepted_roffaden = UserRelationship.create(user_one: @admin, user_two: @roffaden, status: 'Accepted', last_user_action: @roffaden)
@admin_accepted_kelly = UserRelationship.create(user_one: @admin, user_two: @kelly, status: 'Accepted', last_user_action: @kelly)
@admin_unfollowed_nate = UserRelationship.create(user_one: @admin, user_two: @nate, status: 'Denied', last_user_action: @admin)
@clive_unfollowed_admin = UserRelationship.create(user_one: @admin, user_two: @clive, status: 'Denied', last_user_action: @clive)

@roffaden_accepted_yomar = UserRelationship.create(user_one: @roffaden, user_two: @yomar, status: 'Accepted', last_user_action: @yomar)
@roffaden_accepted_kelly = UserRelationship.create(user_one: @roffaden, user_two: @kelly, status: 'Accepted', last_user_action: @kelly)
@roffaden_accepted_jordon = UserRelationship.create(user_one: @jordon, user_two: @roffaden, status: 'Accepted', last_user_action: @roffaden)
@roffaden_pending_clive = UserRelationship.create(user_one: @clive, user_two: @roffaden, status: 'Pending', last_user_action: @clive)
@vasu_unfollowed_roffaden = UserRelationship.create(user_one: @roffaden, user_two: @vasu, status: 'Denied', last_user_action: @vasu)

@chris_accepted_vasu = UserRelationship.create(user_one: @chris, user_two: @vasu, status: 'Accepted', last_user_action: @vasu)
@chris_accepted_clive = UserRelationship.create(user_one: @chris, user_two: @clive, status: 'Accepted', last_user_action: @clive)
@moises_denied_chris = UserRelationship.create(user_one: @chris, user_two: @moises, status: 'Denied', last_user_action: @moises)
@chris_pending_kelly = UserRelationship.create(user_one: @chris, user_two: @kelly, status: 'Pending', last_user_action: @chris)
@chris_pending_nate = UserRelationship.create(user_one: @chris, user_two: @nate, status: 'Pending', last_user_action: @chris)

@aldair_accepted_chris = UserRelationship.create(user_one: @aldair, user_two: @chris, status: 'Accepted', last_user_action: @chris)
@vasu_unfollowed_aldair = UserRelationship.create(user_one: @aldair, user_two: @vasu, status: 'Denied', last_user_action: @vasu)
@aldair_pending_moises = UserRelationship.create(user_one: @moises, user_two: @aldair, status: 'Pending', last_user_action: @moises)
@aldair_accepted_nate = UserRelationship.create(user_one: @aldair, user_two: @nate, status: 'Accepted', last_user_action: @nate)
@aldair_unfollowed_clive = UserRelationship.create(user_one: @aldair, user_two: @clive, status: 'Denied', last_user_action: @aldair)

@kelly_accepted_yomar = UserRelationship.create(user_one: @kelly, user_two: @yomar, status: 'Accepted', last_user_action: @yomar)
@kelly_accepted_moises = UserRelationship.create(user_one: @kelly, user_two: @moises, status: 'Accepted', last_user_action: @kelly)
@nate_pending_kelly = UserRelationship.create(user_one: @nate, user_two: @kelly, status: 'Pending', last_user_action: @nate)

puts "#{UserRelationship.count} user relationships created"







