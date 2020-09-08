# Send-It

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Time Estimates](#time-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

_Social media app._


<br>

## MVP

_The user will be able to use CRUD, send friend requests to other users, post/like/tag from each other._

<br>

### Goals

- _Users will create, enter, update, and delete their account._
- _Users will post and comment on their own posts as well as others._
- _Users will send friend requests to other users to add them to their friend circle._
- _Users can tag other users on posts, as well as tag posts to other posts._


<br>

### Libraries and Dependencies

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      React       | _Display posts and user information._ |
| React Router Dom | _Links components together._ |
|      Axios       | _Provides single API for database._ |
|   Ruby on Rails  | _Structures database, provides CRUD methods._ |

<br>

### Client (Front End)

#### Wireframes


#### Component Tree

[Component Tree](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=send-it-component-tree.drawio#R7ZpRb5swEMc%2FTR4XgQkkfWzTZJ2WTtW6auvePLiAV4OZcRqyTz9TDARM02xKIJ0qVSr%2B%2B2zw7%2BzjbDKwpmH6nuM4uGYe0AEyvHRgXQ4QMg1jIv9lyiZXHAPlgs%2BJp4wq4Zb8hqKlUlfEg6RmKBijgsR10WVRBK6oaZhztq6bLRmt3zXGPmjCrYuprn4lnghydWIblX4FxA%2BKO8sR5zUhLoyVkATYY%2BuaBKmYs0ioR7wBHuIIIiFrrjF%2FAD6wZ4EQ2UjPB2gu%2F5aZ9dBnzKeAY5IMXRZK2U2kyXyJQ0IzzFsdXaiO5O2s2cCacsZEfhWmU6CZrwo35M80f6a25MCzfvdosP71yYg%2FzoigxF1gevN9id13lkIhNgVf8CRuVWRcBMxnEaazSr3gbBV5kPVqyFJls2AslqIpxZ8gxEbNHbwSTEqBCKmqVaw9zdHVUJSUsBV3YcfzFzMQcx%2FEDjtUApcLA1gIgm9kOw4UC%2FJYfw6s3O%2BXdhVVeaHA%2FgVkNNpJOWLRq8Vq9clV9fuI6Urd6TyOddSUytiUEV4HRMBtjJ%2BGvpbhsY3fI3AB6W6C%2BoBVA8ux8yYquFoqrqyrSGUri2ArSI2MYxHaPfNOf32jPSei0%2Bv6tl%2Fb%2Bt4X66hXrE4nWCU8vvm2XbjPOhvaRfEyVZ3npY0q9eAOu1d3jN%2FcUbcb9%2BqOyZs76naTXt1x1q07jJN3R75h7M0fWm54jUmk%2BYgHLPyxSjpKDsfDenpomi35oaHnh%2Fax8sORRmnBfCl8aCFVTl2zE1rm2KizasulW1hZx2Jla6w%2Bg08SkW%2Fm%2B2XlNFhNdFbjLlk5Gqsr2XPvnCy7uQLbdmidkhprpO5iDwvJyrhLTmFq2WgPZJOWTa1lHwnZREN2CRROCVkD2FkLsJY5drRTgPLA89XsT4v34stJxjOu6CjJMP9fsKhXsKgTsFU2PURlBn3fKD%2BTUT%2BVboATOWIZdA6eZu%2FvqX7PYA0tGt%2BwRGjuSwIcZ5cBpFg6SbKKt9gptcSJXg7US5JC8XnqQIF71Eyjxj0HblM%2F4Z6yMITsC5W2Pspj7gK1S9nK6%2BSNZ581wBk6uHKv08nGxtT3fwvyAKeFzTH%2FLW0fHSuzMi2N2hfsnxSz5lRDzp5rtExjD%2F%2By0qldAfZaMtEClxwuphQo8zkOG6GwVrf1fukhHqLG%2FLRbVrVxmM2SLFZfwp%2Fqtn6%2BYM3%2BAA%3D%3D)

#### Component Hierarchy

``` structure

src
|__ components/
      |__ Header.jsx
      |__ Main.jsx
      |__ LogIn.jsx
      |__ Register.jsx
      |__ Home.jsx
      |__ UpdateUser.jsx
      |__ DeleteUser.jsx
      |__ Post.jsx
      |__ Comment.jsx
      |__ Like.jsx
      |__ Tag.jsx
|__ services/
      |__ api-helper.js
      |__ auth.js
      |__ users.js
      |__ posts.js

```

#### Component Breakdown

|  Component   |    Type    | state | props | Description                                                      |
| :----------: | :--------: | :---: | :---: | :--------------------------------------------------------------- |
| Header       | functional |   y   |   y   | _The header will contain the navigation to the user CRUD, posts, and home._ |
| Main         |   class    |   y   |   y   | _The main component will call for user data, as well as pass down posts._ |
| Login        | functional |   n   |   y   | _Logs the user in._ |
| Register     | functional |   n   |   n   | _Adds an user to the database._ |
| Home         | functional |   y   |   y   | _Displays all the posts from the database._ |
| Post         | functional |   y   |   y   | _Displays one post from the database, includes comments._ |
| Comments     | functional |   y   |   y   | _Allows users to comment on post._ |
| Like         | functional |   y   |   y   | _User can like a post and keep it in their history._ |
| Tag          | functional |   y   |   y   | _User can tag a post or other user to the post._ |

#### Time Estimates

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Add log in and register actions | M | 4 hrs | TBH | TBH |
| Create CRUD Actions for Users | H | 6 hrs | TBH | TBH |
| Create Posts component | H | 4 hrs | TBH | TBH |
| Add a display all and display one component | H | 2 hrs | TBH | TBH |
| Connect backend to frontend | H | 4 hrs | TBH | TBH |
| Add links to components | M | 2 hr | TBH | TBH |
| Add CSS | L | 2 hrs | TBH | TBH |
| TOTAL               |          |     24 hrs      |     TBH     |    TBH    |

<br>

### Server (Back End)

#### ERD Model

[ERD Model](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=send-it-ERD.drawio#R7VxZU%2BM4EP41qZp5YMqxY8d5JAF2tnamhgL2eqKErdgaHMsjK4TMr1%2BdvmRDIIezA1UcUUuy2uruT61WKwNntnj8jYAs%2FopDmAxsK3wcOGcD27atscX%2BccpaUjzLloSIoFCShiXhGv2Eiqj6RUsUwrzWkGKcUJTViQFOUxjQGg0Qglf1ZnOc1EfNQAQNwnUAEpP6NwppLKm%2Ba5X0zxBFsR55aKmaBdCNFSGPQYhXFZJzPnBmBGMqPy0eZzDhk6fnRfa76KgtGCMwpZt0GH33%2F71x4p%2Fk4T65mY%2B8H8PYO7F9xRxd6zcmeJmGkHeyBs4UExrjCKcg%2BYJxxohDRvwOKV0rWYElxYwU00Wiahk%2FZP0P7%2F%2FJ1cV%2F1eNE4eyxVlrrUshmXvFRDnteUln78JTLlDU4v%2FoJCb7BX0G6ljUXKNEc5BQQWrbEKdRE1YgPl99DGsSqh5wFzkHn7CpSjpckgE9NqavUFJAI0qcajgstYOYD8QKy2WAdCUwARQ91ToDS46hoV4qafVDSfoHkPVPyzwtga91oSGYB0vBbq3RqomYCbJH0UQjRGfYpRM3mA0iWaqiB7SWM4WlWk633Y8lxZrpg74PSgXPKaq3skf0V82ZJ%2BgnlYuR1o0odhY%2F0BCQoUv0CNpuQ1KtDGGDCXhirNlxNSIKYaIuh2adI%2FRcM3mnCnzkkuaayabhrtmS0rEmLSZPyqhdO4JzKSp9XNnllk29bJ%2Bz3%2BvIPRgMLNj3T9C7PnuFuH7ws2TSlYAEVR38BMosBOTQXcAFQ0i8LIAwJzPN%2BmchAnq8wCW9DFMGc9stMQCCgMLwFmo8btGBMcXU9tJJm4Ys4aaxAD5BQxJyvU4k2ZwKPpgp7zuTYU8xazROxNMzFSjCd45SqJWdoq%2FIFWKCEuxafYfIA%2BVPrKxHvOsMJJmJkZz6HXhCIhYjge1ipCceTO6tjreH8wsenVxtzbVAdTvyRcg3XdZ93VTqaQ0%2FR4qqTqfvtfD2ZjLZ2CmqztK2HkLa7bhXnAGcwPc3XaWC4Brv0BsYbegNjt1dvYPwLeAPnKUUUwaN1CG4hZ3Bd8wvkGxgMHAp0dzFe9W%2Bn%2B3Fb%2BEMXV38cZNT%2BHZ6ArSUcMFqZKGV%2BnEtw02Ptl7NNLeVNOwXepO4UOPamXoGzL6%2FAGf4C68qVWIJxmseoqvhHtLYIhGUOz85R9sVM0BVuZaI0XIYfdKm3YL8zSUWwBRRBwGf8dsOl4%2F9k9lHC9n%2FK0Wz4vzrMuxd0cH23vmVweweH7bcM28WYx%2FUg8ydvWBC6As28dAkJWwc5xChRvXzfcRNzOztQRNKx%2FxcRSc1mZa0wUABx4KAxd%2ByYGXGHidcJmnCfYsAbZMyyMVnAsNm4wB7p6ZjqlyQoy7n8VjGi8DoDYmJXBGRPmn0IoD9vNXsv8OHdfO%2FG7fj1pd8emUt%2FcZxUtW5vX8bteT0bt%2Bs5det2Hf9XtG59nnjk1j1xe48PlcpRVwzHOpRi7D3cNN5UGfo9QdRsVqD%2BZp1xoMbzgTiRlxvnplf44RJzHJ%2Fx2Ykxk6%2F4CLi3l8CPO4Pzi4tzbzbjvhoBIWKc6Dot5Z2Hc90Ndm5t8O3vC7794zVXyxv%2FKubqjzY0136jw65proZ2MP8m4x8puBO6UBFkm%2FGJmVei55PKTR6w7ThRfQKcJCDLkXiYbBGjJPwC1nhJ9TC69Bp3bNcmbDeCL23bK7%2FFgm1rXybstsVeOqSWcQwFyRUMKEijTQRoCigkOLvRiswJGUY8EHP%2BwOZQ73irklJGKHbnolLuzMXHO0wpXqgCUdNVPFRMlTtlP2zyZjxZyD3ja4E7HZZl9sObE4beKVMEpl38GZDtBFb82HVDsT9hEKYyPCfsvZ2%2BuebeaYZDc4OzjbxFlhwo5V0JoMQoDGG6C%2FFuIZMOA63IZHJQkTiGSL5CkKI0epdKAZsT0885rJBG7xh5YIxc10XaH2SaCXDWTmV%2F7JY5OjK89Ax5XDLH%2B63hZYdUjgUv2%2FJE3vHyAHjp946XviH64U5lf%2ByW2REx680UJ4Y8ToMAZpQfe7yL5UgAU5%2BvvAPmoQFz2BZDPShiemYAZrfCP3LT9J6PkhzWFs0gyRkMeBLQm0LMLrEcC2KacZN3xDwMYnq9I6YZjnHelGk6R4aYZoxkmuDg%2Fo0BZodUjgQwfdNoUHir8qJ42uQqxuxvKBKoZDqUzKsyz9ebdxRWMquqoBEYQPQAN3oQBVHR7HfGlDzal2VZh1hHKwA5p4jELlBUdT2XrjP4bX7ewiOt5A8U%2FK5EOhiYz5l%2BCa4%2FDNoyB2QB0uDTx64hTxVD1SE1k7WpVfMe8in%2FkKB79fAALxYipWEm3%2FHTk2PWbw6UJcTfjhkLzHMgVPCDHLR4ugVSzkq%2BDGIzHUKbaIop7LDFiqnegeA%2BEif635ZUZEpLegjI%2FTfWi8%2BwOI7nOZNPJLJW811rp64vTbpQmbmTTW35mQPbsT54Vauf2xaRHrcYsr23hNiJudj1lnRRFDb5%2FoWjzK1Q8ZH951aIruzdwLrSQDl85ZMvOaGif0XqpdY%2Fx2ookHxkqU4Fb1skXpkLuka2Jlis0CIBQpL1zAsm1%2BC%2ByLyIMUE%2Fee5G7RKmUi%2FHqrW45j31ylxorYCCSub9SJcVL1K%2FeB6H%2FhYVnptPIMeDS60XVkH6wjN9FStVGApBHhdWoq8CqJsiuwMpQAL9Hs6OcGrUoSfPJ%2B67T%2BCUGq900yoDNjJZRi2BlDZcbMIiSCj%2F2gEKp1zWuYGOu1Bn88xoYDe%2FeoGJbSixxfBv5IWSegPpgHTVVtwqo7rFOSkv%2FRntah5Fa7uO%2B4MNQ21ca6mnPCm1bHGec76Ep9EX6TmPBub1l%2FZbNMLKKr46wRRUfXfu%2Fw9ekFb1Ikhe1zXtWQuw9%2BZzm8H3G9ByUFmCaBPSXg2qTEU6QbUOisMG6St4HLRApWWERXhHeedrWt1NGajZhO0DeIG7QNRCfzTAtZ2ttemT7%2B3L8TMjxTUkEkDW0C1%2BrXEre1eUK%2FV%2Bo46Nt2Hgu4tkNRHn9YAh7bETMGxvMwHvz7M3Q89t99PfRfxqEbv7EzErlt%2B1J12X8hsLnfP%2FAA%3D%3D)

<br>

***

## Post-MVP


***

## Code Showcase




## Code Issues & Resolutions
